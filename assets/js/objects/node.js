import * as THREE from "../threejs/three.module.js";
class Node {
  constructor(pos, scene, color) {
    this.pos = new THREE.Vector3(pos.x, pos.y, pos.z);
    this.color = color;
    this.addMeshToScene(scene);
    this.start = false;
    this.end = false;
  }
  addMeshToScene(scene) {
    const geometry = new THREE.SphereGeometry(1, 32, 16);
    const material = new THREE.MeshPhongMaterial({ color:  this.color});
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    sphere.position.set(this.pos.x, this.pos.y, this.pos.z);
  }
}

export default Node;
