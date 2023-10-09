// @ts-nocheck
export {};

  AFRAME.registerComponent('drag', {
    init: function () {
      this.intersectedObject = null; // Reference to the intersected object
      this.startPosition = new THREE.Vector3(); // Initial position of the controller
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
      console.log("raycster-intersection: ", event);
    },

    onRaycasterIntersectionCleared: function (event) {
      if (!this.isDrag) {
        this.intersectedObject = null; // Clear the intersected object
        console.log("raycster-intersection-cleared: ", event);
      }
    },

    onTriggerDown: function (event) {
      if (this.intersectedObject !== null) {
        this.startPosition.copy(event.target.object3D.position); // Save the initial position of the object
        this.isDrag = true; // Flag to indicate that dragging has started
        console.log("triggerdown: ", {event});
      }
    },

    onTriggerUp: function (event) {
      this.isDrag = false; // Flag to indicate that dragging has ended
      this.intersectedObject = null; // Clear the intersected object
      console.log("triggerup: ", {event});
    },

    // tick: function () {
    //   if (this.intersectedObject !== null && this.isDrag) {
    //     const intersection = this.el.components.raycaster.getIntersection(this.intersectedObject);
    //     if (intersection) {
    //       // Calculate the position where the object should snap to follow the movement of the controller
    //       const worldPoint = intersection.point;
    //       const localPoint = this.intersectedObject.object3D.parent.worldToLocal(worldPoint.clone());
    
    //       // Apply the new position to the object
    //       this.intersectedObject.object3D.position.copy(localPoint);
    
    //       // Force the AFRAME entity to update the position
    //       this.intersectedObject.object3D.matrixNeedsUpdate = true;
    //     }
    //   }
    // }

    tick: function () {
      if (this.isDrag && this.intersectedObject) {
        // Store current position in a Three.js vector
        const currentPos = new THREE.Vector3();
        this.el.object3D.getWorldPosition(currentPos);
        // Use THREE.js copy() method to directly assign world position of intersected object to a target vector
        const targetPos = new THREE.Vector3().copy(this.intersectedObject.object3D.position);
        // Compute distance vector from the start position to the current position
        const delta = this.startPosition.clone().sub(currentPos);
        // Apply change in position to target position
        targetPos.sub(delta);
        // apply new position to our intersected object
        this.intersectedObject.object3D.position.copy(targetPos);
        // Reset start position to current position
        this.startPosition.copy(currentPos);
      }
    }
  });