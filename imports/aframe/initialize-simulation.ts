// @ts-nocheck
import * as d3d from "d3-force-3d";
import md5 from 'md5';

export function initializeSimulation(graphData, oldNodes, oldEdges) {
    // Identify new nodes
    const newForceNodes = graphData.nodes.filter(newNode =>
      !oldNodes.current.some(oldNode => oldNode.id === newNode.id)
    );

    // Identify new edges
    const newForceEdges = graphData.edges.filter(newEdge =>
      !oldEdges.current.some(oldEdge => oldEdge.id === newEdge.id)
    );

    // Merge old force nodes with new force nodes
    const mergedForceNodes = [...oldNodes.current, ...newForceNodes];

    // Merge old force edges with new force edges
    const mergedForceEdges = [...oldEdges.current, ...newForceEdges];

    // Initialize the simulation with merged data
    let simulation = d3d.forceSimulation(mergedForceNodes, 3)
      .alphaMin(0.002)
      .alphaDecay(0.1)
      .velocityDecay(0.4)
      .alphaTarget(0.001)
      .stop();

    // Initialize forces
    let _collide = d3d.forceCollide(0.11);
    let _link = d3d.forceLink(mergedForceEdges)
      .id((n) => n.id)
      .distance(0.1)
      .strength(1);
    let _manyBody = d3d.forceManyBody().strength(-2);
    let _center = d3d.forceCenter();

    // Add forces to the simulation
    simulation
      .force('collide', _collide)
      .force('link', _link)
      .force('charge', _manyBody)
      .force('center', _center)
      .restart()

    function tick() {
      console.log(1)
      let scene = document.querySelector('a-scene');
      if (scene?.hasLoaded) {
        for (const node of mergedForceNodes) {
          const nodeEl = document.getElementById(`${md5(node.id)}`);
          if (nodeEl?.object3D) {
            const nodeElPos = nodeEl.getAttribute("position");
            if (nodeEl.is("Hovered") && !nodeEl.is("Dragged")) {
              // console.log("DraggedNode: ", node)
              Object.assign(node, {
                fx: node.x,
                fy: node.y,
                fz: node.z,
              });
            } else {
              Object.assign(node, {
                fx: undefined,
                fy: undefined,
                fz: undefined,
              });
            }
            if (nodeEl.is("Dragged") && !nodeEl.is("Hovered")) {
              console.log("DraggedNode: ", node)
              Object.assign(node, {
                fx: undefined,
                fy: undefined,
                fz: undefined,
                x: node.dx,
                y: node.dy,
                z: node.dz,
              });
            } else {
              Object.assign(node, {
                fx: undefined,
                fy: undefined,
                fz: undefined,
              });
            }
            if (!nodeEl.is("Dragged")) {
              nodeEl.setAttribute('position', { x: node.x, y: node.y, z: node.z });
            }
          }
        }
        for (const edge of mergedForceEdges) {
          const edgeEl = document.getElementById(`${edge.id}`);
          const sourceEl = document.getElementById(`${md5(edge.source.id)}`);
          const targetEl = document.getElementById(`${md5(edge.target.id)}`);
          if (edgeEl?.object3D && sourceEl?.object3D && targetEl?.object3D) {
            const spos = sourceEl.object3D.position;
            const tpos = targetEl.object3D.position;

            const midpoint = new THREE.Vector3().addVectors(spos, tpos).multiplyScalar(0.5);

            const height = spos.distanceTo(tpos);

            let orientation = new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 1, 0),
              new THREE.Vector3().subVectors(tpos, spos).normalize()
            );

            edgeEl.object3D.position.set(midpoint.x, midpoint.y, midpoint.z);
            edgeEl.object3D.setRotationFromQuaternion(orientation);
            edgeEl.setAttribute('geometry', { height });
          }
        }
      }
    }

    simulation.on('tick', tick);

    // Update oldNodes.current and oldEdges for future comparisons
    oldNodes.current = mergedForceNodes;
    oldEdges.current = mergedForceEdges;

    return simulation;
  }