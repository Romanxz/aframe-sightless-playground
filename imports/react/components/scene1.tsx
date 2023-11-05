import "../../aframe/components/edge-positioner";
import React, { useEffect, useState } from 'react';
import { Entity, Scene } from "aframe-react";
import randomInteger from "random-int";
import { v4 as uuid } from 'uuid';

import { getColorFromId } from "../../aframe/methods/get-color-from-id";

const scene1Graph = {
  nodes: [
    {
      id: 1,
      soundName: "box",
      geometry: { primitive: "box", height: 0.3, width: 0.3, depth: 0.3 },
      position: { x: 1, y: 1.2, z: -2 }
    },
    {
      id: 3,
      soundName: "sphere",
      geometry: { primitive: "sphere", radius: 0.15 },
      position: { x: 0, y: 1.2, z: -2 }
    },
    {
      id: 5,
      soundName: "cylinder",
      geometry: { primitive: "cylinder", radius: 0.15, height: 0.3 },
      position: { x: -1, y: 1.2, z: -2 }
    }
  ],
  edges: [
    {
      id: 2,
      sourceId: 1,
      targetId: 3,
    },
    {
      id: 4,
      sourceId: 3,
      targetId: 5,
    }
  ]
}

export default function Scene1() {

  // useEffect(() => {
  //   const el1 = document.getElementById("1");
  //   const el2 = document.getElementById("2");
  //   const el3 = document.getElementById("3");
  //   const el4 = document.getElementById("4");
  //   const el5 = document.getElementById("5");
  //   // @ts-ignore
  //   el1.components.sound.playSound();
  //   el2.addEventListener("sound-ended", {})
  // },)

  return <Entity id="content" edge-positioner={{ edges: scene1Graph.edges }}>
    {scene1Graph.nodes.map((node) =>
      <Entity
        id={node.id}
        key={node.id}
        className="draggable"
        sound={{
          src: `${process.env.GH_PAGES_PATH_PREFIX || ""}${node.soundName}.wav`,
          autoplay: false,
          // loop: true,
          volume: 0.8,
          refDistance: 0.2,
          maxDistance: 60,
          rolloffFactor: 3,
        }}
        geometry={node.geometry}
        position={node.position}
        material={{
          shader: "standard", color: getColorFromId(randomInteger(0, 10000))
        }}
      />
    )}
    {scene1Graph.edges.map((edge) =>
      <Entity
        id={edge.id}
        key={edge.id}
        geometry={{ primitive: "cylinder", radius: 0.005, segmentsHeight: 3, openEnded: true, height: 1 }}
        material={{
          shader: "standard", color: getColorFromId(randomInteger(0, 10000)),
        }}
      >
        <Entity
          sound={{
            src: `${process.env.GH_PAGES_PATH_PREFIX || ""}edge.wav`,
            autoplay: false,
            // loop: true,
            volume: 0.8,
            refDistance: 0.2,
            maxDistance: 60,
            rolloffFactor: 3,
          }}
          animation={{property: "position",  }}
        />
      </Entity>
    )}
  </Entity>
}