// @ts-nocheck
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useDebounceCallback } from "@react-hook/debounce";
import md5 from 'md5';
import { Entity, Scene } from "aframe-react";
import { getColorFromId } from "../../aframe/methods/get-color-from-id";
import { getGraphData } from "../../aframe/methods/get-graph-data";
import { useNodeDragger } from "../hooks/use-node-dragger";
import "../../aframe/components/scaler";
import "../../aframe/components/rotator";
import "../../aframe/components/node-sound";
import "../../aframe/components/scene-dragger";
import "../../aframe/components/el-movement";
import "../../aframe/components/tick";
import { useSpaceId } from "@deep-foundation/deepcase/imports/hooks";
import { useNodeHover } from "../hooks/use-node-hover";
import { initializeSimulation } from "../../aframe/methods/initialize-simulation";
import { updateSimulation } from "../../aframe/methods/update-simulation";

function stopAllSounds() {
  const nodes = document.querySelectorAll('.deepgraph-node');
  nodes.forEach(node => {
    // @ts-ignore
    if (node.components.sound) {
      // @ts-ignore
      node.components.sound.stopSound();
    }
  });
}

export const AframeGraph = ({ deep, links }) => {
  const [spaceId, setSpaceId] = useSpaceId();
  const [simulation, setSimulation] = useState(undefined);
  const oldNodes = useRef([]);
  const oldEdges = useRef([]);

const updateSimulationDebounced = useDebounceCallback(() => {
  !!graphData.nodes.length && !!graphData.edges.length && updateSimulation(simRef.current, graphData, oldNodes, oldEdges);
  console.log("Simulation updated: ", simRef.current);
}, 1000);

const graphData = useMemo(() => {
  const graphData = getGraphData(deep, links, spaceId);
  console.log("graphData created: ", graphData);
  return graphData;
}, [links])

const simRef = useRef<any>();
useEffect(() => {
  simRef.current = initializeSimulation({ nodes: [{ id: 0, type_id: 0 }], edges: [] }, oldNodes, oldEdges);
  return () => {
    simRef?.current?.stop();
    stopAllSounds();
  };
}, []);

useEffect(() => {
  updateSimulationDebounced();
}, [graphData]);

// useEffect(() => {
//   if (!simulation && graphData.nodes.length > 0 || graphData.edges.length > 0) {
//     const newSimulation = initializeSimulation(graphData, oldNodes, oldEdges);
//     setSimulation(newSimulation);
//     console.log("Simulation created: ", newSimulation);
//   }
// }, [graphData]);

// useEffect(() => {
//   if (simulation) {
//     // simulation.stop();
//     updateSimulation(simulation, graphData, oldNodes, oldEdges);
//     console.log("Simulation updated: ", simulation);
//   }
// }, [graphData]);

// useEffect(() => {
//   return () => {
//     simulation?.stop();
//     stopAllSounds();
//     setSimulation(null);
//     console.log("Simulation stopped: ", simulation);
//   };
// }, []);

const { initializeNodeHover } = useNodeHover();
const { initializeNodeDrag } = useNodeDragger();
// const { initializeNodeSound, nodeSoundTick } = useNodeSound({
//   wave: "sine",
//   minFreq: 200,
//   maxFreq: 5000,
//   volume: 0.1,
//   panningModel: 'HRTF',
//   distanceModel: 'inverse',
//   refDistance: 0.01,
//   maxDistance: 2000,
//   rolloffFactor: 0.1,
//   coneInnerAngle: 360,
//   coneOuterAngle: 360,
//   coneOuterGain: 1,
//   throttle: 68,
// });

return (<div style={{ height: "100wv", width: "100wh", }}>
  <Scene
    id="scene"
    // stats
    events={{
      // "enter-vr": () => { setVr(true); console.log("entered VR"); },
      // "exit-vr": () => setVr(false),
      // loaded: () => simulation.restart(),
    }}
    // use-engine-tick={{
    //   onEngineTick: () => { },
    //   throttle: 68
    // }}
    renderer="logarithmicDepthBuffer: true" embedded
  >
    <Entity id="content" className="deepgraph" scaler scene-dragger rotator >
      {graphData?.nodes?.map((node) =>
        <Entity className="deepgraph-node"
          id={md5(node.id)}
          key={md5(node.id)}
          events={{ loaded: () => { initializeNodeHover(node); } }}
          sound={{ src: "/node.mp3", on: "raycaster-intersected", volume: 0.4 }}
          geometry={{ primitive: "sphere", radius: 0.2, segmentsWidth: 16, segmentsHeight: 9 }}
          // material={{
          //   shader: "standard",
          //   color: getColorFromId(node.type_id),
          //   // opacity: 0.3,
          // }}
          node-sound={{
            id: node.type_id,
            wave: ['sine', 'square', 'sawtooth', 'triangle'][node.type_id % 4],
            // wave: "sawtooth",
            sampleRate: 44100,
            bufferSize: 4096,
            minFreq: 200,
            maxFreq: 10000,
            volume: 0.8,
            panningModel: 'HRTF',
            distanceModel: 'inverse',
            refDistance: 0.1,
            maxDistance: 500,
            rolloffFactor: 2,
            coneInnerAngle: 360,
            coneOuterAngle: 360,
            coneOuterGain: 0,
            timeout: 1000,
            attack: 2.0,
            throttle: 0
          }}
        >
          {
            // <Entity>
            //   <Entity
            //     text={{
            //       value: node.type,
            //       color: getColorFromId(node.type_id),
            //       width: 2,
            //       font: "roboto",
            //       align: "center",
            //       side: "double"
            //     }}
            //     position={{ x: 0, y: 0.3, z: 0 }}
            //   />
            //   <Entity
            //     text={{
            //       value: node.name,
            //       color: getColorFromId(node.type_id),
            //       width: 2,
            //       font: "roboto",
            //       align: "center",
            //       side: "double"
            //     }}
            //     position={{ x: 0, y: 0.4, z: 0 }}
            //   />
            //   <Entity
            //     text={{
            //       value: node.id.toString(),
            //       color: getColorFromId(node.type_id),
            //       width: 3,
            //       font: "roboto",
            //       align: "center",
            //       side: "double"
            //     }}
            //     position={{ x: 0, y: 0.5, z: 0 }}
            //   />
            // </Entity>
          }
        </Entity>
      )}
      {graphData.edges.map((edge) =>
        <Entity
          id={edge.id}
          key={md5(edge.id)}
          geometry={{ primitive: "cylinder", radius: 0.005, segmentsHeight: 3, openEnded: true, height: 1 }}
          // material={{
          //   shader: "standard",
          //   color: getColorFromId(edge.type),
          // }}
        />
      )}
    </Entity>
    <Entity id="cameraRig"
    // movement-controls={{
    //   camera: "#camera",
    //   controls: "gamepad, nipple"
    // }}
    // nipple-controls="mode: static; lookJoystickEnabled: false; moveJoystickPosition: right"
    // navigator={{ cameraRig: '#camera', cameraHead: '#camera' }}
    // position={{ x: 0, y: 1.6, z: 0 }} rotaton={{ x: 0, y: 0, z: 0 }}
    >
      <Entity id="camera"
        camera={{ active: true, }}
        // look-controls={{ pointerLockEnabled: true }}
        // wasd-controls={{ enabled: false, fly: true }}
        fly-controls
        position={{ x: 0, y: 1.6, z: 0 }}
      >
      </Entity>
      <Entity id="left"
        hand-tracking-controls={{ hand: 'left' }}
        raycaster="show-line:true; lineColor: steelblue; lineOpacity: 0.85; objects: .deepgraph-node;"
        laser-controls={{ hand: 'left' }}
        left-thumbstick-movement
      />
      <Entity id="right"
        hand-tracking-controls={{ hand: 'right' }}
        raycaster="show-line:true; lineColor: steelblue; lineOpacity: 0.85; objects: .deepgraph-node;"
        laser-controls={{ hand: 'right' }}
      />
    </Entity>
    <Entity id="cursor"
      cursor={{ rayOrigin: "mouse" }}
      raycaster="show-line:true; lineColor: steelblue; lineOpacity: 0.85; objects: .deepgraph-node;"
    />
  </Scene>
</div>)
}
