// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import * as THREE from "three";
import md5 from 'md5';
// import { useFocusMethods } from '../../hooks';

export function useNodeDragger() {
  const elRef = useRef(null);
  const nodeEl = useRef(null);
  const isDrag = useRef(null);
  const startPos = useRef(null);
  const newNodePos = useRef(null);
  const controllerPos = useRef(null);
  // const { focus, unfocus } = useFocusMethods(null);

  const refRaycasterIntersection = useRef(null);
  const refRaycasterIntersectionCleared = useRef(null);
  const refTriggerdown = useRef(null);
  const refTriggerup = useRef(null);
  const refElMoved = useRef(null);

  const initializeNodeDrag = (graphData) => {
    let el;
    setTimeout(() => {
      elRef.current = el = document.getElementById("right");
      if (el?.hasLoaded) {
        refRaycasterIntersection.current = function (evt) {
          console.log(evt.detail);
          const intersection = el.components.raycaster.getIntersection(evt.detail.els[0]);
          console.log({ intersection });
          nodeEl.current = intersection.object.el;
          const nodeId = nodeEl.current.id;
          console.log(nodeId)
          console.log('Intersected!');
          console.log("nodeEl", { nodeEl });
        };
        el.addEventListener('raycaster-intersection', refRaycasterIntersection.current);

        refRaycasterIntersectionCleared.current = function (evt) {
          if (!isDrag.current) {
            nodeEl.current = undefined;
            console.log('Intersection cleared: ', evt.detail);
          }
        };
        el.addEventListener('raycaster-intersection-cleared', refRaycasterIntersectionCleared.current);

        refTriggerdown.current = function (evt) {
          console.log("triggerdown");
          if (!nodeEl.current) return;
          isDrag.current = true;
          nodeEl.current.addState("Dragged");
          startPos.current = { ...el.getAttribute("position") }
          console.log('controllerStartPos: ', startPos.current);
        };
        el.addEventListener('triggerdown', refTriggerdown.current);

        refElMoved.current = function (evt) {
          if (nodeEl.current && isDrag.current && startPos.current && !nodeEl.current.is("Hovered")) {
            const nodeId = nodeEl.current.id;
            const draggedNodeIndex = graphData.nodes.findIndex((node) => md5(node.id) === nodeId);
            console.log(evt);
            console.log("ControllerStartPos: ", startPos.current);
            controllerPos.current = evt.detail.position;
            console.log("ControllerCurrentPos: ", controllerPos.current);
            const nodeElPos = nodeEl.current.object3D.position;
            console.log("nodeEl: ", nodeEl.current);
            const deltaX = startPos.current.x - controllerPos.current.x;
            const deltaY = startPos.current.y - controllerPos.current.y;
            const deltaZ = startPos.current.z - controllerPos.current.z;
            const ray = el.components.raycaster.ray;
            const planeNormal = ray.direction;
            const planePoint = nodeEl.current.object3D.position;
            const intersectionPoint = new THREE.Vector3();

            if (ray.intersectPlane(planeNormal, planePoint, intersectionPoint)) {
              // nodeEl.current.object3D.position.copy(intersectionPoint);
              Object.assign(graphData.nodes[draggedNodeIndex], {
                dx: intersectionPoint.x,
                dy: intersectionPoint.y,
                dz: intersectionPoint.z
              })
            }
            // newNodePos.current = {
            //   x: (nodeElPos.x - deltaX),
            //   y: (nodeElPos.y - deltaY),
            //   z: (nodeElPos.z - deltaZ),
            // }
            // Object.assign(graphData.nodes[draggedNodeIndex], {
            //   dx: newNodePos.current.x,
            //   dy: newNodePos.current.y,
            //   dz: newNodePos.current.z
            // })
            // nodeEl.current.setAttribute('position', newNodePos.current);
            // console.log("newNodePos: ", newNodePos.current);
            // console.log("newNodeElPos: ", nodeElPos);
            // console.log("newNodeDelta: ", deltaX, deltaY, deltaZ);
            // console.log("newNodeElPos: ", nodeElPos);
          }
        }
        el.addEventListener('el-moved', refElMoved.current);

        refTriggerup.current = function (evt) {
          console.log('triggerup');
          if (nodeEl.current && isDrag.current && newNodePos.current) {
            // @ts-ignore
            // focus(nodeEl.current.id, newNodePos.current);
            console.log('focus:', nodeEl.current);
          }
          isDrag.current = false;
          nodeEl.current.removeState("Dragged");
          console.log('triggerup');
        };
        el.addEventListener('triggerup', refTriggerup.current);
      }
    }, 1000);
    console.log("Node Dragger Loaded");
  };

  useEffect(() => {
    return () => {
      const el = elRef.current;
      if (el) {
        el.removeEventListener('raycaster-intersection', refRaycasterIntersection.current);
        el.removeEventListener('raycaster-intersection-cleared', refRaycasterIntersectionCleared.current);
        el.removeEventListener('triggerdown', refTriggerdown.current);
        el.removeEventListener('triggerup', refTriggerup.current);
        el.removeEventListener('el-moved', refElMoved.current);
      }
    };
  }, []);

  return { initializeNodeDrag };
}