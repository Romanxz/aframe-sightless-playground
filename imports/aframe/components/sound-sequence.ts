// @ts-nocheck
export { };

AFRAME.registerComponent('sound-sequence', {
  schema: {
    sounds: { type: 'array', default: [] },
    edgeSoundSpeed: { type: "number" }
  },

  init: function () {
    this.isPlaying - false;
    this.leftController = document.getElementById("left");
    this.soundIndex = 0;
    this.isTriggerDown = false;
    this.playSound = this.playSound.bind(this);
    this.leftController.addEventListener("ybuttondown", this.yButtonDown.bind(this));
    console.log("[sound-sequence] initialized")
  },

  yButtonDown: function () {
    if (this.isPlaying) {
      this.stopSequence();
    } else this.startSequence();
  },

  playSound: function () {
    if (this.data === undefined || this.data.sounds.length === 0) return;

    let soundEl;
    const currentObj = this.data.sounds[this.soundIndex];

    if (currentObj.type === "edge") {
      const edgeEl = document.getElementById(`${currentObj.id}`);
      soundEl = edgeEl.children[0];

      const sourcePos = document.getElementById(`${currentObj.sourceId}`).object3D.getWorldPosition(new THREE.Vector3());
      const targetPos = document.getElementById(`${currentObj.targetId}`).object3D.getWorldPosition(new THREE.Vector3());
      const sourceLocalPos = edgeEl.object3D.worldToLocal(sourcePos, new THREE.Vector3());
      const targetLocalPos = edgeEl.object3D.worldToLocal(targetPos, new THREE.Vector3());

      // console.log("Positions: ", { sourceLocalPos, targetLocalPos })
      soundEl.setAttribute("animation", {
        property: "position",
        from: { x: 0, y: sourceLocalPos.y, z: 0 },
        to: { x: 0, y: targetLocalPos.y, z: 0 },
        dur: this.data.edgeSoundSpeed || 1000
      });
      setTimeout(() => {
        soundEl.removeAttribute("animation");
      }, this.data.edgeSoundSpeed + 3 || 1003)
      // console.log("[sound-sequence] EdgeEl: ", { soundEl })
    } else {
      soundEl = document.getElementById(`${currentObj.id}`).children[0];
      // console.log("[sound-sequence] NodeEl: ", { soundEl })
    }

    soundEl.components.sound.playSound();

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
    this.isPlaying = true;
  },

  // Stop the current sound and end the sequence
  stopSequence: function () {
    for (const currentObj of this.data.sounds) {
      const soundEl = document.getElementById(`${currentObj.id}`)?.children?.[0];
      console.log("[sound-sequence] soundEl:", soundEl)
      if (soundEl && soundEl.components.sound) {
        soundEl.components.sound.stopSound();
        soundEl.removeEventListener("sound-ended", this.endListener);
      }
    };
    this.isPlaying = false;
    this.soundIndex = 0;
  },

  // update: function () {
  //   console.log("[sound-sequence] updated")
  // },

  remove: function () {
    const allSounds = document.querySelectorAll('a-entity[sound]');
    console.log("[sound-sequence] allSounds:", allSounds)
    for (const soundEl of allSounds) {
      if (soundEl && soundEl.components.sound) {
        soundEl.components.sound.stopSound();
        soundEl.removeEventListener("sound-ended", this.endListener);
      }
    };
    this.soundIndex = 0;
    this.data.sounds = [];
    this.leftController.removeEventListener("ybuttondown", this.yButtonDown.bind(this));
    console.log("[sound-sequence] removed")
  }
});