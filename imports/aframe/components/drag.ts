// @ts-nocheck
export {};

AFRAME.registerComponent('drag', {
  init: function () {
    this.intersectedObject = null; // Reference to the intersected object
    this.startPosition = new THREE.Vector3(); // Initial position of the object
    this.el.addEventListener('triggerdown', this.onTriggerDown.bind(this)); // Listen for triggerdown event
    this.el.addEventListener('triggerup', this.onTriggerUp.bind(this)); // Listen for triggerup event
    this.el.addEventListener('raycaster-intersection', this.onRaycasterIntersection.bind(this)); // Listen for raycaster-intersection event
    console.log("drag initialized");
  },

  onRaycasterIntersection: function (event) {
    const intersectedObject = event.detail.els[0]; // Get the first intersected element
    this.intersectedObject = intersectedObject; // Set the intersected object
    console.log("raycster-intersection: ", this.intersectedObject);
  },

  onTriggerDown: function (event) {
    if (this.intersectedObject) {
      this.startPosition.copy(this.intersectedObject.getAttribute("position")); // Save the initial position of the object
      this.isDrag = true; // Flag to indicate that dragging has started
      console.log("triggerdown: ", this.startPosition);
    }
  },

  onTriggerUp: function (event) {
    this.isDrag = false; // Flag to indicate that dragging has ended
    this.intersectedObject = null; // Clear the intersected object
    console.log("triggerup: ", event);
  },

  tick: function () {
    if (this.intersectedObject && this.isDrag) {
      // Calculate the new position of the object relative to the controller's movement
      const currentPosition = this.intersectedObject.getAttribute("position");
      const deltaPosition = currentPosition
        .sub(this.startPosition)
        .projectOnVector(this.el.object3D.getWorldDirection(new THREE.Vector3()))
        .multiplyScalar(this.el.object3D.position.distanceTo(currentPosition))
        .add(this.startPosition); // Calculate the new position by projecting the delta position on the controller direction
      console.log({ deltaPosition });
      // Move the object to the new position
      this.intersectedObject.setAttribute("position", { ...deltaPosition });
    }
  },
});