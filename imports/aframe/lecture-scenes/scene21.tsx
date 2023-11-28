import React from 'react';
import { v4 as uuid } from 'uuid';
import BlockDiagram from "../../react/components/block-diagram";

const sceneContent = [
  {
    id: 1,
    type: "node",
    sound: "sounds/box",
    voiceover: "scene6/scalability",
    geometry: { primitive: "box", height: 0.4, width: 0.3, depth: 0.3 },
    position: { x: -0.8, y: 2, z: -2 }
  },
  {
    id: 2,
    type: "node",
    sound: "sounds/box",
    voiceover: "scene6/convenience",
    geometry: { primitive: "box", height: 0.4, width: 0.3, depth: 0.3 },
    position: { x: 0.8, y: 2, z: -2 }
  },
  {
    id: 3,
    type: "node",
    sound: "sounds/sphere",
    voiceover: "scene6/reliability",
    geometry: { primitive: "sphere", radius: 0.2 },
    position: { x: 0, y: 1.2, z: -2 }
  },
]

export default function Scene21() {
  return <BlockDiagram sceneContent={sceneContent} />
}