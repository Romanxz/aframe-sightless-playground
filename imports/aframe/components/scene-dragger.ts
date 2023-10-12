// @ts-nocheck
export { };

AFRAME.registerComponent("scene-dragger", {
  init: function () {
    // Input devices
    const rightController = document.getElementById("right");
    const leftController = document.getElementById("left");
    // Scene content to be dragged
    this.sceneContent = document.getElementById("content");
    // Flags and variables
    this.dragDisabled = false; // Set true when both grips are pressed or both pinches are started
    this.childEntities = null;
    this.lGripActive = false;
    this.rGripActive = false;
    this.lPinchActive = false;
    this.rPinchActive = false;
    this.lGripPos = new THREE.Vector3();
    this.lPinchPos = new THREE.Vector3();
    this.leftController = leftController;
    // Event listeners for left controller
    leftController.addEventListener("gripdown", this.onLeftGripDown.bind(this));
    leftController.addEventListener("gripup", this.onLeftGripUp.bind(this));
    leftController.addEventListener("pinchstarted", this.onLeftPinchStart.bind(this));
    leftController.addEventListener("pinchended", this.onLeftPinchEnd.bind(this));
    // Event listeners for right controller
    rightController.addEventListener("gripdown", this.onRightGripDown.bind(this));
    rightController.addEventListener("gripup", this.onRightGripUp.bind(this));
    rightController.addEventListener("pinchstarted", this.onRightPinchStart.bind(this));
    rightController.addEventListener("pinchended", this.onRightPinchEnd.bind(this));
    // Component init log
    console.log("scene-dragger initialized:", {
      sceneContent: this.sceneContent,
      rightController: rightController,
      leftController: leftController,
    });
  },
  // Left grip button is pressed
  onLeftGripDown: function (evt) {
    this.lGripActive = true;
    this.lGripPos.copy(evt.target.object3D.position); // Store position of left grip
    this.childEntities = Array.from(document.querySelectorAll(".draggable")); // Get child entities
    if (this.rGripActive) {
      this.dragDisabled = true; // Disable drag when both grips are pressed
    }
  },
  // Left grip button is released
  onLeftGripUp: function (evt) {
    this.lGripActive = false;
    this.childEntities = null;
    if (!this.rGripActive) {
      this.dragDisabled = false; // Enable drag when both grips are released
    }
  },
  // Right grip button is pressed
  onRightGripDown: function (evt) {
    this.rGripActive = true;
    if (this.lGripActive) {
      this.dragDisabled = true; // Disable drag when both grips are pressed
    }
  },
  // Right grip button is released
  onRightGripUp: function (evt) {
    this.rGripActive = false;
    if (!this.lGripActive) {
      this.dragDisabled = false; // Enable drag when both grips are released
    }
  },
  // Left pinch gesture started
  onLeftPinchStart: function (evt) {
    this.lPinchActive = true;
    this.lPinchPos.copy(evt.detail.position); // Store position of left pinch gesture
    this.childEntities = Array.from(document.querySelectorAll(".draggable")); // Get child entities
    if (this.rPinchActive) {
      this.dragDisabled = true; // Disable drag when both pinches are started
    }
  },
  // Left pinch gesture ended
  onLeftPinchEnd: function (evt) {
    this.lPinchActive = false;
    this.childEntities = null;
    if (!this.rPinchActive) {
      this.dragDisabled = false; // Enable drag when both pinches are ended
    }
  },
  // Right pinch gesture started
  onRightPinchStart: function (evt) {
    this.rPinchActive = true;
    if (this.lPinchActive) {
      this.dragDisabled = true; // Disable drag when both pinches are started
    }
  },
  // Right pinch gesture ended
  onRightPinchEnd: function (evt) {
    this.rPinchActive = false;
    if (!this.lPinchActive) {
      this.dragDisabled = false; // Enable drag when both pinches are ended
    }
  },
  tick: function () {
    // Controller drag
    if (this.rGripActive || this.dragDisabled) return;
    if (this.lGripActive) {
      const { x, y, z } = this.sceneContent.object3D.position; // Current position of the scene content
      const { x: currentX, y: currentY, z: currentZ } = this.leftController.object3D.position; // Current position of the controller
      const { x: gripX, y: gripY, z: gripZ } = this.lGripPos; // Start position of the left controller
      // Calculate the distance moved
      const deltaX = gripX - currentX;
      const deltaY = gripY - currentY;
      const deltaZ = gripZ - currentZ;
      // Calculate the new position by subtracting the distance moved
      const newPosition = new THREE.Vector3(x - deltaX * 2, y - deltaY * 2, z - deltaZ * 2);
      this.sceneContent.object3D.position.copy(newPosition); // Update the position of the scene content
      // Update the position of the left grip
      this.lGripPos.copy(this.el.object3D.position);
    }
    // Hand tracking drag
    if (this.rPinchActive || this.dragDisabled) return;
    if (this.lPinchActive) {
      const { x, y, z } = this.sceneContent.object3D.position; // Current position of the scene content
      const { x: currentX, y: currentY, z: currentZ } = this.leftController.object3D.position; // Current position of the controller
      const { x: pinchX, y: pinchY, z: pinchZ } = this.lPinchPos; // Start position of the left pinch gesture
      // Calculate the distance moved
      const deltaX = pinchX - currentX;
      const deltaY = pinchY - currentY;
      const deltaZ = pinchZ - currentZ;
      // Calculate the new position by subtracting the distance moved
      const newPosition = new THREE.Vector3(x - deltaX * 2, y - deltaY * 2, z - deltaZ * 2);
      this.sceneContent.object3D.position.copy(newPosition); // Update the position of the scene content
      // Update the position of the left pinch gesture
      this.lPinchPos.copy(this.el.object3D.position);
    }
  }
});