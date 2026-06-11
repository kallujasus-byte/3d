import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 12;

const renderer = new THREE.WebGLRenderer({
    antialias:true,
    alpha:true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.getElementById("container").appendChild(renderer.domElement);

// Lights
const ambient = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambient);

const group = new THREE.Group();
scene.add(group);

const loader = new THREE.TextureLoader();

const imageCount = 8;
const radius = 6;

for(let i = 0; i < imageCount; i++){

    const texture = loader.load(`scrn${i}.jpg`);

    const geometry = new THREE.PlaneGeometry(2.3, 3.2);

    const material = new THREE.MeshBasicMaterial({
        map:texture,
        side:THREE.DoubleSide
    });

    const plane = new THREE.Mesh(
        geometry,
        material
    );

    const angle = (i / imageCount) * Math.PI * 2;

    plane.position.x = Math.sin(angle) * radius;
    plane.position.z = Math.cos(angle) * radius;

    plane.lookAt(0,0,0);

    group.add(plane);
}

// smooth animation
function animate(){

    requestAnimationFrame(animate);

    group.rotation.y += 0.003;

    renderer.render(scene,camera);
}

animate();

// resize
window.addEventListener("resize",()=>{

    camera.aspect =
    window.innerWidth /
    window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});