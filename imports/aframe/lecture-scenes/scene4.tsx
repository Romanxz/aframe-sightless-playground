import React from 'react';
import { v4 as uuid } from 'uuid';
import BlockDiagram from "../../react/components/block-diagram";

const sceneContent = [
  {
    id: 1,
    type: "node",
    sound: "sounds/large-square",
    refDistance: 0.4,
    voiceover: "scene4/registrationform",
    geometry: { primitive: "box", height: 1.4, width: 1.2, depth: 0.3 },
    position: { x: 0, y: 1.65, z: -2 }
  },
  {
    id: 2,
    type: "node",
    sound: "sounds/item1",
    voiceover: "scene4/name",
    geometry: { primitive: "box", height: 0.2, width: 0.7, depth: 0.2 },
    position: { x: 0, y: 2.05, z: -1.8 }
  },
  {
    id: 3,
    type: "node",
    sound: "sounds/item2",
    voiceover: "scene4/surname",
    geometry: { primitive: "box", height: 0.2, width: 0.7, depth: 0.2 },
    position: { x: 0, y: 1.8, z: -1.8 }
  },
  {
    id: 4,
    type: "node",
    sound: "sounds/item3",
    voiceover: "scene4/flightnumber",
    geometry: { primitive: "box", height: 0.2, width: 0.7, depth: 0.2 },
    position: { x: 0, y: 1.55, z: -1.8 }
  },
  {
    id: 5,
    type: "node",
    sound: "sounds/box",
    voiceover: "scene4/continue",
    geometry: { primitive: "box", height: 0.2, width: 0.7, depth: 0.2 },
    position: { x: 0, y: 1.2, z: -1.8 }
  }
]

export default function Scene4() {
    return <BlockDiagram sceneContent={sceneContent} />
  }