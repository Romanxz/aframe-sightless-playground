export { };
AFRAME.registerComponent('drag', {
    init: function () {
      this.intersectedObject = null;
      this.el.addEventListener('triggerdown', this.onTriggerDown.bind(this));
      this.el.addEventListener('triggerup', this.onTriggerUp.bind(this));
    },
    
    onTriggerDown: function (event) {
      // Check if the intersected object is draggable (e.g. has the 'draggable' class)
      const intersectedObject = event.detail.intersectedEl;
      if (intersectedObject.classList.contains('draggable')) {
        this.intersectedObject = intersectedObject;
      }
    },
    
    onTriggerUp: function () {
      this.intersectedObject = null;
    },
    
    tick: function () {
      if (this.intersectedObject !== null) {
        // Calculate the new position of the object relative to the controller's movement
        const currentPosition = this.el.object3D.position.clone();
        const deltaPosition = currentPosition.sub(this.startPosition);
        const newPosition = currentPosition.add(deltaPosition);
        
        // Move the object to the new position
        this.intersectedObject.object3D.position.copy(newPosition);
      }
    }
  });