import React from 'react';
import { v4 as uuid } from 'uuid';
import BlockDiagram from "../../react/components/block-diagram";

const sceneContent = [
  {
    id: 1,
    type: "node",
    sound: "basic/item3",
    voiceover: "scene6/reliability",
    geometry: { primitive: "cylinder", radius: 0.8, height: 0.4 },
    position: { x: 0, y: 2, z: -2 }
  },
  {
    id: 2,
    type: "node",
    sound: "basic/item2",
    voiceover: "scene6/scalability",
    geometry: { primitive: "cylinder", radius: 0.8, height: 0.4 },
    position: { x: 0, y: 1.5, z: -2 }
  },
  {
    id: 3,
    type: "node",
    sound: "basic/item1",
    voiceover: "scene6/convenience",
    geometry: { primitive: "cylinder", radius: 0.8, height: 0.4 },
    position: { x: 0, y: 1, z: -2 }
  }
]

export default function Scene6() {
    return <BlockDiagram sceneContent={sceneContent} />
  }