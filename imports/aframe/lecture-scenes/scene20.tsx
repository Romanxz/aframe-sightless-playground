import React from 'react';
import { v4 as uuid } from 'uuid';
import BlockDiagram from "../../react/components/block-diagram";

const sceneContent = [
  {
    id: 1,
    type: "node",
    sound: "sounds/item1",
    voiceover: "scene20/book",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: 0.6, y: 2, z: -2 }
  },
  {
    id: 2,
    type: "node",
    sound: "sounds/item2",
    voiceover: "scene20/cake",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: -0.6, y: 2, z: -2 }
  },
  {
    id: 3,
    type: "node",
    sound: "sounds/item3",
    voiceover: "scene20/candies",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: -1.2, y: 1.2, z: -2 }
  },
  {
    id: 4,
    type: "node",
    sound: "sounds/item4",
    voiceover: "scene20/dog",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: 0, y: 1, z: -2 }
  },
  {
    id: 5,
    type: "node",
    sound: "sounds/item5",
    voiceover: "scene20/target",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: 1.2, y: 1.2, z: -2 }
  }
]

export default function Scene20() {
    return <BlockDiagram sceneContent={sceneContent} />
  }