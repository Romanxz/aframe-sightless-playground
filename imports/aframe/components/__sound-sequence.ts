// @ts-nocheck
export { };

AFRAME.registerComponent('sound-sequence', {
  schema: {
    sequenceData: { type: 'array' },
  },

  init: function () {
    this.currentSoundEntities = [];
    this.soundIndex = 0;
    this.sounds = this.mapSequenceDataToEntities();
  },

  mapSequenceDataToEntities: function() {
    // Map the sequence data to the corresponding entities
    let mappedData = this.data.sequenceData.map(data => {
      let el = document.getElementById(`${data.id}`);
      return {
        ...data,
        el,
      };
    });

    // Sort entities by their playbackQue
    mappedData.sort((a, b) => a.playbackQue - b.playbackQue);

    // Group entities by their playbackQue
    let queues = mappedData.reduce((queues, data) => {
      let queue = queues[data.playbackQue] || [];
      queue.push(data.el);
      queues[data.playbackQue] = queue;
      return queues;
    }, {});

    // Convert the queues object to an array
    return Object.values(queues);
  },

  playNextSound: function() {
    if (this.soundIndex >= this.sounds.length) return;

    // Get the next sound entity(-ies)
    const nextSoundEntities = this.sounds[this.soundIndex];

    // Stop any playing sounds:
    this.stopAllSounds();
    // Iterate through entities with the same playbackQue, play and attach listeners 
    nextSoundEntities.forEach(soundEl => {
      // Play the sound associated with the entity
      soundEl.components.sound.playSound();
      this.currentSoundEntities.push(soundEl);
      soundEl.addEventListener('sound-ended', this.soundEnded.bind(this));
    });
  },

  soundEnded: function (evt) {
    // Only proceed to the next sound(s) when all current sounds have ended
    if (!this.currentSoundEntities.every(ent => !ent.components.sound.isPlaying)) {
      setTimeout(this.soundEnded.bind(this), 500);
      return;
    }
    this.currentSoundEntities = [];
    this.soundIndex++; // Go to the next sound
    this.playNextSound();
  },

  stopAllSounds: function() {
    this.currentSoundEntities.forEach(entity => {
      // @ts-ignore
      if (entity.components.sound && entity.components.sound.isPlaying) {
        // @ts-ignore
        entity.components.sound.pauseSound();
      }
    });
    this.soundIndex = 0;
  },

  startSequence: function () {
    this.soundIndex = 0;
    this.playNextSound();
  },

  stopSequence: function () {
    this.stopAllSounds();
  },
});