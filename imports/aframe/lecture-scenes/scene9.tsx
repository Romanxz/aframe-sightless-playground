import React from 'react';
import { v4 as uuid } from 'uuid';
import BlockDiagram from "../../react/components/block-diagram";

const sceneContent = [
  {
    id: 1,
    type: "node",
    sound: "scene9/network-off",
    refDistance: 0.4,
    voiceover: "scene9/no-network-connection",
    geometry: { primitive: "box", height: 1, width: 2, depth: 0.3 },
    position: { x: 0, y: 1.6, z: -2 }
  }
]

export default function Scene9() {
    return <BlockDiagram sceneContent={sceneContent} />
  }