// @ts-nocheck
export { };

AFRAME.registerComponent("geometry-generator", {
  init: function () {
    this.sceneContent = document.getElementById("content");
    this.isDrag = false; // Flag to track if the button is pressed
    this.offset = { x: 0, y: 0.3, z: -0.3 } // Offset between the controller and the sphere entity
    this.generatedGeometry = null; // Reference to the generatedGeometry entity
    // Event listeners for Oculus Touch A button
    this.el.addEventListener("abuttondown", this.onAButtonDown.bind(this));
    this.el.addEventListener("abuttonup", this.onAButtonUp.bind(this));
  },

  onAButtonDown: function (event) {
    // Calculate position of the geometry inside sceneContent local coords relative to controller's world position and offset
    const geometryLocalPosition = this.sceneContent.object3D.worldToLocal(
      this.el.object3D.getWorldPosition(new THREE.Vector3()).clone().add(this.offset),
      new THREE.Vector3()
    );
    // Specify required properties
    const geometryProps = {
      geometry: "primitive: sphere; radius: 0.1",
      position: geometryLocalPosition,y: 0.3,
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
      // Calculate the new geometry position in the local coordinates of the content entity with desired offset
      const geometryLocalPosition = this.sceneContent.object3D.worldToLocal(
        controllerPosition.add(this.offset).applyQuaternion(controllerRotation),
        new THREE.Vector3()
      );
      // Update the position of the sphere entity
      this.generatedGeometry.object3D.position.copy(geometryLocalPosition);
    }
  },
});