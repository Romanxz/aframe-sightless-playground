// @ts-nocheck
export { };

AFRAME.registerComponent('sound-sequence', {
  schema: {
    sounds: { type: 'array' },
  },

  init: function () {
    this.sceneContent = document.getElementById("content");
    this.soundIndex = 0;
    this.playSound = this.playSound.bind(this);
  },

  playSound: function () {
    let soundEl;
    const currentObj = this.data.sounds[this.soundIndex];

    if (currentObj.type === "edge") {
      const edgeEl = document.getElementById(`${currentObj.id}`);
      soundEl = edgeEl.children[0];

      const sourcePos = document.getElementById(`${currentObj.sourceId}`).object3D.getWorldPosition(new THREE.Vector3());
      const targetPos = document.getElementById(`${currentObj.targetId}`).object3D.getWorldPosition(new THREE.Vector3());
      // const sourcePosRot = sourcePos.applyQuaternion(edgeEl.object3D.quaternion)
      // const targetPosRot = targetPos.applyQuaternion(edgeEl.object3D.quaternion)
      const sourceLocalPos = edgeEl.object3D.worldToLocal(sourcePos, new THREE.Vector3());
      const targetLocalPos = edgeEl.object3D.worldToLocal(targetPos, new THREE.Vector3());

      // console.log("Positions: ", { sourceLocalPos, targetLocalPos })
      soundEl.setAttribute("animation", {
        property: "position",
        from: { x: 0, y: sourceLocalPos.y, z: 0 },
        to: { x: 0, y: targetLocalPos.y, z: 0 },
        dur: 4000
      });
      setTimeout(() => {
        soundEl.removeAttribute("animation");
      }, 4003)
      console.log("EdgeEl: ", { soundEl })
    } else {
      soundEl = document.getElementById(`${currentObj.id}`);
      console.log("NodeEl: ", { soundEl })
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
  },

  // Stop the current sound and end the sequence
  stopSequence: function () {
    let soundEl;
    const currentObj = this.data.sounds[this.soundIndex];

    if (currentObj.type === "edge") {
      soundEl = document.getElementById(`${currentObj.id}`).children[0];
    } else soundEl = document.getElementById(`${currentObj.id}`);

    soundEl.components.sound.stopSound();

    soundEl.removeEventListener("sound-ended", this.endListener);
    this.soundIndex = 0;
  }
});