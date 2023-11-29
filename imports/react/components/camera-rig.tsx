import "aframe";
import "aframe-extras";
import "aframe-haptics-component";
import "../../aframe/components/drag";
import "../../aframe/components/geometry-generator";
import "../../aframe/components/geometry-connector";

import React from 'react';
import { Entity } from "aframe-react";

export default function CameraRig(props) {

  return (
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
        {props.children}
      </Entity>
      <Entity id="left"
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
  )
}