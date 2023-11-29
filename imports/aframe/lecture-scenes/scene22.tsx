import React from 'react';
import { v4 as uuid } from 'uuid';
import BlockDiagram from "../../react/components/block-diagram";

const sceneContent = [
  {
    id: 1,
    type: "node",
    sound: "sounds/box",
    voiceover: "scene22/studentstable",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: 0, y: 2, z: -2 }
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
    voiceover: "scene22/facultytable",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: -1, y: 2, z: -2 }
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
    sound: "sounds/sphere",
    voiceover: "scene22/studenttesttable",
    geometry: { primitive: "sphere", radius: 0.2 },
    position: { x: 1, y: 1.4, z: -2 }
  },
  {
    id: 6,
    type: "node",
    sound: "sounds/cylinder",
    voiceover: "scene22/testtable",
    geometry: { primitive: "cylinder", radius: 0.2, height: 0.3 },
    position: { x: 0, y: 1, z: -2 }
  },
  {
    id: 7,
    soundId: uuid(),
    type: "edge",
    sourceId: 6,
    targetId: 5,
  },
]

export default function Scene22() {
  return <BlockDiagram sceneContent={sceneContent} />
}