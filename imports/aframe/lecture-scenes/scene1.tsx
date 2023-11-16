import React from 'react';
import { v4 as uuid } from 'uuid';
import BlockDiagram from "../../react/components/block-diagram";

const sceneContent = [
  {
    id: 1,
    type: "node",
    sound: "basic/cylinder",
    voiceover: "scene1/information-systems",
    geometry: { primitive: "box", height: 1, width: 2, depth: 0.3 },
    position: { x: 0, y: 1.6, z: -2 }
  }
]

export default function Scene1() {
    return <BlockDiagram sceneContent={sceneContent} />
  }