// @ts-nocheck
export { };

AFRAME.registerComponent('custom-sound', {
  schema: {
    src: { type: 'asset' },
    on: { default: '' },
    autoplay: { default: true },
    loop: { default: false },
    volume: { default: 1 },
    distanceModel: { default: 'inverse', oneOf: ['linear', 'inverse', 'exponential'] },
    maxDistance: { default: 10000 },
    refDistance: { default: 1 },
    rolloffFactor: { default: 1 },
    endDistance: { default: 1000 }
  },

  multiple: true,

  init: function () {
    const listener = this.el.sceneEl.audioListener || new THREE.AudioListener();
    this.el.setObject3D('listener', listener);

    const audioContext = listener.context;
    this.sound = new THREE.PositionalAudio(listener);
    this.gainNode = audioContext.createGain();
    this.sound.setNodeSource(this.gainNode);

    const camera = this.el.sceneEl.camera;
    if (camera) camera.add(listener);
    else this.el.sceneEl.addEventListener('camera-set-active', (evt) => evt.detail.cameraEl.getObject3D('camera').add(listener));

    this.source = audioContext.createBufferSource();
    this.source.connect(this.gainNode);

    this.loadBuffer();

    if (this.data.autoplay) {
      this.playSound();
    }

    if (this.data.on) {
      this.el.addEventListener(this.data.on, this.playSound.bind(this));
    }

    this.calculatedGain = this.data.volume;
  },

  update: function (oldData) {
    if (oldData && oldData.src !== this.data.src) {
      this.loadBuffer();
    }
  },

  tick: function () {
    const cameraPos = this.el.sceneEl.camera.el.object3D.position;
    const entityPos = this.el.object3D.position;
    const distance = entityPos.distanceTo(cameraPos);

    if (distance >= this.data.maxDistance && distance < this.data.endDistance) {
      this.calculatedGain = THREE.MathUtils.clamp(
        1 - ((distance - this.data.maxDistance) / (this.data.endDistance - this.data.maxDistance)),
        0,
        1
      );
    }
    else if (distance < this.data.maxDistance) {
      this.calculatedGain = this.data.volume;
    }
    this.gainNode.gain.value = Math.min(this.data.volume, this.calculatedGain);
  },

  remove: function () {
    this.el.removeObject3D(this.attrName);
  },

  loadBuffer: function () {
    const request = new XMLHttpRequest();
    request.open('GET', this.data.src, true);
    request.responseType = 'arraybuffer';

    const onSuccess = (buffer) => {
      this.source.loop = this.data.loop;
      this.source.buffer = buffer;
      this.source.start();
    };

    request.onload = () => {
      this.sound.context.decodeAudioData(request.response, onSuccess);
    };
    request.send();
  },

  playSound: function () {
    if (!this.source.buffer) {
      this.loadBuffer();
    }
    else {
      this.source.connect(this.gainNode);
    }
  },

  stopSound: function () {
    this.source.disconnect(this.gainNode);
  },
});