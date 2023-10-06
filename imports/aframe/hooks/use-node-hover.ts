import { useEffect, useRef, useState } from 'react';
import md5 from 'md5';

export function useNodeHover() {
    const elRef = useRef(null);
    const raycaster = useRef(null)

    const refRaycasterIntersected = useRef(null);
    const refRaycasterIntersectedCleared = useRef(null);

    const initializeNodeHover = (node) => {
      let el;
      setTimeout(() => {
        elRef.current = el = document.getElementById(`${md5(node.id)}`);
        if (el?.hasLoaded) {
          refRaycasterIntersected.current = function (evt) {
            raycaster.current = evt.detail.el.components.raycaster;
            const intersection = raycaster.current.getIntersection(el);
            el.addState("Hovered");
            const elPos = el.getAttribute("position");
            // el.setAttribute("position", {
            //   x:elPos.x + 10,
            //   y:elPos.y + 10,
            //   z:elPos.z + 10,
            // });
            // console.log(`${node.id}`, "Im intersected!", { intersection });
          };
          el.addEventListener('raycaster-intersected', refRaycasterIntersected.current);

          refRaycasterIntersectedCleared.current = function (evt) {
            raycaster.current = undefined;
            el.removeState("Hovered");
            // console.log('Intersection cleared: ', evt.detail);
          };
          el.addEventListener('raycaster-intersected-cleared', refRaycasterIntersectedCleared.current);
        }
      }, 1000);
      console.log("Node Hover Loaded");
    };

    useEffect(() => {
      return () => {
        const el = elRef.current;
        if (el) {
          el.removeEventListener('raycaster-intersected', refRaycasterIntersected.current);
          el.removeEventListener('raycaster-intersected-cleared', refRaycasterIntersectedCleared.current);
        }
      };
    }, []);

    return { initializeNodeHover };
  }