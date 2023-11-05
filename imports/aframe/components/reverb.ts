// @ts-nocheck
export { };

// AFRAME.registerSystem('reverb', {
//   init: function () {
//     // Wait for the 'loaded' event to ensure the camera and its audioListener are available.
//     this.el.addEventListener('loaded', () => {
//       // Get the A-Frame Sound System (camera's audioListener)
//       const scene = this.el
//       console.log({scene})
//       this.audioContext = this.el.audioListener.context
//       this.convolver = this.audioContext.createConvolver();
//       this.gain = this.audioContext.createGain();
//       this.convolver.connect(this.gain);
//       this.gain.connect(this.audioContext.destination);
//     });
//   },
// });

// AFRAME.registerComponent('reverb', {
//   dependencies: ['geometry'],

//   init: function () {
//     console.log(this.system);
//     this.insideSoundEntities = Array.from(this.el.querySelectorAll('[sound]'));
//     this.insideSoundEntities.forEach(entity => {
//       entity.components.sound.pool.children[0].setFilter(this.system.convolver);
//     });

//     this.setImpulse();
//   },

//   update: function (oldData) {
//     // If the geometry has been updated, we need to update the impulse response
//     if (oldData !== this.data) {
//       this.setImpulse();
//     }
//   },

//   setImpulse: function () {
//     // Incoming audio gets zeroed out for 0.01 seconds (10ms), then
//     // a burst of noise is added in. This is the 'impulse'
//     const duration = 2;  // In seconds
//     const decay = this.getDecayTime(); // Or use a number here if you don't want to vary by room size
//     const sampleRate = this.system.audioContext.sampleRate;
//     const length = duration * sampleRate;
//     const impulse = this.system.audioContext.createBuffer(2, length, sampleRate);
//     const impulseData = [impulse.getChannelData(0), impulse.getChannelData(1)];
//     for (let i = 0; i < length; i++) {
//       let x = i / length;
//       let y = (Math.exp(-x * x * decay) - Math.exp(-decay));
//       impulseData[0][i] = impulseData[1][i] = y * Math.random();
//     }
//     this.system.convolver.buffer = impulse;
//   },

//   getDecayTime: function () {
//     const multiplier = 0.3; // change this to control overall decay rate
//     var size = this.el.getAttribute('geometry');
//     return (size.width + size.height + size.depth) * multiplier;
//   }
// });