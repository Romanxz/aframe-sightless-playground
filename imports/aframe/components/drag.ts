// @ts-nocheck
export { };

AFRAME.registerComponent('drag', {
  init: function () {
    this.sceneContent = document.getElementById("content");
    this.intersectedObject = null; // Reference to the intersected object
    this.distanceToTarget = 0;
    this.axisAngleOffset = -37; // Set the desired distance offset in degrees
    // this.startPosition = new THREE.Vector3(); // Initial position of the controller
    // this.startRotation = new THREE.Quaternion(); // Initial rotation of the controller
    this.el.addEventListener('triggerdown', this.onTriggerDown.bind(this)); // Listen for triggerdown event
    this.el.addEventListener('triggerup', this.onTriggerUp.bind(this)); // Listen for triggerup event
    this.el.addEventListener('raycaster-intersection', this.onRaycasterIntersection.bind(this)); // Listen for raycaster-intersection event
    this.el.addEventListener('raycaster-intersection-cleared', this.onRaycasterIntersectionCleared.bind(this)); // Listen for raycaster-intersection-cleared event
    console.log("drag initialized");
  },

  onRaycasterIntersection: function (event) {
    if (this.intersectedObject === null) {
      const intersectedObject = event.detail.els[0]
      this.intersectedObject = intersectedObject // Set the intersected object
      console.log("raycaster-intersection: ", event);
    }
  },

  onRaycasterIntersectionCleared: function (event) {
    if (!this.isDrag) {
      this.intersectedObject = null; // Clear the intersected object
      this.distanceToTarget = 0;
      console.log("raycaster-intersection-cleared: ", event);
    }
  },

  onTriggerDown: function (event) {
    if (this.intersectedObject !== null) {
      // this.startPosition.copy(this.el.object3D.position); // Save the initial position of the object
      // this.startRotation.copy(this.el.object3D.quaternion); // Save the initial rotation of the controller
      this.distanceToTarget = this.intersectedObject.object3D.getWorldPosition(new THREE.Vector3())
      .distanceTo(this.el.object3D.getWorldPosition(new THREE.Vector3()));
      this.isDrag = true; // Flag to indicate that dragging has started
      console.log("triggerdown: ", this.startPosition, this.startRotation);
    }
  },

  onTriggerUp: function (event) {
    this.isDrag = false; // Flag to indicate that dragging has ended
    this.intersectedObject = null; // Clear the intersected object
    this.distanceToTarget = 0;
    console.log("triggerup: ", event);
  },

  tick: function () {
    if (this.intersectedObject !== null && this.isDrag) {
      // Get the position and rotation of the controller
      const controllerPosition = this.el.object3D.getWorldPosition(new THREE.Vector3());
      const controllerRotation = this.el.object3D.getWorldQuaternion(new THREE.Quaternion());
      // Calculate the offset in the controller's world space based on the initial distance to the target
      const raduisOffset = new THREE.Vector3(0, 0, -this.distanceToTarget)
        // Apply the rotation offset to the local offset
        .applyAxisAngle(new THREE.Vector3(1, 0, 0), THREE.MathUtils.degToRad(this.axisAngleOffset));
      // Rotate the local offset to match the controller's current rotation
      raduisOffset.applyQuaternion(controllerRotation);
      // Compute the new position of the target entity by adding the rotated offset to the current controller's position
      const newPosition = controllerPosition.add(raduisOffset);
      // Update the position of the target entity
      this.intersectedObject.object3D.position.copy(newPosition);
    }
  }
});