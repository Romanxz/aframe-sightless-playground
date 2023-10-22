// @ts-nocheck
export { };

AFRAME.registerComponent('drag', {
  init: function () {
    this.sceneContent = document.getElementById("content");
    this.intersectedObject = null; // Reference to the intersected object
    this.distanceToTarget = 0.1; // Distance from controller to the intersected object
    this.speedFactor = 0.05; // Adjust fishing rod extension speed factor to taste
    this.axisAngleOffset = -37; // Set the desired angle offset in degrees
    this.isDrag = false; // Flag to track if drag is active
    this.el.addEventListener('thumbstickmoved', this.onThumbStickMoved.bind(this)); // Listen for thumbupstart event
    this.el.addEventListener('gripdown', this.onGripDown.bind(this)); // Listen for triggerdown event
    this.el.addEventListener('triggerdown', this.onTriggerDown.bind(this)); // Listen for triggerdown event
    this.el.addEventListener('triggerup', this.onTriggerUp.bind(this)); // Listen for triggerup event
    this.el.addEventListener('raycaster-intersection', this.onRaycasterIntersection.bind(this)); // Listen for raycaster-intersection event
    this.el.addEventListener('raycaster-intersection-cleared', this.onRaycasterIntersectionCleared.bind(this)); // Listen for raycaster-intersection-cleared event
    console.log("drag initialized ", this.el);
  },

  onRaycasterIntersection: function (event) {
    if (this.intersectedObject === null) {
      const intersectedObject = event.detail.els[0]
      this.intersectedObject = intersectedObject // Set the intersected object
    }
    if (this.isDrag === false) {
      this.el.components.haptics.pulse(0.6, 200);
    };
  },

  onRaycasterIntersectionCleared: function (event) {
    if (this.isDrag === false) {
      this.intersectedObject = null; // Clear the intersected object
      this.distanceToTarget = 0;
      this.el.components.haptics.pulse(0.8, 80);
    };
  },

  onTriggerDown: function (event) {
    if (this.intersectedObject !== null) {
      const targetWorldPosition = this.intersectedObject.object3D.getWorldPosition(new THREE.Vector3());
      const controllerWorldPosition = this.el.object3D.getWorldPosition(new THREE.Vector3());
      this.distanceToTarget = targetWorldPosition.distanceTo(controllerWorldPosition);
      this.isDrag = true; // Flag to indicate that dragging has started
      this.el.components.haptics.pulse(0.8, 80);
    };
  },

  onTriggerUp: function (event) {
    if (this.intersectedObject !== null) {
      this.el.components.haptics.pulse(0.8, 80);
    };
    this.isDrag = false; // Flag to indicate that dragging has ended
    this.intersectedObject = null; // Clear the intersected object
  },

  onThumbStickMoved: function (evt) {
    if (this.intersectedObject !== null && this.isDrag) {
      const direction = evt.detail.y;
      this.distanceToTarget += -direction * this.speedFactor;
      this.distanceToTarget = Math.max(0.3, this.distanceToTarget);
      this.el.components.haptics.pulse(0.1, 10);
    };
  },

  onGripDown: function (event) {
    if (this.isDrag) {
      this.el.components.haptics.pulse(0.6, 200);
      this.distanceToTarget = 0.3;
    };
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
      // Compute the new position of the target entity inside parent's local space by adding the rotated offset to the current controller's position
      const newPosition = this.sceneContent.object3D.worldToLocal(controllerPosition.add(raduisOffset), new THREE.Vector3());
      // Update the position of the target entity
      this.intersectedObject.object3D.position.copy(newPosition);
    };
  }
});