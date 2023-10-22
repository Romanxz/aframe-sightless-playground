// @ts-nocheck
export { };

AFRAME.registerComponent("geometry-connector", {
  init: function () {
    this.sceneContent = document.getElementById("content");
    this.isThumbstickReleased = true; // Flag to track if the thumbstick is released
    this.distanceToTarget = 0.3 // Distance between the controller and the sphere entity
    this.axisAngleOffset = -37; // Set the desired angle offset in degrees
    this.linkEntity = null; // Reference to the linkEntity entity
    this.intersectedObject = null; // Reference to the intersected object
    this.lastIntersectedObject = null; // Reference to the last intersected object
    this.linkTargetPosition = null; 
    // Event listeners for Oculus Touch controller
    // this.el.addEventListener('thumbstickmoved', this.onThumbStickMoved.bind(this));
    this.el.addEventListener("thumbstickdown", this.onThumbStickDown.bind(this));
    this.el.addEventListener("thumbstickup", this.onThumbStickUp.bind(this));
    this.el.addEventListener('raycaster-intersection', this.onRaycasterIntersection.bind(this)); // Listen for raycaster-intersection event
    this.el.addEventListener('raycaster-intersection-cleared', this.onRaycasterIntersectionCleared.bind(this)); // Listen for raycaster-intersection-cleared event
  },

  onRaycasterIntersection: function (event) {
    if (this.intersectedObject === null) {
      const intersectedObject = event.detail.els[0];
      this.intersectedObject = intersectedObject // Set the intersected object
      console.log("raycaster-intersection: ", event);
    }
  },

  onRaycasterIntersectionCleared: function (event) {
    if (this.linkEntity === false) {
      this.intersectedObject = null; // Clear the intersected object
      this.distanceToTarget = 0;
      console.log("raycaster-intersection-cleared: ", event);
    };
  },

  onThumbStickDown: function (event) {
    if (this.intersectedObject !== null && this.linkEntity === null) {
      // Create the geometry entity with the specified properties
      this.linkEntity = document.createElement("a-entity");
      this.linkEntity.setAttribute("geometry", { primitive: "cylinder", radius: 0.005, segmentsHeight: 6, openEnded: true });
      // Add the geometry entity as a child of the sceneContent entity
      this.sceneContent.appendChild(this.linkEntity);
      const targetWorldPosition = this.intersectedObject.object3D.getWorldPosition(new THREE.Vector3());
      const controllerWorldPosition = this.el.object3D.getWorldPosition(new THREE.Vector3());
      this.distanceToTarget = targetWorldPosition.distanceTo(controllerWorldPosition);
      this.lastIntersectedObject = this.intersectedObject;
      this.el.components.haptics.pulse(0.8, 80);
    };
  },

  onThumbStickUp: function () {
    if ((this.intersectedObject !== this.lastIntersectedObject || null) && this.linkEntity !== null) {
      this.linkTargetPosition = this.intersectedObject.object3D.position;
      this.el.components.haptics.pulse(0.6, 200);
    } else {
      this.sceneContent.removeChild(this.linkEntity);
      this.linkEntity = null;
      this.el.components.haptics.pulse(0.8, 80);
    }
  },

  tick: function () {
    if (this.linkEntity !== null && this.lastIntersectedObject !== null) {
      const linkSourcePosition = this.lastIntersectedObject.object3D.position;
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
      const linkTargetPosition = this.linkTargetPosition !== null 
      ? this.linkTargetPosition 
      : this.sceneContent.object3D.worldToLocal(controllerPosition.add(raduisOffset), new THREE.Vector3());

      const linkMidpoint = new THREE.Vector3().addVectors(linkSourcePosition, linkTargetPosition).multiplyScalar(0.5);

      const linkHeight = linkSourcePosition.distanceTo(linkTargetPosition);

      let linkOrientation = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3().subVectors(linkTargetPosition, linkSourcePosition).normalize()
      );
      // Update the coordinates of the link entity
      this.linkEntity.object3D.position.copy(linkMidpoint);
      this.linkEntity.object3D.setRotationFromQuaternion(linkOrientation);
      this.linkEntity.setAttribute('geometry', { height: linkHeight });
    }
  },
});