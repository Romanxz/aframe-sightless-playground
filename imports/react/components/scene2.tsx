import React from 'react';
import { v4 as uuid } from 'uuid';
import BlockDiagram from "./block-diagram";

const sceneContent = [
  {
    id: 1,
    type: "node",
    sound: "cylinder",
    voiceover: "scene1/storage",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: 0, y: 1.6, z: -2 }
  },
  {
    id: 2,
    type: "node",
    sound: "cylinder",
    voiceover: "scene1/storage",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: 1.2, y: 2, z: -2 }
  },
  {
    id: 3,
    type: "node",
    sound: "cylinder",
    voiceover: "scene1/storage",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: 0, y: 2.4, z: -2 }
  },
  {
    id: 4,
    type: "node",
    sound: "cylinder",
    voiceover: "scene1/storage",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: -1.2, y: 2, z: -2 }
  },
  {
    id: 5,
    type: "node",
    sound: "cylinder",
    voiceover: "scene1/storage",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: -1.2, y: 1, z: -2 }
  },
  {
    id: 6,
    type: "node",
    sound: "cylinder",
    voiceover: "scene1/storage",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: 0, y: 0.8, z: -2 }
  },
  {
    id: 7,
    type: "node",
    sound: "cylinder",
    voiceover: "scene1/storage",
    geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
    position: { x: 1.2, y: 1, z: -2 }
  }
]

export default function Scene2() {
    return <BlockDiagram sceneContent={sceneContent} />
  }