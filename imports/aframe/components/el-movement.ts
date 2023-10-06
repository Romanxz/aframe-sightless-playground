// @ts-nocheck
export { };
// const AFRAME = window.AFRAME;
// const THREE = require('aframe/src/lib/three');

AFRAME.registerComponent('el-movement', {
  init: function () { },
  tick: function () {
    const el = this.el;
    const elPosition = el.getAttribute('position');
    const elRotation = el.getAttribute('rotation');
    this.el.emit('el-moved', { position: elPosition, rotation: elRotation, el: this.el })
  }
});
