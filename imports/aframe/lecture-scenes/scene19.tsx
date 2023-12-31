import React from 'react';
import { v4 as uuid } from 'uuid';
import BlockDiagram from "../../react/components/block-diagram";

const sceneContent = [
  {
    id: 1,
    type: "node",
    sound: "sounds/win-error",
    voiceover: "scene19/unknownformat",
    geometry: { primitive: "box", height: 0.5, width: 1, depth: 0.3 },
    position: { x: 0, y: 1.6, z: -2 }
  }
]

export default function Scene19() {
    return <BlockDiagram sceneContent={sceneContent} />
  }