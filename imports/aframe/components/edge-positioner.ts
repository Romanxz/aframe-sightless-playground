// @ts-nocheck
export { };

AFRAME.registerComponent("edge-positioner", {
  schema: {
    edges: { type: "array", default: [] }
  },

  tick: function () {
    for (const edge of this.data.edges) {
      const edgeEl = document.getElementById(`${edge.id}`);
      const sourceEl = document.getElementById(`${edge.sourceId}`);
      const targetEl = document.getElementById(`${edge.targetId}`);
      if (edgeEl?.object3D && sourceEl?.object3D && targetEl?.object3D) {
        const spos = sourceEl.object3D.position;
        const tpos = targetEl.object3D.position;

        const midpoint = new THREE.Vector3().addVectors(spos, tpos).multiplyScalar(0.5);

        const height = spos.distanceTo(tpos);

        let orientation = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3().subVectors(tpos, spos).normalize()
        );

        edgeEl.object3D.position.set(midpoint.x, midpoint.y, midpoint.z);
        edgeEl.object3D.setRotationFromQuaternion(orientation);
        edgeEl.setAttribute('geometry', { height });
      }
    }
  },
});