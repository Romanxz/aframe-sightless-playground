import 'aframe';
import "aframe-environment-component";
import './components/node-sound';
import React, { useEffect, useMemo, useState } from 'react';
import { Entity, Scene } from "aframe-react";
import { getColorFromId } from "./get-color-from-id";

export default function Playground() {

  return (<>
    <div id="ar" style={{ width: 100, height: 100 }} />
    <div id="vr" style={{ width: 100, height: 100 }} />
    <Scene
      id="scene"
      vr-mode-ui="enterVRButton: #vr; enterARButton: #ar"
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
      renderer="logarithmicDepthBuffer: true"
    >
      <Entity id="content" >
        <Entity
          events={{ loaded: () => { } }}
          sound={{
            src: "/playground-a.wav",
            autoplay: true,
            loop: true,
            volume: 0.4,
            refDistance: 0.5,
            maxDistance: 40,
            rolloffFactor: 3,
          }}
          geometry={{ primitive: "sphere", radius: 0.1}}
          position={{ x: -1, y: 1.2, z: -1 }}
          material={{
            shader: "standard",
            color: getColorFromId(666),
            // opacity: 0.3,
          }}
        />
        <Entity
          events={{ loaded: () => { } }}
          sound={{
            src: "/playground-b.wav",
            autoplay: true,
            loop: true,
            volume: 0.4,
            refDistance: 0.5,
            maxDistance: 40,
            rolloffFactor: 3,
          }}
          geometry={{ primitive: "box", height: 0.1, width: 0.1, depth: 0.1, segmentsWidth: 16, segmentsHeight: 9 }}
          position={{ x: 1, y: 1.2, z: -1 }}
          material={{
            shader: "standard",
            color: getColorFromId(222),
            // opacity: 0.3,
          }}
        />
        <Entity
          events={{ loaded: () => { } }}
          sound={{
            src: "playground-c.wav",
            autoplay: true,
            loop: true,
            volume: 0.4,
            refDistance: 0.5,
            maxDistance: 40,
            rolloffFactor: 3,
          }}
          geometry={{ primitive: "cylinder", radius: 0.1, height: 0.1}}
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
          raycaster="show-line:true; lineColor: steelblue; lineOpacity: 0.85; objects: .deepgraph-node;"
          laser-controls={{ hand: 'left' }}
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
      <Entity
        environment={{
          preset: "moon",
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
  </>)
}

