import "../../aframe/components/edge-positioner";
import "../../aframe/components/sound-sequence";
import React, { useEffect, useState } from 'react';
import { Entity, Scene } from "aframe-react";
import randomInteger from "random-int";
import { v4 as uuid } from 'uuid';

import { getColorFromId } from "../../aframe/methods/get-color-from-id";

const sceneContent = [
  {
    id: 1,
    type: "node",
    playbackQue: 1,
    soundName: "box",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: 1.5, y: 1.2, z: -2 }
  },
  {
    id: 2,
    type: "edge",
    playbackQue: 2,
    sourceId: 1,
    targetId: 3,
  },
  {
    id: 3,
    type: "node",
    playbackQue: 3,
    soundName: "sphere",
    geometry: { primitive: "sphere", radius: 0.15 },
    position: { x: 0, y: 1.2, z: -2 }
  },
  {
    id: 4,
    type: "edge",
    playbackQue: 4,
    sourceId: 3,
    targetId: 5,
  },
  {
    id: 5,
    type: "node",
    playbackQue: 5,
    soundName: "cylinder",
    geometry: { primitive: "cylinder", radius: 0.15, height: 0.3 },
    position: { x: -1.3, y: 1.2, z: -2 }
  },
  {
    id: 6,
    type: "edge",
    playbackQue: 6,
    sourceId: 5,
    targetId: 9,
  },
  {
    id: 7,
    type: "edge",
    playbackQue: 6,
    sourceId: 5,
    targetId: 10,
  },
  {
    id: 8,
    type: "edge",
    playbackQue: 6,
    sourceId: 5,
    targetId: 11,
  },
  {
    id: 9,
    type: "node",
    soundName: "box",
    playbackQue: 7,
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: -2.5, y: 0.6, z: -2 }
  },
  {
    id: 10,
    type: "node",
    soundName: "box",
    playbackQue: 8,
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: -2.5, y: 1.2, z: -2 }
  },
  {
    id: 11,
    type: "node",
    playbackQue: 9,
    soundName: "box",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: -2.5, y: 1.8, z: -2 }
  },
]

export default function Scene1() {

  return <Entity id="content"
    sound-sequence={{ sounds: sceneContent }}
    edge-positioner={{ edges: sceneContent.filter((el) => el.type === "edge") }}>
    {sceneContent.map((el) => {
      if (el.type === "node") {
        return <Entity
          id={el.id}
          key={el.id}
          className="draggable"
          sound={{
            src: `${process.env.GH_PAGES_PATH_PREFIX || ""}${el.soundName}.wav`,
            autoplay: false,
            // loop: true,
            volume: 0.8,
            refDistance: 0.2,
            maxDistance: 60,
            rolloffFactor: 3,
          }}
          geometry={el.geometry}
          position={el.position}
          material={{ shader: "standard", color: getColorFromId(randomInteger(0, 10000)) }}
        />
      } else if (el.type === "edge") {
        return <Entity
          id={el.id}
          key={el.id}
          sound={{
            src: `${process.env.GH_PAGES_PATH_PREFIX || ""}edge.wav`,
            autoplay: false,
            // loop: true,
            volume: 0.8,
            refDistance: 0.1,
            maxDistance: 60,
            rolloffFactor: 3,
          }}
          geometry={{ primitive: "cylinder", radius: 0.005, segmentsHeight: 3, openEnded: true, height: 1 }}
          material={{ shader: "standard", color: getColorFromId(randomInteger(0, 10000)), }}
        >
          <Entity
            sound={{
              src: `${process.env.GH_PAGES_PATH_PREFIX || ""}edge.wav`,
              autoplay: false,
              // loop: true,
              volume: 0.8,
              refDistance: 0.2,
              maxDistance: 60,
              rolloffFactor: 3,
            }}
            animation={{ property: "position", }}
          />
        </Entity>
      }
    })}
  </Entity>
}