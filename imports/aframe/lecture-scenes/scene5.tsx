import React from 'react';
import { v4 as uuid } from 'uuid';
import BlockDiagram from "../../react/components/block-diagram";

const sceneContent = [
  {
    id: 1,
    type: "node",
    sound: "sounds/large-square",
    refDistance: 0.4,
    voiceover: "scene5/calendar",
    geometry: { primitive: "box", height: 1.6, width: 1.5, depth: 0.3 },
    position: { x: 0, y: 1.8, z: -2 }
  },
  {
    id: 2,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: -0.2, y: 2.2, z: -1.9 }
  },
  {
    id: 3,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: 0, y: 2.2, z: -1.9 }
  },
  {
    id: 4,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: 0.2, y: 2.2, z: -1.9 }
  },
  {
    id: 5,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: 0.4, y: 2.2, z: -1.9 }
  },
  {
    id: 6,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: 0.6, y: 2.2, z: -1.9 }
  },
  {
    id: 7,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: -0.6, y: 2, z: -1.9 }
  },
  {
    id: 8,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: -0.4, y: 2, z: -1.9 }
  },
  {
    id: 9,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: -0.2, y: 2, z: -1.9 }
  },
  {
    id: 10,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: 0, y: 2, z: -1.9 }
  },
  {
    id: 11,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: 0.2, y: 2, z: -1.9 }
  },
  {
    id: 12,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: 0.4, y: 2, z: -1.9 }
  },
  {
    id: 13,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: 0.6, y: 2, z: -1.9 }
  },
  {
    id: 14,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: -0.6, y: 1.8, z: -1.9 }
  },
  {
    id: 15,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: -0.4, y: 1.8, z: -1.9 }
  },
  {
    id: 16,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: -0.2, y: 1.8, z: -1.9 }
  },
  {
    id: 17,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: 0, y: 1.8, z: -1.9 }
  },
  {
    id: 18,
    type: "node",
    sound: "sounds/cylinder",
    voiceover: "scene5/date",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: 0.2, y: 1.8, z: -1.9 }
  },
  {
    id: 19,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: 0.4, y: 1.8, z: -1.9 }
  },
  {
    id: 20,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: 0.6, y: 1.8, z: -1.9 }
  },
  {
    id: 21,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: -0.6, y: 1.6, z: -1.9 }
  },
  {
    id: 22,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: -0.4, y: 1.6, z: -1.9 }
  },
  {
    id: 23,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: -0.2, y: 1.6, z: -1.9 }
  },
  {
    id: 24,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: 0, y: 1.6, z: -1.9 }
  },
  {
    id: 25,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: 0.2, y: 1.6, z: -1.9 }
  },
  {
    id: 26,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: 0.4, y: 1.6, z: -1.9 }
  },
  {
    id: 27,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: 0.6, y: 1.6, z: -1.9 }
  },
  {
    id: 28,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: -0.6, y: 1.4, z: -1.9 }
  },
  {
    id: 29,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: -0.4, y: 1.4, z: -1.9 }
  },
  {
    id: 30,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: -0.2, y: 1.4, z: -1.9 }
  },
  {
    id: 31,
    type: "node",
    sound: "sounds/spherecut",
    refDistence: 0.1,
    voiceover: "scene5/calendar",
    geometry: { primitive: "sphere", radius: 0.1 },
    position: { x: 0, y: 1.4, z: -1.9 }
  }
]

export default function Scene5() {
    return <BlockDiagram sceneContent={sceneContent} />
  }