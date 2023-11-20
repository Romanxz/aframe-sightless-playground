import React from 'react';
import { v4 as uuid } from 'uuid';
import BlockDiagram from "../../react/components/block-diagram";

const sceneContent = [
  {
    id: 1,
    type: "node",
    sound: "sounds/quake-armor-long",
    voiceover: "scene6/reliability",
    geometry: { primitive: "cylinder", radius: 0.6, height: 1 },
    position: { x: 0, y: 1.6, z: -2 }
  }
]

export default function Scene6() {
    return <BlockDiagram sceneContent={sceneContent} />
  }