// @ts-nocheck
export {};

AFRAME.registerComponent('drag', {
  init: function () {
    this.intersectedObject = null; // Reference to the intersected object
    this.startPosition = new THREE.Vector3(); // Initial position of the object
    this.isDrag = false; // Drag activation flag
    this.el.addEventListener('triggerdown', this.onTriggerDown.bind(this)); // Listen for triggerdown event
    this.el.addEventListener('triggerup', this.onTriggerUp.bind(this)); // Listen for triggerup event
    this.el.addEventListener('raycaster-intersection', this.onRaycasterIntersection.bind(this)); // Listen for raycaster-intersection event
    this.el.addEventListener('raycaster-intersection-cleared', this.onRaycasterIntersectionCleared.bind(this)); // Listen for raycaster-intersection-cleared event
    console.log("drag initialized");
  },

  onRaycasterIntersection: function (event) {
    const intersectedObject = event.detail.els[0]; // Get the first intersected element
    this.intersectedObject = intersectedObject; // Set the intersected object
    console.log("raycster-intersection: ", this.intersectedObject);
  },

  onRaycasterIntersectionCleared: function (event) {
    if (!this.isDrag) {
      this.intersectedObject = null; // Clear the intersected object
      console.log("raycster-intersection-cleared: ", event);
    }
  },

  onTriggerDown: function (event) {
    if (this.intersectedObject !== null) {
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
    if (this.intersectedObject !== null && this.isDrag) {
      const intersection = this.el.components.raycaster.getIntersection(this.intersectedObject);
      if (intersection) {
        const intersectionPosition = intersection.point;
        this.intersectedObject.setAttribute("position", intersectionPosition);
      }
    }
  },
});