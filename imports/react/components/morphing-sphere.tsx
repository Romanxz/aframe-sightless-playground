import React, { useEffect, useState } from 'react';
import { Entity, Scene } from "aframe-react";
import "../../aframe/components/megashader";

import { getColorFromId } from "../../aframe/methods/get-color-from-id";

export default function MorphingSphere({children, id, sound, position, ...props}) {
  return (<Entity
    id={id}
    sound={sound}
    position={position}
    className="draggable"
    events={{
      // loaded: () => {
      //   let boxEl = document.getElementById('box');
      //   if(!boxEl) return;
      //   // @ts-ignore
      //   let boxMesh = boxEl.object3DMap.mesh;
      //   console.log(boxMesh)
      //   let boxGeom = boxMesh.geometry;
      //   let vertices = boxGeom.vertices;

      //   vertices.forEach(vertex => {
      //     console.log(vertex.x, vertex.y, vertex.z);
      //   });
      // }
    }}
    geometry={{ primitive: "icosahedron", radius: 0.2, detail: 300 }}
    megashader={{ color: "#6432a8" }}
  >
    {children}
  </Entity>
  )
}