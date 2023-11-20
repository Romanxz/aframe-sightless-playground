import React from 'react';
import { v4 as uuid } from 'uuid';
import BlockDiagram from "../../react/components/block-diagram";

const sceneContent = [
    {
      id: 1,
      type: "node",
      sound: "sounds/item1",
      voiceover: "scene8/surname",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: -1.2, y: 2.4, z: -2 }
    },
    {
      id: 2,
      type: "node",
      sound: "sounds/item2",
      voiceover: "scene8/name",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: -0.4, y: 2.4, z: -2 }
    },
    {
      id: 3,
      type: "node",
      sound: "sounds/item3",
      voiceover: "scene8/phonenumber",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: 0.4, y: 2.4, z: -2 }
    },
    {
      id: 4,
      type: "node",
      sound: "sounds/item4",
      voiceover: "scene8/university",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: 1.2, y: 2.4, z: -2 }
    },
    {
      id: 5,
      type: "node",
      sound: "sounds/item1",
      voiceover: "scene8/ivanov",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: -1.2, y: 2, z: -2 }
    },
    {
      id: 6,
      type: "node",
      sound: "sounds/item2",
      voiceover: "scene8/petr",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: -0.4, y: 2, z: -2 }
    },
    {
      id: 7,
      type: "node",
      sound: "sounds/item3",
      voiceover: "scene8/8921",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: 0.4, y: 2, z: -2 }
    },
    {
      id: 8,
      type: "node",
      sound: "sounds/item4",
      voiceover: "scene8/itmo",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: 1.2, y: 2, z: -2 }
    },
    {
      id: 9,
      type: "node",
      sound: "sounds/item1",
      voiceover: "scene8/vereshyagin",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: -1.2, y: 1.6, z: -2 }
    },
    {
      id: 10,
      type: "node",
      sound: "sounds/item2",
      voiceover: "scene8/mikhail",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: -0.4, y: 1.6, z: -2 }
    },
    {
      id: 11,
      type: "node",
      sound: "sounds/win-error",
      voiceover: "scene8/error343",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: 0.4, y: 1.6, z: -2 }
    },
    {
      id: 12,
      type: "node",
      sound: "sounds/item4",
      voiceover: "scene8/mgu",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: 1.2, y: 1.6, z: -2 }
    },
    {
      id: 13,
      type: "node",
      sound: "sounds/item1",
      voiceover: "scene8/smelov",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: -1.2, y: 1.2, z: -2 }
    },
    {
      id: 14,
      type: "node",
      sound: "sounds/item2",
      voiceover: "scene8/vasiliy",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: -0.4, y: 1.2, z: -2 }
    },
    {
      id: 15,
      type: "node",
      sound: "sounds/item3",
      voiceover: "scene8/911",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: 0.4, y: 1.2, z: -2 }
    },
    {
      id: 16,
      type: "node",
      sound: "sounds/item4",
      voiceover: "scene8/spbgu",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: 1.2, y: 1.2, z: -2 }
    },
    {
      id: 17,
      type: "node",
      sound: "sounds/item1",
      voiceover: "scene8/vasiliev",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: -1.2, y: 0.8, z: -2 }
    },
    {
      id: 18,
      type: "node",
      sound: "sounds/item2",
      voiceover: "scene8/artem",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: -0.4, y: 0.8, z: -2 }
    },
    {
      id: 19,
      type: "node",
      sound: "sounds/win-error",
      voiceover: "scene8/errorngu",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: 0.4, y: 0.8, z: -2 }
    },
    {
      id: 20,
      type: "node",
      sound: "sounds/win-error",
      voiceover: "scene8/error901",
      geometry: { primitive: "box", height: 0.3, width: 0.6, depth: 0.2 },
      position: { x: 1.2, y: 0.8, z: -2 }
    }
  ]

export default function Scene8() {
    return <BlockDiagram sceneContent={sceneContent} />
  }