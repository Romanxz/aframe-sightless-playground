// @ts-nocheck
export { };

AFRAME.registerComponent('haptics', {
  init: function () {
    this.xrSession = this.el.xrSession;
    this.tick = AFRAME.utils.throttleTick(this.tick, 10000, this);
    //   xrSession.inputSources.forEach(inputSource => {
    //     if (!inputSource.gamepad) {
    //       return;
    //     }
    //     if (inputSource.gamepad.hapticActuators) {
    //       inputSource.gamepad.hapticActuators[0].pulse(1.0, 100);
    //     }
    //   })
  },
  tick: function () {
    let scene = this.el;
    if (this.xrSession) {
      console.log("haptics: ", this.xrSession)
    }
    console.log("haptics: ", {AFRAME})
  }
});