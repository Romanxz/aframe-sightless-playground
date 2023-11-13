import "../../aframe/components/edge-positioner";
import "../../aframe/components/sound-sequence";
import React from 'react';
import { Entity } from "aframe-react";
import randomInteger from "random-int";

import { getColorFromId } from "../../aframe/methods/get-color-from-id";

export default function BlockDiagram({sceneContent}) {

  return <Entity id="content"
    sound-sequence={{ sounds: sceneContent, edgeSoundSpeed: 2000 }}
    edge-positioner={{ edges: sceneContent.filter((el) => el.type === "edge") }}> 
    {sceneContent.map((el) => {
      if (el.type === "node") {
        return <Entity
          id={el.id}
          key={el.id}
          className="draggable"
          sound={{
            src: `${process.env.GH_PAGES_PATH_PREFIX || ""}${el.voiceover}.wav`,
            autoplay: false,
            // loop: true,
            volume: 0.8,
            refDistance: 0.2,
            maxDistance: 60,
            rolloffFactor: 3,
            on: "raycaster-intersected"
          }}
          geometry={el.geometry}
          position={el.position}
          material={{ shader: "standard", color: getColorFromId(randomInteger(0, 10000)) }}
        >
          <Entity
            sound={{
              src: `${process.env.GH_PAGES_PATH_PREFIX || ""}${el.sound}.wav`,
              autoplay: false,
              // loop: true,
              volume: 1,
              refDistance: 0.2,
              maxDistance: 60,
              rolloffFactor: 3,
            }}
          />
        </Entity>
      } else if (el.type === "edge") {
        return <Entity
          id={el.id}
          key={el.id}
          // sound={{
          //   src: `${process.env.GH_PAGES_PATH_PREFIX || ""}edge.wav`,
          //   autoplay: false,
          //   // loop: true,
          //   volume: 0.8,
          //   refDistance: 0.1,
          //   maxDistance: 60,
          //   rolloffFactor: 3,
          // }}
          geometry={{ primitive: "cylinder", radius: 0.005, segmentsHeight: 3, openEnded: true, height: 1 }}
          material={{ shader: "standard", color: getColorFromId(randomInteger(0, 10000)), }}
        >
          <Entity
            // id={el.id}
            sound={{
              src: `${process.env.GH_PAGES_PATH_PREFIX || ""}edgecut.wav`,
              autoplay: false,
              // loop: true,
              volume: 0.8,
              refDistance: 0.2,
              maxDistance: 60,
              rolloffFactor: 3,
            }}
          // geometry={{ primitive: "sphere", radius: 0.1 }}
          />
        </Entity>
      }
    })}
  </Entity>
}