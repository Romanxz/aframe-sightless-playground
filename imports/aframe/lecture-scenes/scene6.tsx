import React from 'react';
import { v4 as uuid } from 'uuid';
import BlockDiagram from "../../react/components/block-diagram";

const sceneContent = [
  {
    id: 1,
    type: "node",
    sound: "basic/sphere",
    voiceover: "scene1/storage",
    geometry: { primitive: "cylinder", radius: 0.8, height: 0.3 },
    position: { x: 0, y: 2, z: -2 }
  },
  {
    id: 2,
    type: "node",
    sound: "basic/cylinder",
    voiceover: "scene1/storage",
    geometry: { primitive: "cylinder", radius: 0.8, height: 0.3 },
    position: { x: 0, y: 1.6, z: -2 }
  },
  {
    id: 3,
    type: "node",
    sound: "basic/box",
    voiceover: "scene1/storage",
    geometry: { primitive: "cylinder", radius: 0.8, height: 0.3 },
    position: { x: 0, y: 1.2, z: -2 }
  }
]

export default function Scene6() {
    return <BlockDiagram sceneContent={sceneContent} />
  }