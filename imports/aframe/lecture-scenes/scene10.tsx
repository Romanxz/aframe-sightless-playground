import React from 'react';
import { v4 as uuid } from 'uuid';
import BlockDiagram from "../../react/components/block-diagram";

const sceneContent = [
  {
    id: 1,
    type: "node",
    sound: "sounds/riser1",
    voiceover: "scene10/lowload",
    geometry: { primitive: "cylinder", radius: 0.2, height: 0.3 },
    position: { x: -2.25, y: 1.2, z: -2 }
  },
  {
    id: 2,
    soundId: uuid(),
    type: "edge",
    sourceId: 1,
    targetId: 3,
  },
  {
    id: 3,
    type: "node",
    sound: "sounds/riser2",
    voiceover: "scene10/mediumload",
    refDistance: 0.25,
    geometry: { primitive: "cylinder", radius: 0.2, height: 0.4 },
    position: { x: -0.75, y: 1.25, z: -2 }
  },
  {
    id: 4,
    soundId: uuid(),
    type: "edge",
    sourceId: 3,
    targetId: 5,
  },
  {
    id: 5,
    type: "node",
    sound: "sounds/riser3",
    voiceover: "scene10/highload",
    refDistance: 0.3,
    geometry: { primitive: "cylinder", radius: 0.2, height: 0.6 },
    position: { x: 0.75, y: 1.35, z: -2 }
  },
  {
    id: 6,
    soundId: uuid(),
    type: "edge",
    sourceId: 5,
    targetId: 7,
  },
  {
    id: 7,
    type: "node",
    sound: "sounds/riser4",
    voiceover: "scene10/overload",
    refDistance: 0.35,
    geometry: { primitive: "cylinder", radius: 0.2, height: 0.8 },
    position: { x: 2.25, y: 1.45, z: -2 }
  }
]

export default function Scene10() {
  return <BlockDiagram sceneContent={sceneContent} />
}