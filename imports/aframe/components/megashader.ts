// @ts-nocheck
import vertexPars from '../shaders/vertex_pars.glsl'
import vertexMain from '../shaders/vertex_main.glsl'
import fragmentPars from '../shaders/fragment_pars.glsl'
import fragmentMain from '../shaders/fragment_main.glsl'

AFRAME.registerComponent('megashader', {
  schema:{
    color: {type:"string" , default: "0xffffff"}
  },

  init: function() {
    this.material = new THREE.MeshStandardMaterial({
      color: this.data.color,
      onBeforeCompile: (shader) => {
        // storing a reference to the shader object
        this.material.userData.shader = shader
  
        // uniforms
        shader.uniforms.uTime = { value: 0 }
  
        const parsVertexString = /* glsl */`#include <displacementmap_pars_vertex>`
        shader.vertexShader = shader.vertexShader.replace(
          parsVertexString,
          parsVertexString + vertexPars
        )
  
        const mainVertexString = /* glsl */`#include <displacementmap_vertex>`
        shader.vertexShader = shader.vertexShader.replace(
          mainVertexString,
          mainVertexString + vertexMain
        )
  
        const mainFragmentString = /* glsl */`#include <normal_fragment_maps>`
        const parsFragmentString = /* glsl */`#include <bumpmap_pars_fragment>`
        shader.fragmentShader = shader.fragmentShader.replace(
          parsFragmentString,
          parsFragmentString + fragmentPars
        )
        shader.fragmentShader = shader.fragmentShader.replace(
          mainFragmentString,
          mainFragmentString + fragmentMain
        )
      }
    });

    // Assuming the entity has a mesh, otherwise you might want to add the mesh here too.
    this.el.getObject3D('mesh').material = this.material;
    console.log("[megashader] initialized: ", this.material)
 },
 tick: function(time) {
  if (!this.material.userData.shader) return; 
  const timestamp = time / 5000
    this.material.userData.shader.uniforms.uTime.value = timestamp
 }
});