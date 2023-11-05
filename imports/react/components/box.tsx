import React, { useEffect, useState } from 'react';
import { Entity, Scene } from "aframe-react";
import randomInteger from "random-int";

import { getColorFromId } from "../../aframe/methods/get-color-from-id";

export default function BoxGeometry() {

  return (<>
    <Entity id="box"
      className="draggable"
      events={{
        loaded: () => {
          // let boxEl = document.getElementById('box');
          // if(!boxEl) return;
          // // @ts-ignore
          // let boxMesh = boxEl.object3DMap.mesh;
          // console.log(boxMesh)
          // let boxGeom = boxMesh.geometry;
          // let vertices = boxGeom.vertices;

          // vertices.forEach(vertex => {
          //   console.log(vertex.x, vertex.y, vertex.z);
          // });
        }
      }}
      sound={{
        src: `${process.env.GH_PAGES_PATH_PREFIX || ""}box.wav`,
        autoplay: false,
        // loop: true,
        volume: 0.8,
        refDistance: 0.2,
        maxDistance: 60,
        rolloffFactor: 3,
      }}
      geometry={{ primitive: "box", height: 0.2, width: 0.2, depth: 0.2 }}
      position={{ x: 1, y: 1.2, z: -1 }}
      material={{
        shader: "standard",
        color: getColorFromId(randomInteger(0, 10000))
      }}
    >
    </Entity>
  </>)
}