import "aframe";
import "aframe-extras";
import "aframe-environment-component";
import "aframe-thumb-controls-component";
import "aframe-haptics-component";
// import "networked-aframe";
import "./components/drag";
import "./components/scene-dragger";
import "./components/geometry-generator";
import "./components/geometry-connector";
import React, { useEffect, useState } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Entity, Scene } from "aframe-react";
import { getColorFromId } from "./methods/get-color-from-id";

export default function Playground() {
  const [startSounds, setStartSounds] = useState(false);

  useEffect(() => {
    if (startSounds) {
      const sounds = document.querySelectorAll('a-entity[sound]');
      // @ts-ignore
      sounds.forEach(sound => sound.components.sound.playSound());
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
        scene-dragger
        renderer={{
          logarithmicDepthBuffer: true,
          colorManagement: true,
          foveationLevel: 0,
          highRefreshRate: true
        }}
      >
        <Entity id="content">
          <Entity
            className="draggable"
            events={{ loaded: () => { } }}
            sound={{
              src: `${process.env.GH_PAGES_PATH_PREFIX || ""}playground-a.wav`,
              loop: true,
              volume: 0.5,
              refDistance: 0.2,
              maxDistance: 100,
              rolloffFactor: 3,
            }}
            geometry={{ primitive: "sphere", radius: 0.1 }}
            position={{ x: -1, y: 1.2, z: -1 }}
            material={{
              shader: "standard",
              color: getColorFromId(6666),
            }}
          />
          <Entity
            className="draggable"
            events={{ loaded: () => { } }}
            sound={{
              src: `${process.env.GH_PAGES_PATH_PREFIX || ""}playground-b.wav`,
              loop: true,
              volume: 0.5,
              refDistance: 0.2,
              maxDistance: 100,
              rolloffFactor: 3,
            }}
            geometry={{ primitive: "box", height: 0.2, width: 0.2, depth: 0.2 }}
            position={{ x: 1, y: 1.2, z: -1 }}
            material={{
              shader: "standard",
              color: getColorFromId(1111),
            }}
          />
          <Entity
            className="draggable"
            events={{ loaded: () => { } }}
            sound={{
              src: `${process.env.GH_PAGES_PATH_PREFIX || ""}playground-c.wav`,
              loop: true,
              volume: 0.5,
              refDistance: 0.2,
              maxDistance: 100,
              rolloffFactor: 3,
            }}
            geometry={{ primitive: "cylinder", radius: 0.1, height: 0.2 }}
            position={{ x: 0, y: 1.2, z: -1 }}
            material={{
              shader: "standard",
              color: getColorFromId(3333),
            }}
          />
        </Entity>
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
            // hand-tracking-controls={{ hand: 'left' }}
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
            // hand-tracking-controls={{ hand: 'right' }}
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
        {/* <Entity
          light={{
            type: 'ambient',
            color: '#ddb8f2', // neon-retrowave-dark-violet
            intensity: 1,
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
        /> */}
        {/* <Entity
          environment={{
            preset: "dream",
            seed: 1,
            groundColor: "#4f00d9",
            groundColor2: "#008f8f",
          }}
        /> */}
        <Entity
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
        />
      </Scene>
    </div>
  </>)
}

