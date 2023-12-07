import "aframe";
import "aframe-environment-component";
import "../aframe/components/scene-dragger";
import "../aframe/components/megashader";
// import "../../aframe/components/sound-playback";
import React, { useEffect, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Entity, Scene } from "aframe-react";
import ReactPlayer from 'react-player';

import MorphingSphere from "./components/morphing-sphere";
import SpatialAudioTestRig from "./components/spatial-audio-test-rig";
import CameraRig from "./components/camera-rig";
import LecturePlayer from "./components/lecture-player";

import Scene1 from "../aframe/lecture-scenes/scene1";
import Scene2 from "../aframe/lecture-scenes/scene2";
import Scene3 from "../aframe/lecture-scenes/scene3";
import Scene4 from "../aframe/lecture-scenes/scene4";
import Scene5 from "../aframe/lecture-scenes/scene5";
import Scene6 from "../aframe/lecture-scenes/scene6";
import Scene7 from "../aframe/lecture-scenes/scene7";
import Scene8 from "../aframe/lecture-scenes/scene8";
import Scene9 from "../aframe/lecture-scenes/scene9";
import Scene10 from "../aframe/lecture-scenes/scene10";
import Scene11 from "../aframe/lecture-scenes/scene11";
import Scene12 from "../aframe/lecture-scenes/scene12";
import Scene13 from "../aframe/lecture-scenes/scene13";
import Scene14 from "../aframe/lecture-scenes/scene14";
import Scene15 from "../aframe/lecture-scenes/scene15";
import Scene16 from "../aframe/lecture-scenes/scene16";
import Scene17 from "../aframe/lecture-scenes/scene17";
import Scene18 from "../aframe/lecture-scenes/scene18";
import Scene19 from "../aframe/lecture-scenes/scene19";
import Scene20 from "../aframe/lecture-scenes/scene20";
import Scene21 from "../aframe/lecture-scenes/scene21";
import Scene22 from "../aframe/lecture-scenes/scene22";





export default function Playground() {
  const [startSounds, setStartSounds] = useState(false);

  // useEffect(() => {
  //   if (startSounds) {
  //     const sceneEl = document.querySelector("a-scene");
  //     // @ts-ignore
  //     sceneEl.components["sound-playback"].playSounds();
  //   }
  // }, [startSounds]);

  useEffect(() => {
    if (startSounds) {
      const sceneContent = document.getElementById("content");
      if (!sceneContent) return;
      // @ts-ignore
      sceneContent.components["sound-sequence"].stopSequence();
      // @ts-ignore
      sceneContent.components["sound-sequence"].startSequence();
    }
  }, [startSounds]);

  return (<>
    {!startSounds && (
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(128, 128, 128, 0.5)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex={1000}
        height="100vh"
        width="100vw"
        onClick={() => setStartSounds(true)}
      >
        <Button onClick={() => setStartSounds(true)} colorScheme="blue" size="lg">
          Run
        </Button>
      </Box>
    )}
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Scene
        id="scene"
        // stats
        events={{
          // "enter-vr": () => { setVr(true); console.log("entered VR"); },
          // "exit-vr": () => setVr(false),
          loaded: () => { console.log("scene loaded"); }
        }}
        // use-engine-tick={{
        //   onEngineTick: () => { },
        //   throttle: 68
        // }}
        // sound-playback={{ throttle: 34 }}
        scene-dragger
        renderer={{
          logarithmicDepthBuffer: true,
          colorManagement: true,
          foveationLevel: 0,
          highRefreshRate: true
        }}
      >
        {/* <MorphingSphere /> */}
        <LecturePlayer startSounds={startSounds}>
          <Scene1 />
          <Scene2 />
          <Scene3 />
          <Scene4 />
          <Scene5 />
          <Scene6 />
          <Scene7 />
          <Scene8 />
          <Scene9 />
          <Scene10 />
          <Scene11 />
          <Scene12 />
          <Scene13 />
          <Scene14 />
          <Scene15 />
          <Scene16 />
          <Scene17 />
          <Scene18 />
          <Scene19 />
          <Scene20 />
          <Scene21 />
          <Scene22 />
        </LecturePlayer>
        <CameraRig>
        </CameraRig>
        <Entity
          light={{
            type: 'ambient',
            color: '#ddb8f2', // neon-retrowave-dark-violet
            intensity: 0.5,
            decay: 2,
          }}
          position={{ x: 0, y: 15, z: 0 }}
        />
        <Entity
          environment={{
            preset: "dream",
            seed: 1,
            lighting: "distant",
            shadow: true,
            fog: 0.6,
            ground: "flat",
            dressing: "none",
            groundYScale: 0,
            groundTexture: "none",
            groundColor: "#440e45",
            groundColor2: "#008f8f",
            grid: "1x1",
            gridColor: "#5605f7",
          }}
        />
        {/* <Entity
          environment={{
            preset: "dream",
            seed: 1,
            groundColor: "#4f00d9",
            groundColor2: "#008f8f",
          }}
        /> */}
        {/* <Entity
          environment={{
            active: true,
            preset: "contact",
            seed: 14,
            skyType: "gradient",
            skyColor: "#46b87f",
            horizonColor: "#9466bd",
            lighting: "distant",
            lightPosition: { x: 0, y: 2.1, z: -1 },
            shadow: true,
            fog: 0.6,
            dressing: "mushrooms",
            dressingAmount: 20,
            dressingColor: "#3295ab",
            dressingScale: 20,
            dressingVariance: { x: 20, y: 20, z: 20 },
            dressingUniformScale: true,
            groundYScale: 5,
            grid: "1x1",
            gridColor: "#32e373",
            ground: "spikes",
            groundTexture: "none",
            groundColor: "#3c6f91",
            groundColor2: "#3c6f91",
          }}
        /> */}
      </Scene>
    </div>
  </>)
}

