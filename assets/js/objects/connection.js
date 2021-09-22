import * as THREE from "../threejs/three.module.js";
class Connection {
  constructor(nodes, color, scene) {
    this.nodes = nodes;
    this.color = color;
    this.points = [nodes[0].pos, nodes[1].pos];

    this.material = new THREE.LineBasicMaterial({ color: this.color });
    this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
    this.line = new THREE.Line(this.geometry, this.material);
    scene.add(this.line);
  }
}
export default Connection;
