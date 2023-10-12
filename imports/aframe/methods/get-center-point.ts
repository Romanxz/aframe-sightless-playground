// @ts-nocheck
export function getCenterPoint(entityEl) {
    // Get reference to the object's THREE.Mesh
    const obj = entityEl.object3D;

    // Update the world matrix first in case the object has been transformed
    obj.updateMatrixWorld(true);

    // Use the THREE.Box3 helper object to find the geometry's bounding box
    const box = new THREE.Box3().setFromObject(obj);

    // Apply the object's world matrix to get the center of the bounding box in world space
    const center = new THREE.Vector3(); 
    box.getCenter(center);
    center.applyMatrix4(obj.matrixWorld);

    return center;
}