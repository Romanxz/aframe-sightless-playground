import React from 'react';
import { v4 as uuid } from 'uuid';
import BlockDiagram from "../../react/components/block-diagram";

const sceneContent = [
  {
    id: 1,
    type: "node",
    sound: "sounds/item1",
    voiceover: "scene2/socialnets",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: 0, y: 1.6, z: -2 }
  },
  {
    id: 2,
    type: "node",
    sound: "sounds/item2",
    voiceover: "scene2/datastorage",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: 1.2, y: 2, z: -2 }
  },
  {
    id: 3,
    type: "node",
    sound: "sounds/item3",
    voiceover: "scene2/shoppingcart",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: 0, y: 2.4, z: -2 }
  },
  {
    id: 4,
    type: "node",
    sound: "sounds/item4",
    voiceover: "scene2/statistics",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: -1.2, y: 2, z: -2 }
  },
  {
    id: 5,
    type: "node",
    sound: "sounds/item5",
    voiceover: "scene2/bankdeposit",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: -1.2, y: 1, z: -2 }
  },
  {
    id: 6,
    type: "node",
    sound: "sounds/item6",
    voiceover: "scene2/mediacontent",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: 0, y: 0.8, z: -2 }
  },
  {
    id: 7,
    type: "node",
    sound: "sounds/item7",
    voiceover: "scene2/trips",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: 1.2, y: 1, z: -2 }
  }
]

export default function Scene2() {
    return <BlockDiagram sceneContent={sceneContent} />
  }