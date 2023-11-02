// @ts-nocheck
export { };

AFRAME.registerComponent('sound-playback', {
  schema: {
    throttle: { type: 'number', default: 500 },
  },

  init: function () {
    this.tick = AFRAME.utils.throttleTick(this.tick, this.data.throttle, this);
    this.soundIndex = 0;
    console.log('[sound-playback] initialized');
  },

  playNextSound: function () {
    // Check that there are sound entities available and 
    // the soundIndex points to a valid sound entity
    if (!this.soundEntities || this.soundEntities.length === 0 || this.soundIndex < 0) {
      console.log('[sound-playback] playNextSound: conditions not met');
      return;
    }

    // Get the next sound entity
    const nextSoundEntity = this.soundEntities[this.soundIndex];

    // Check if this sound entity is already playing
    if (this.currentSoundEntity === nextSoundEntity) {
      // If so, we increment the sound index (and wrapp around if necessary)
      this.soundIndex = (this.soundIndex + 1) % this.soundEntities.length;
      // Then we call this function again to get the next sound entity
      this.playNextSound();
    } else {
      // If the next sound entity is not currently playing, we play its sound
      nextSoundEntity.components.sound.playSound();

      // console.log('[sound-playback] playing next sound:', nextSoundEntity.getAttribute('id') || nextSoundEntity.nodeName, `index: ${this.soundIndex}`);

      const playNextSound = () => {
        nextSoundEntity.removeEventListener('sound-ended', playNextSound);
        // console.log('[sound-playback] sound ended:', nextSoundEntity.getAttribute('id') || nextSoundEntity.nodeName);
        this.currentSoundEntity = null;
        this.soundIndex = (this.soundIndex + 1) % this.soundEntities.length;
        this.playNextSound();
      };
      nextSoundEntity.addEventListener('sound-ended', playNextSound);
      this.currentSoundEntity = nextSoundEntity;
    }
  },

  stopSounds: function () {
    console.log('[sound-playback] stopping sounds');

    if (!this.soundEntities) return;

    this.soundEntities.forEach(entity => {
      if (entity.components.sound && entity.components.sound.isPlaying) {
        entity.components.sound.pauseSound();
      }
    });

    this.soundIndex = 0;
  },

  playSounds: function () {
    this.stopSounds();
    console.log('[sound-playback] playSounds');
    this.soundIndex = 0;
    this.playNextSound();
  },

  tick: function (time, timeDelta) {
    let soundEntities = Array.from(document.querySelectorAll('a-entity[sound]'));
    let cameraPos = this.el.sceneEl.camera.el.object3D.getWorldPosition(new THREE.Vector3());

    soundEntities.forEach(soundEl => {
      let entityPos = soundEl.object3D.getWorldPosition(new THREE.Vector3());
      soundEl.distanceToCamera = cameraPos.distanceTo(entityPos);
    });

    soundEntities.sort((entity1, entity2) => entity1.distanceToCamera - entity2.distanceToCamera);
    // console.log(`[sound-playback] tick update: `, soundEntities );
    this.soundEntities = soundEntities;
  }
});