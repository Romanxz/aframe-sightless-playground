import 'aframe';
import "aframe-environment-component";
import './components/drag';
import "./components/scene-dragger";
import './components/el-movement';
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';
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
          // loaded: () => simulation.restart(),
        }}
        // use-engine-tick={{
        //   onEngineTick: () => { },
        //   throttle: 68
        // }}
        scene-dragger
        renderer="logarithmicDepthBuffer: true"
      >
        <Entity id="content">
          <Entity
            className="draggable"
            events={{ loaded: () => { } }}
            sound={{
              src: `${process.env.GH_PAGES_PATH_PREFIX || ""}playground-a.wav`,
              loop: true,
              volume: 0.4,
              refDistance: 0.2,
              maxDistance: 40,
              rolloffFactor: 3,
            }}
            geometry={{ primitive: "sphere", radius: 0.1 }}
            position={{ x: -1, y: 1.2, z: -1 }}
            material={{
              shader: "standard",
              color: getColorFromId(666),
              // opacity: 0.3,
            }}
          />
          <Entity
            className="draggable"
            events={{ loaded: () => { } }}
            sound={{
              src: `${process.env.GH_PAGES_PATH_PREFIX || ""}playground-b.wav`,
              loop: true,
              volume: 0.4,
              refDistance: 0.2,
              maxDistance: 40,
              rolloffFactor: 3,
            }}
            geometry={{ primitive: "box", height: 0.2, width: 0.2, depth: 0.2, segmentsWidth: 16, segmentsHeight: 9 }}
            position={{ x: 1, y: 1.2, z: -1 }}
            material={{
              shader: "standard",
              color: getColorFromId(222),
              // opacity: 0.3,
            }}
          />
          <Entity
            className="draggable"
            events={{ loaded: () => { } }}
            sound={{
              src: `${process.env.GH_PAGES_PATH_PREFIX || ""}playground-c.wav`,
              loop: true,
              volume: 0.4,
              refDistance: 0.2,
              maxDistance: 40,
              rolloffFactor: 3,
            }}
            geometry={{ primitive: "cylinder", radius: 0.1, height: 0.2 }}
            position={{ x: 0, y: 1.2, z: -1 }}
            material={{
              shader: "standard",
              color: getColorFromId(333),
              // opacity: 0.3,
            }}
          />
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
            camera={{ active: true }}
            look-controls={{ pointerLockEnabled: false }}
            wasd-controls={{ enabled: true, fly: false }}
            position={{ x: 0, y: 1.6, z: 0 }}
          >
          </Entity>
          <Entity id="left"
            hand-tracking-controls={{ hand: 'left' }}
            el-movement
            drag
            raycaster="show-line:true; lineColor: steelblue; lineOpacity: 0.85; objects: .draggable;"
            laser-controls={{ hand: 'left' }}
          />
          <Entity id="right"
            hand-tracking-controls={{ hand: 'right' }}
            el-movement
            drag
            raycaster="show-line:true; lineColor: steelblue; lineOpacity: 0.85; objects: .draggable;"
            laser-controls={{ hand: 'right' }}
          />
        </Entity>
        <Entity id="cursor"
          cursor={{ rayOrigin: "mouse" }}
          raycaster="show-line:true; lineColor: steelblue; lineOpacity: 0.85; objects: .draggable;"
        />
        <Entity
          environment={{
            preset: "dream",
            seed: 1,
            lighting: "distant",
            shadow: true,
            fog: 0.6,
            ground: "hills",
            groundYScale: 30,
            groundTexture: "checkerboard",
            groundColor: "#4f00d9",
            groundColor2: "#008f8f",
          }}
        />
      </Scene>
    </div>
  </>)
}

