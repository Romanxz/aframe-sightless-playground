// @ts-nocheck
export { };

AFRAME.registerComponent('sound-sequence', {
  schema: {
    sounds: { type: 'array' },
  },

  init: function () {
    this.soundIndex = 0;
    this.playSound = this.playSound.bind(this);
  },

  playSound: function () {
    const soundEl = document.getElementById(`${this.data.sounds[this.soundIndex].id}`);
    // Check if the sound component exists
    if (soundEl.components.sound) {
      soundEl.components.sound.stopSound();
      soundEl.components.sound.playSound();
    }

    // Listen on the entity for the sound-ended event
    this.endListener = () => {
      this.soundIndex = (this.soundIndex + 1) % this.data.sounds.length;
      this.playSound();
    }
    soundEl.addEventListener("sound-ended", this.endListener, { once: true });
  },

  // Start the sound sequence
  startSequence: function () {
    this.playSound();
  },

  // Stop the current sound and end the sequence
  stopSequence: function () {
    const soundEl = document.querySelector(`#${this.data.sounds[this.soundIndex].id}`);
    if (soundEl.components.sound) {
      soundEl.components.sound.stopSound();
    }
    soundEl.removeEventListener("sound-ended", this.endListener);
    this.soundIndex = 0;
  }
});