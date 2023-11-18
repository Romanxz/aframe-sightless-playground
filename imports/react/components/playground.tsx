import "aframe";
import "aframe-extras";
import "aframe-environment-component";
import "aframe-haptics-component";
// import "networked-aframe";
import "../../aframe/components/drag";
import "../../aframe/components/scene-dragger";
import "../../aframe/components/geometry-generator";
import "../../aframe/components/geometry-connector";
// import "../../aframe/components/sound-playback";
// import "../../aframe/components/reverb";
import React, { useEffect, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Entity, Scene } from "aframe-react";

import { getColorFromId } from "../../aframe/methods/get-color-from-id";
import BoxGeometry from "./box";

import Scene1 from "../../aframe/lecture-scenes/scene1";
import Scene2 from "../../aframe/lecture-scenes/scene2";
import Scene6 from "../../aframe/lecture-scenes/scene6";
import Scene8 from "../../aframe/lecture-scenes/scene8";
import Scene9 from "../../aframe/lecture-scenes/scene9";
import Scene10 from "../../aframe/lecture-scenes/scene10";
import Scene13 from "../../aframe/lecture-scenes/scene13";


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
          loaded: () => {
            console.log("scene loaded");
            // @ts-ignore
            //   NAF.schemas.add({
            //     template: '#avatar-template',
            //     components: [
            //       'position',
            //       'rotation',
            //       {
            //         selector: '.head',
            //         component: 'material',
            //         property: 'color'
            //       }
            //     ]
            //   });
          }
        }}
        // use-engine-tick={{
        //   onEngineTick: () => { },
        //   throttle: 68
        // }}
        // networked-scene={{
        //   serverURL: "https://8080-romanxz-aframesightless-r3l6wq0zpht.ws-eu105.gitpod.io",
        //   app: "sightless-playground",
        //   room: "playground",
        //   connectOnLoad: true,
        //   onConnect: () => { },
        //   adapter: "socketio",
        //   audio: false,
        //   video: false,
        //   debug: false,
        // }}
        // sound-playback={{ throttle: 34 }}
        scene-dragger
        renderer={{
          logarithmicDepthBuffer: true,
          // colorManagement: true,
          foveationLevel: 0,
          highRefreshRate: true
        }}
      >
        {/* <Entity id="reverb" reverb geometry={{ primitive: "box", height: 4, width: 20, depth: 40 }} /> */}
        <Scene10 />
        <Entity id="cameraRig"
          movement-controls={{
            camera: "#camera",
            controls: "gamepad",
            speed: 0.2
          }}
          gamepad-controls={{ rotationSensitivity: 0 }}
        >
          <Entity id="camera"
            camera={{ active: true }}
            look-controls={{ pointerLockEnabled: false }}
            wasd-controls={{ enabled: true, fly: false }}
            position={{ x: 0, y: 1.6, z: 0 }}
          >
          </Entity>
          <Entity id="left"
            drag
            hand-tracking-controls={{ hand: 'left' }}
            oculus-touch-controls={{ hand: 'left' }}
            haptics={{ enabled: true }}
            raycaster={{
              origin: { x: 0.0065, y: -0.0186, z: -0.05 },
              direction: { x: 0, y: -0.5944043672340157, z: -0.7945567170519814 },
              showLine: true,
              lineColor: "red",
              lineOpacity: 0.85,
              objects: ".draggable"
            }}
          />
          <Entity id="right"
            drag
            geometry-connector
            geometry-generator
            hand-tracking-controls={{ hand: 'right' }}
            oculus-touch-controls={{ hand: 'right' }}
            haptics={{ enabled: true }}
            raycaster={{
              origin: { x: -0.0065, y: -0.0186, z: -0.05 },
              direction: { x: 0, y: -0.5944043672340157, z: -0.7945567170519814 },
              showLine: true,
              lineColor: "red",
              lineOpacity: 0.85,
              objects: ".draggable"
            }}
          />
        </Entity>
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

