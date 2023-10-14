// @ts-nocheck
export { };

AFRAME.registerComponent("geometry-generator", {
  init: function () {
    this.sceneContent = document.getElementById("content");
    this.isDrag = false; // Flag to track if the button is pressed
    this.distanceToTarget = -0.3 // Distance between the controller and the sphere entity
    this.generatedGeometry = null; // Reference to the generatedGeometry entity
    // Event listeners for Oculus Touch A button
    this.el.addEventListener("abuttondown", this.onAButtonDown.bind(this));
    this.el.addEventListener("abuttonup", this.onAButtonUp.bind(this));
  },

  onAButtonDown: function (event) {
    // Calculate position of the geometry inside sceneContent local coords relative to controller's world position and offset
    const geometryLocalPosition = this.sceneContent.object3D.worldToLocal(
      this.el.object3D.getWorldPosition(new THREE.Vector3()).clone().add({x: 0, y: 0, z: this.distanceToTarget}),
      new THREE.Vector3()
    );
    // Specify required properties
    const geometryProps = {
      geometry: "primitive: sphere; radius: 0.1",
      position: geometryLocalPosition,
      sound: {
        src: `${process.env.GH_PAGES_PATH_PREFIX || ""}playground-a.wav`,
        autoplay: true,
        loop: true,
        volume: 0.4,
        refDistance: 0.2,
        maxDistance: 40,
        rolloffFactor: 3,
      }
    };
    // Create the geometry entity with the specified properties
    this.generatedGeometry = document.createElement("a-entity");
    this.generatedGeometry.setAttribute("geometry", geometryProps.geometry);
    this.generatedGeometry.setAttribute("position", geometryProps.position);
    this.generatedGeometry.setAttribute("sound", geometryProps.sound);
    this.generatedGeometry.classList.add("draggable"); // Add the .draggable class
    // Add the geometry entity as a child of the sceneContent entity
    this.sceneContent.appendChild(this.generatedGeometry);
    // Set the flag to start dragging
    this.isDrag = true;
  },

  onAButtonUp: function () {
    // Set the flag to stop dragging
    this.isDrag = false;
    this.generatedGeometry = null;
  },

  tick: function () {
    if (this.isDrag && this.generatedGeometry !== null) {
      // Get the position and rotation of the controller
      const controllerPosition = this.el.object3D.getWorldPosition(new THREE.Vector3());
      const controllerRotation = this.el.object3D.getWorldQuaternion(new THREE.Quaternion());
      // Calculate the offset in the controller's world space based on the initial distance to the target
      const raduisOffset = new THREE.Vector3(0, 0, this.distanceToTarget);
      // Rotate the local offset to match the controller's current rotation
      raduisOffset.applyQuaternion(controllerRotation);
      // Compute the new position of the target entity inside parent's local space by adding the rotated offset to the current controller's position
      const newPosition = this.sceneContent.object3D.worldToLocal(controllerPosition.add(raduisOffset), new THREE.Vector3());
      // Update the position of the sphere entity
      this.generatedGeometry.object3D.position.copy(newPosition);
    }
  },
});