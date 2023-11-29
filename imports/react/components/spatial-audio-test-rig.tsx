import "../../aframe/components/sound-sequence";
import "../../aframe/components/node-sound";
import React, { useEffect, useState } from 'react';
import { Entity, Scene } from "aframe-react";
import randomInteger from "random-int";

import { getColorFromId } from "../../aframe/methods/get-color-from-id";

const audioNodes = [
  {
    id: 1,
    type: "node",
    sound: "sounds/rotor",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: 0, y: 0, z: -1 },
  },
  // {
  //   id: 2,
  //   type: "node",
  //   sound: "sounds/cylinder",
  //   geometry: { primitive: "sphere", radius: 0.1 },
  //   position: { x: 0, y: -0.8, z: -1 },
  // },
  // {
  //   id: 3,
  //   type: "node",
  //   sound: "sounds/cylinder",
  //   geometry: { primitive: "sphere", radius: 0.1 },
  //   position: { x: 0, y: 0.8, z: 1 },
  // },
  // {
  //   id: 4,
  //   type: "node",
  //   sound: "sounds/cylinder",
  //   geometry: { primitive: "sphere", radius: 0.1 },
  //   position: { x: 0, y: 0.8, z: 1, },
  // },
  // {
  //   id: 5,
  //   type: "node",
  //   sound: "sounds/cylinder",
  //   geometry: { primitive: "sphere", radius: 0.1 },
  //   position: { x: 0, y: 0, z: -1 },
  // },
  // {
  //   id: 6,
  //   type: "node",
  //   sound: "sounds/cylinder",
  //   geometry: { primitive: "sphere", radius: 0.1 },
  //   position: { x: 0, y: 0, z: 1 },
  // }
]


export default function SpatialAudioTestRig() {
  return (
    <Entity id="content"
      sound-sequence={{ sounds: audioNodes, edgeSoundSpeed: 2000 }} >
      {audioNodes.map((node) => {
        return <Entity
          id={node.id}
          key={node.id}
          className="draggable"
          // geometry={node.geometry}
          // position={node.position}
          animation={{
            property: 'rotation',
            to: '360 0 0',
            dur: 5000,
            easing: 'linear',
            loop: true
          }}
        >
          <Entity
           geometry={node.geometry}
            position={node.position}
            sound={{
              src: `${process.env.GH_PAGES_PATH_PREFIX || ""}${node.sound}.wav`,
              autoplay: false,
              // loop: true,
              volume: 1,
              refDistance: 0.5,
              maxDistance: 60,
              rolloffFactor: 3,
            }}
          />
        </Entity>
      })}
    </Entity>
  )
}