import React from 'react';
import { v4 as uuid } from 'uuid';
import BlockDiagram from "../../react/components/block-diagram";

const sceneContent = [
  {
    id: 1,
    type: "node",
    sound: "sounds/cylinder",
    voiceover: "scene6/reliability",
    geometry: { primitive: "cylinder", radius: 0.2, height: 0.4},
    position: { x: -1.5, y: 1.2, z: -2 }
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
    sound: "sounds/box",
    voiceover: "scene14/computer",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: -0.5, y: 1.8, z: -2 }
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
    sound: "sounds/box",
    voiceover: "scene14/smartphone",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: 0.5, y: 1.8, z: -2 }
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
    sound: "sounds/box",
    voiceover: "scene14/notebook",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: 1.5, y: 1.8, z: -2 }
  },
  {
    id: 8,
    soundId: uuid(),
    type: "edge",
    sourceId: 1,
    targetId: 9,
  },
  {
    id: 9,
    type: "node",
    sound: "sounds/box",
    voiceover: "scene14/computer",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: -0.5, y: 0.9, z: -2 }
  },
  {
    id: 10,
    soundId: uuid(),
    type: "edge",
    sourceId: 9,
    targetId: 11,
  },
  {
    id: 11,
    type: "node",
    sound: "sounds/box",
    voiceover: "scene14/smartphone",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: 0.5, y: 0.9, z: -2 }
  },
  {
    id: 12,
    soundId: uuid(),
    type: "edge",
    sourceId: 11,
    targetId: 13,
  },
  {
    id: 13,
    type: "node",
    sound: "sounds/box",
    voiceover: "scene14/notebook",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: 1.5, y: 0.9, z: -2 }
  }
]

export default function Scene16() {
    return <BlockDiagram sceneContent={sceneContent} />
  }