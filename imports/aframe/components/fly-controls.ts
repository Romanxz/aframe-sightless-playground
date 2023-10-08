// @ts-nocheck
// const AFRAME = window.AFRAME;
// const THREE = require('aframe/src/lib/three');

AFRAME.registerComponent('fly-controls', {
  schema: {
    speed: { default: 0.1 }
  },

  init: function () {
    this.directionVector = new THREE.Vector3();
    this.el.setAttribute('wasd-controls', 'enabled', false);
    this.el.setAttribute('look-controls', 'enabled', false);
    this.el.setAttribute('thumbstick-controls', 'hand: left;');

    var leftThumbstick = document.getElementById('left');

    leftThumbstick.addEventListener("thumbstickmoved", function (event) {
      var xMovement = event.detail.x;
      var zMovement = event.detail.y;

      // Calculate the new movement direction based on thumbstick movement
      this.directionVector.set(xMovement, 0, -zMovement);
      this.directionVector.normalize();
      this.directionVector.multiplyScalar(this.speed);
    }.bind(this));
  },

  update: function () {
    this.speed = this.data.speed;
  },

  tick: function () {
    var rotation = this.el.sceneEl.camera.parent.getWorldQuaternion(new THREE.Quaternion());
    this.directionVector.applyQuaternion(rotation);
    var position = this.el.getAttribute('position');
    position.x += this.directionVector.x;
    position.y += this.directionVector.y;
    position.z += this.directionVector.z;
    this.el.setAttribute('position', position);
  }
});
