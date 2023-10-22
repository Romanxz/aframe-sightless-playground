// @ts-nocheck
export { };
import { v4 as uuid } from 'uuid';

AFRAME.registerComponent("geometry-connector", {
  init: function () {
    this.sceneContent = document.getElementById("content");
    this.distanceToTarget = 0.3 // Distance between the controller and the sphere entity
    this.axisAngleOffset = -37; // Set the desired angle offset in degrees
    this.intersectedObject = null; // Reference to the intersected object
    this.lastIntersectedObject = null; // Reference to the last intersected object
    this.linkId = null;
    this.links = {};
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
    if (this.intersectedObject !== null) {
      // Create the link entity with the specified properties
      this.linkId = uuid();
      this.links[this.linkId].entity = document.createElement("a-entity");
      this.links[this.linkId].entity.setAttribute("geometry", { primitive: "cylinder", radius: 0.005, segmentsHeight: 6, openEnded: true });
      // Add the link entity as a child of the sceneContent entity
      this.sceneContent.appendChild(this.links[this.linkId].entity);
      this.links[this.linkId].source = this.intersectedObject;
      const intersectedObjecttWorldPosition = this.intersectedObject.object3D.getWorldPosition(new THREE.Vector3());
      const controllerWorldPosition = this.el.object3D.getWorldPosition(new THREE.Vector3());
      this.distanceToTarget = intersectedObjecttWorldPosition.distanceTo(controllerWorldPosition);
      this.lastIntersectedObject = this.intersectedObject;
      this.el.components.haptics.pulse(0.8, 80);
      console.log("onThumbStickDown: ", this.links);
    };
  },

  onThumbStickUp: function () {
    if ((this.intersectedObject !== this.lastIntersectedObject || null) && this.links[this.linkId] !== undefined) {
      this.links[this.linkId].target = this.intersectedObject;
      this.linkId = null;
      this.el.components.haptics.pulse(0.6, 200);
    } else {
      this.sceneContent.removeChild(this.links[this.linkId].entity);
      this.links[this.linkId] = undefined;
      this.linkId = null;
      this.el.components.haptics.pulse(0.8, 80);
    }
  },

  tick: function () {
    if (Object.keys(this.links).length > 0) {
      for (const linkId in this.links) {
        const linkSourcePosition = this.links[linkId].source.object3D.position;
        let linkTargetPosition;
        if (!this.links[linkId].target) {
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
          linkTargetPosition = this.sceneContent.object3D.worldToLocal(controllerPosition.add(raduisOffset), new THREE.Vector3());
        } else linkTargetPosition = this.links[linkId].target.object3D.position;

        const linkMidpoint = new THREE.Vector3().addVectors(linkSourcePosition, linkTargetPosition).multiplyScalar(0.5);

        const linkHeight = linkSourcePosition.distanceTo(linkTargetPosition);

        let linkOrientation = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3().subVectors(linkTargetPosition, linkSourcePosition).normalize()
        );
        // Update the coordinates of the link entity
        this.links[linkId].entity.object3D.position.copy(linkMidpoint);
        this.links[linkId].entity.object3D.setRotationFromQuaternion(linkOrientation);
        this.links[linkId].entity.setAttribute('geometry', { height: linkHeight });
      }
    }
  },
});