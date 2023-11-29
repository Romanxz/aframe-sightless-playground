import React from 'react';
import { v4 as uuid } from 'uuid';
import BlockDiagram from "../../react/components/block-diagram";

const sceneContent = [
  {
    id: 1,
    type: "node",
    sound: "sounds/sphere",
    voiceover: "scene12/statistics",
    geometry: { primitive: "sphere", radius: 0.2 },
    position: { x: 0, y: 2.2, z: -2 }
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
    voiceover: "scene12/messanger",
    geometry: { primitive: "box", height: 0.4, width: 0.3, depth: 0.3 },
    position: { x: -0.8, y: 1.2, z: -2 }
  },
  {
    id: 4,
    soundId: uuid(),
    type: "edge",
    sourceId: 1,
    targetId: 5,
  },
  {
    id: 5,
    type: "node",
    sound: "sounds/box",
    voiceover: "scene12/history",
    geometry: { primitive: "box", height: 0.4, width: 0.3, depth: 0.3 },
    position: { x: 0.8, y: 1.2, z: -2 }
  },
  {
    id: 6,
    soundId: uuid(),
    type: "edge",
    sourceId: 5,
    targetId: 3,
  },
]

export default function Scene12() {
    return <BlockDiagram sceneContent={sceneContent} />
  }