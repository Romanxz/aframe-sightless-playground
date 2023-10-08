export { };
import * as THREE from 'three';

AFRAME.registerComponent('drag', {
  init: function () {
    this.intersectedObject = null; // Reference to the intersected object
    this.startPosition = new THREE.Vector3(); // Initial position of the object
    this.el.addEventListener('triggerdown', this.onTriggerDown.bind(this)); // Listen for triggerdown event
    this.el.addEventListener('triggerup', this.onTriggerUp.bind(this)); // Listen for triggerup event
    this.el.addEventListener('raycaster-intersection', this.onRaycasterIntersection.bind(this)); // Listen for raycaster-intersection event
  },

  onRaycasterIntersection: function (event) {
    const intersectedObject = event.detail.els[0]; // Get the first intersected element
    this.intersectedObject = intersectedObject; // Set the intersected object
    this.startPosition.copy(this.intersectedObject.object3D.position); // Save the initial position of the object
    console.log("raycster-intersection: ", event);
  },

  onTriggerDown: function (event) {
    if (this.intersectedObject !== null) {
      this.isDrag = true; // Flag to indicate that dragging has started
      console.log("triggerdown: ", event);
    }
  },

  onTriggerUp: function (event) {
    this.isDrag = false; // Flag to indicate that dragging has ended
    this.intersectedObject = null; // Clear the intersected object
    console.log("triggerup: ", event);
  },

  tick: function () {
    if (this.intersectedObject !== null && this.isDrag) {
      // Calculate the new position of the object relative to the controller's movement
      const currentPosition = this.intersectedObject.object3D.position.clone();
      const deltaPosition = currentPosition
        .sub(this.startPosition)
        .projectOnVector(this.el.object3D.getWorldDirection(new THREE.Vector3()))
        .multiplyScalar(this.el.object3D.position.distanceTo(currentPosition))
        .add(this.startPosition); // Calculate the new position by projecting the delta position on the controller direction

      // Move the object to the new position
      this.intersectedObject.object3D.position.copy(deltaPosition);
    }
  },
});