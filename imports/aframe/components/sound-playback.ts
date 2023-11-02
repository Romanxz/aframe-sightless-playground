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

  playNextSound: function() {
    if (!this.soundEntities || this.soundEntities.length === 0 || this.soundIndex < 0) {
        return;
    }

    const soundEntity = this.soundEntities[this.soundIndex];
    soundEntity.components.sound.playSound();
    
    // console.log('[sound-playback] playing next sound:', soundEntity.getAttribute('id') || soundEntity.nodeName);

    const playNextSound = () => {
      soundEntity.removeEventListener('sound-ended', playNextSound);
      // console.log('[sound-playback] sound ended:', soundEntity.getAttribute('id') || soundEntity.nodeName);
      this.soundIndex = (this.soundIndex + 1) % this.soundEntities.length;
      this.playNextSound();
    };

    soundEntity.addEventListener('sound-ended', playNextSound);
  },

  stopSounds: function() {
    console.log('[sound-playback] stopping sounds');
    
    if (!this.soundEntities) return;
    
    this.soundEntities.forEach(entity => {
      if (entity.components.sound && entity.components.sound.isPlaying) {
        entity.components.sound.pauseSound();
      }
    });

    this.soundIndex = 0;
  },

  playSounds: function() {
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