import * as THREE from "./threejs/three.module.js";
import { OrbitControls } from "./threejs/OrbitControls.js";
import Node from "./objects/node.js";
import Connection from './objects/connection.js';

console.log('start')

let nodeCountInput = $("#node-count");

function main() {
  const canvas = document.querySelector("#canvas");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 500;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 175;

  const controls = new OrbitControls(camera, renderer.domElement);

  const scene = new THREE.Scene();

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    const light2 = new THREE.DirectionalLight(color, intensity);
    light2.position.set(2, -2, -1);
    scene.add(light, light2);
  }

  function getRandomColor() {
    function randomValue() {
      return Math.round(Math.random() * 255);
    }

    let r = randomValue();
    let g = randomValue();
    let b = randomValue();

    //Makes suren that all nodes are easily visible by adding to their value if below a threshold
    if (r + g + b < 200) {
      let num = 200 - r + g + b;
      r += num;
      g += num;
      b += num;
    }
    let rgb = r + "," + g + "," + b + ")";
    return "rgb(" + rgb;
  }
  function getRandomPosition(max) {
    let randX = Math.round(Math.random() * max) - max / 2;
    let randY = Math.round(Math.random() * max) - max / 2;
    let randZ = Math.round(Math.random() * -max) + max / 2;

    return { x: randX, y: randY, z: randZ };
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function init() {
    while (scene.children.length > 0) {
      scene.remove(scene.children[0]);
      console.log(scene.children.length)
    }
    let unconnectedNodes = [];
    for (let i = 0; i < nodeCountInput.val(); i++) {
      let newPos = getRandomPosition(200);

      for (let j = 0; i < unconnectedNodes.length; j++) {
        if (unconnectedNodes[j].pos.distanceTo(newPos) <= 16) {
          newPos = getRandomPosition(200);
          j = 0;
        }
      }
      let node = new Node(newPos, scene, 0xffffff /*getRandomColor()*/);
      unconnectedNodes.push(node);
    }

    let connectedNodes = [];
    let connectionsArr = [];
    while (unconnectedNodes.length > 0) {
      let currentNode = unconnectedNodes[0];
      unconnectedNodes.splice(0, 1);
      
      let indexs = [
        Math.floor(Math.random() * unconnectedNodes.length - 1) + 1,
        Math.floor(Math.random() * unconnectedNodes.length - 1) + 1,
      ];

      let connections = [
        unconnectedNodes[indexs[0]],
        unconnectedNodes[indexs[1]],
      ];
      if (indexs[0] == indexs[1]) {
        if (unconnectedNodes.length == 1) {
          connections.splice(0, 1);
          unconnectedNodes.splice(0, 1);
        } else {
          while (indexs[0] == indexs[1]) {
            indexs[0] =
              Math.floor(Math.random() * unconnectedNodes.length - 1) + 1;
          }
          connections = [
            unconnectedNodes[indexs[0]],
            unconnectedNodes[indexs[1]],
          ];
        }
      }
      
      connectedNodes.push(currentNode);
      for (let i = 0; i < connections.length; i++) {
        connectionsArr.push(new Connection([currentNode, connections[i]], 0x444444, scene));
      }
      
    }
    connectedNodes[0].setStart();
    connectedNodes[connectedNodes.length - 1].setEnd();

    requestAnimationFrame(render);
  }
  init();

  function render(time) {
    time *= 0.001; // convert time to seconds

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  nodeCountInput.on("change", () => {
    console.log('change')
    let value = nodeCountInput.val();
    $("#node-count-label").text("Nodes: " + value);
    init();
  });
}
main();
