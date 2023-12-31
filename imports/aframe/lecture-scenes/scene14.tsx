import React from 'react';
import { v4 as uuid } from 'uuid';
import BlockDiagram from "../../react/components/block-diagram";

const sceneContent = [
  {
    id: 1,
    type: "node",
    sound: "sounds/sphere",
    voiceover: "scene14/presentation",
    geometry: { primitive: "sphere", radius: 0.2 },
    position: { x: -0.8, y: 1.4, z: -2 }
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
    voiceover: "scene14/ui",
    geometry: { primitive: "box", height: 0.4, width: 0.3, depth: 0.3 },
    position: { x: 0.8, y: 1.4, z: -2 }
  },
]

export default function Scene14() {
    return <BlockDiagram sceneContent={sceneContent} />
  }