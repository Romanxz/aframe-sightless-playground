// @ts-nocheck
export { };

AFRAME.registerComponent('sound-playback', {
  schema: {
    throttle: { type: 'number', default: 500 },
  },

  init: function () {
    this.tick = AFRAME.utils.throttleTick(this.tick, this.data.throttle, this);
    this.soundIndex = 0;
  },

  playNextSound: function () {
    if (!this.soundEntities || this.soundEntities.length === 0 || this.soundIndex < 0) {
      return;
    }

    const sound = this.soundEntities[this.soundIndex];

    sound.components.sound.playSound();

    const playNextSound = () => {
      sound.removeEventListener('sound-ended', playNextSound);
      this.soundIndex = (this.soundIndex + 1) % this.soundEntities.length;
      this.playNextSound();
    };

    sound.addEventListener('sound-ended', playNextSound);
  },

  playSounds: function () {
    this.soundIndex = 0;
    this.playNextSound();
  },

  tick: function () {
    let soundEntities = Array.from(document.querySelectorAll('a-entity[sound]'));
    let cameraPos = this.el.sceneEl.camera.el.object3D.getWorldPosition(new THREE.Vector3());

    // Calculate distances from camera to each entity
    soundEntities.forEach(soundEl => {
      let entityPos = soundEl.object3D.getWorldPosition(new THREE.Vector3());
      soundEl.distanceToCamera = cameraPos.distanceTo(entityPos);
    });
    // Sort the entities by distance from near to far
    soundEntities.sort((entity1, entity2) => entity1.distanceToCamera - entity2.distanceToCamera);

    this.soundEntities = soundEntities;
  }
});