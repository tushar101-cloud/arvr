import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';

let scene, camera, renderer, controller;

// Initialize AR with Three.js
function initAR() {
    const container = document.getElementById('ar-container');

    // Create a Three.js scene
    scene = new THREE.Scene();

    // Create a camera for AR
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene.add(camera);

    // WebGL renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true; // Enable AR mode
    container.appendChild(renderer.domElement);

    // Add the AR button
    const arButton = ARButton.createButton(renderer);
    document.body.appendChild(arButton);

    // Add a 3D object (e.g., a box) for navigation
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const box = new THREE.Mesh(geometry, material);
    scene.add(box);

    // Animate the scene
    renderer.setAnimationLoop(() => {
        box.rotation.x += 0.01;
        box.rotation.y += 0.01;
        renderer.render(scene, camera);
    });
}

// Initialize AR.js scene
function initARjs() {
    const arScene = document.getElementById('ar-scene');
    arScene.style.display = 'block';  // Show the AR.js scene

    const scene = document.querySelector('a-scene');
    scene.setAttribute('arjs', 'sourceType: webcam;');
}

// Handle "Start Navigation" button click
document.getElementById('start-navigation').addEventListener('click', () => {
    // Show the AR.js scene
    initARjs();

    // Also initialize the Three.js AR experience
    initAR();
});
