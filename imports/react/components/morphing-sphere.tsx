import React, { useEffect, useState } from 'react';
import { Entity, Scene } from "aframe-react";
import "../../aframe/components/megashader";

import { getColorFromId } from "../../aframe/methods/get-color-from-id";

export default function MorphingSphere(props) {
  return (<Entity
    props={...props}
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
    position={{ x: 0, y: 1.5, z: -2 }}
    geometry={{ primitive: "icosahedron", radius: 0.6, detail: 300 }}
    megashader={{ color: "#6432a8" }}
  >
    {props.children}
  </Entity>
  )
}