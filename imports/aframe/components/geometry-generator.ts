// @ts-nocheck
export { };

AFRAME.registerComponent("geometry-generator", {
  init: function () {
    this.sceneContent = document.getElementById("content");
    this.cameraRig = document.getElementById("cameraRig");
    this.isDrag = false; // Flag to track if the button is pressed
    this.isThumbstickReleased = true; // Flag to track if the thumbstick is released
    this.distanceToTarget = 0.3 // Distance between the controller and the sphere entity
    this.generatedEntity = null; // Reference to the generatedEntity entity
    this.geometryType = "sphere"; // Type of the generated geometry
    this.axisAngleOffset = -37; // Set the desired angle offset in degrees
    // Event listeners for Oculus Touch controller
    this.el.addEventListener('thumbstickmoved', this.onThumbStickMoved.bind(this));
    this.el.addEventListener("abuttondown", this.onAButtonDown.bind(this));
    this.el.addEventListener("bbuttondown", this.onBButtonDown.bind(this));
  },

  onAButtonDown: function (event) {
    if (this.generatedEntity === null) {
      // Specify required properties
      const geometryProps = {
        geometry: { primitive: "sphere", radius: 0.1 },
        // position: geometryLocalPosition,
        sound: {
          src: `${process.env.GH_PAGES_PATH_PREFIX || ""}playground-a.wav`,
          autoplay: true,
          loop: true,
          volume: 0.6,
          refDistance: 0.2,
          maxDistance: 60,
          rolloffFactor: 3,
        },
        material: {
          shader: "standard",
          opacity: 0.5,
        }
      };
      // Create the geometry entity with the specified properties
      this.generatedEntity = document.createElement("a-entity");
      this.generatedEntity.setAttribute("geometry", geometryProps.geometry);
      // this.generatedEntity.setAttribute("position", geometryProps.position);
      this.generatedEntity.setAttribute("sound", geometryProps.sound);
      this.generatedEntity.setAttribute("material", geometryProps.material);
      // Add the geometry entity as a child of the sceneContent entity
      this.sceneContent.appendChild(this.generatedEntity);
      // Set the flag to start dragging
      this.isDrag = true;
      this.el.components.haptics.pulse(0.6, 200);
    }
  },

  onBButtonDown: function () {
    if (this.isDrag && this.generatedEntity !== null) {
      this.el.components.haptics.pulse(0.6, 200);
    };
    // Set the flag to stop dragging
    this.generatedEntity.classList.add("draggable"); // Add the .draggable class
    this.generatedEntity.setAttribute("material", { opacity: 1 })
    this.generatedEntity.setAttribute("sound", { volume: 0.4 })
    this.isDrag = false;
    this.generatedEntity = null;
  },

  onThumbStickMoved: function (evt) {
    if (this.isDrag && this.generatedEntity !== null) {
      const direction = evt.detail.x;
      // Check the direction of the thumbstick movement
      if (direction < -0.2) {
        // Move to the previous geometry type if thumbstick is released
        if (this.isThumbstickReleased) {
          this.cycleGeometryType(-1);
          this.isThumbstickReleased = false;
        }
      } else if (direction > 0.2) {
        // Move to the next geometry type if thumbstick is released
        if (this.isThumbstickReleased) {
          this.cycleGeometryType(1);
          this.isThumbstickReleased = false;
        }
      } else {
        // Reset the flags and direction when thumbstick is released to its default position
        this.isThumbstickReleased = true;
      }
    }
  },

  cycleGeometryType: function (step) {
    const geometryTypes = ["sphere", "cylinder", "box"];
    // Get the current index of this.geometryType in the geometryTypes array
    const currentIndex = geometryTypes.indexOf(this.geometryType);
    // Calculate the new index based on the step value
    let newIndex = currentIndex + step;
    // Handle wrap-around if necessary
    if (newIndex < 0) {
      newIndex = geometryTypes.length - 1;
    } else if (newIndex >= geometryTypes.length) {
      newIndex = 0;
    }
    // Update this.geometryType to the new value
    this.geometryType = geometryTypes[newIndex];
    // Update generatedEntity props
    switch (this.geometryType) {
      case "sphere":
        this.generatedEntity.setAttribute("geometry", { primitive: this.geometryType, radius: 0.1 });
        this.generatedEntity.setAttribute("sound", { src: `${process.env.GH_PAGES_PATH_PREFIX || ""}playground-a.wav` })
        break;
      case "box":
        this.generatedEntity.setAttribute("geometry", { primitive: this.geometryType, height: 0.2, width: 0.2, depth: 0.2 });
        this.generatedEntity.setAttribute("sound", { src: `${process.env.GH_PAGES_PATH_PREFIX || ""}playground-b.wav` })
        break;
      case "cylinder":
        this.generatedEntity.setAttribute("geometry", { primitive: this.geometryType, radius: 0.1, height: 0.2 });
        this.generatedEntity.setAttribute("sound", { src: `${process.env.GH_PAGES_PATH_PREFIX || ""}playground-c.wav` })
        break;
    };
    // Log the updated geometry type (You can replace this line with your desired logic)
    this.el.components.haptics.pulse(0.8, 80);
    console.log("Geometry type changed:", this.geometryType);
  },

  tick: function () {
    if (this.isDrag && this.generatedEntity !== null) {
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
      // Update the position of the sphere entity
      this.generatedEntity.object3D.position.copy(newPosition);
    }
  },
});