import React from 'react';
import { v4 as uuid } from 'uuid';
import BlockDiagram from "../../react/components/block-diagram";

const sceneContent = [
  {
    id: 1,
    type: "node",
    sound: "basic/cylinder",
    voiceover: "scene14/storage",
    geometry: { primitive: "cylinder", radius: 0.15, height: 0.3 },
    position: { x: 1.5, y: 1.2, z: -2 }
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
    sound: "basic/sphere",
    voiceover: "scene14/businesslogic",
    geometry: { primitive: "sphere", radius: 0.15 },
    position: { x: 0, y: 1.2, z: -2 }
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
    sound: "basic/sphere",
    voiceover: "scene14/presentation",
    geometry: { primitive: "sphere", radius: 0.15 },
    position: { x: -1.3, y: 1.2, z: -2 }
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
    sound: "basic/box",
    voiceover: "scene14/computer",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: -2.5, y: 2, z: -2 }
  },
  {
    id: 8,
    soundId: uuid(),
    type: "edge",
    sourceId: 5,
    targetId: 9,
  },
  {
    id: 9,
    type: "node",
    sound: "basic/box",
    voiceover: "scene14/smartphone",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: -2.5, y: 1.2, z: -2 }
  },
  {
    id: 10,
    soundId: uuid(),
    type: "edge",
    sourceId: 5,
    targetId: 11,
  },
  {
    id: 11,
    type: "node",
    sound: "basic/box",
    voiceover: "scene14/notebook",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: -2.5, y: 0.4, z: -2 }
  },
]

export default function Scene14() {
  return <BlockDiagram sceneContent={sceneContent} />
}