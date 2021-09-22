import * as THREE from "../threejs/three.module.js";
class Node {
  constructor(pos, scene, color) {
    this.pos = new THREE.Vector3(pos.x, pos.y, pos.z);
    this.color = color;
    this.addMeshToScene(scene);
    this.start = false;
    this.end = false;
    this.geometry;
    this.material;
    this.sphere;
    this.connections = [];
  }
  addMeshToScene(scene) {
    this.geometry = new THREE.SphereGeometry(8, 32, 16);
    this.material = new THREE.MeshBasicMaterial({ color: this.color });
    this.sphere = new THREE.Mesh(this.geometry, this.material);
    scene.add(this.sphere);

    this.sphere.position.set(this.pos.x, this.pos.y, this.pos.z);
  }
  setStart() {
    this.color = 0xff0000;
    this.sphere.material = new THREE.MeshBasicMaterial({ color: this.color });
    this.start = true;
  }
  setEnd() {
    this.color = 0x00ff00;
    this.sphere.material = new THREE.MeshBasicMaterial({ color: this.color });
    this.end = true;
  }
}

export default Node;
