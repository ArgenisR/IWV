let video;
let faceMesh;
let faces = [];
let triangles;
let uvCoords;
let textures = [];
let currentTextureIndex = 0;
let particles = []; // Para el fondo dinámico

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1 });
  textures.push(loadImage("mask1.png"));
  textures.push(loadImage("mask2.png"));
  textures.push(loadImage("mask3.png"));
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  faceMesh.detectStart(video, gotFaces);
  triangles = faceMesh.getTriangles();
  uvCoords = faceMesh.getUVCoords();

  // Generar partículas para el fondo
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: random(-width / 2, width / 2),
      y: random(-height / 2, height / 2),
      size: random(2, 6),
      speedX: random(-1, 1),
      speedY: random(-1, 1),
    });
  }

  // Agregar los event listeners para los botones
  document
    .getElementById("mask1")
    .addEventListener("click", () => changeTexture(0));
  document
    .getElementById("mask2")
    .addEventListener("click", () => changeTexture(1));
  document
    .getElementById("mask3")
    .addEventListener("click", () => changeTexture(2));
  document.getElementById("noMask").addEventListener("click", removeMask); // Botón para quitar la máscara
}

function draw() {
  // Fondo dinámico que ocupa toda la pantalla
  background(30, 30, 60);
  noStroke();
  for (let p of particles) {
    fill(100, 150, 200, 150);
    circle(p.x, p.y, p.size);
    p.x += p.speedX;
    p.y += p.speedY;
    if (p.x < -width / 2 || p.x > width / 2) p.speedX *= -1;
    if (p.y < -height / 2 || p.y > height / 2) p.speedY *= -1;
  }

  // Video centrado
  push();
  translate(-width / 2 + (width - 640) / 2, -height / 2 + (height - 480) / 2); // Centra la cámara
  image(video, 0, 0, 640, 480);
  pop();

  // Renderizado de máscara
  if (faces.length > 0 && currentTextureIndex !== -1) {
    let face = faces[0];
    push();
    translate(-width / 2 + (width - 640) / 2, -height / 2 + (height - 480) / 2); // Centra la máscara en la cámara
    texture(textures[currentTextureIndex]);
    textureMode(NORMAL);
    noStroke();
    beginShape(TRIANGLES);
    for (let i = 0; i < triangles.length; i++) {
      let tri = triangles[i];
      let [a, b, c] = tri;
      let pointA = face.keypoints[a];
      let pointB = face.keypoints[b];
      let pointC = face.keypoints[c];
      let uvA = uvCoords[a];
      let uvB = uvCoords[b];
      let uvC = uvCoords[c];
      vertex(pointA.x, pointA.y, uvA[0], uvA[1]);
      vertex(pointB.x, pointB.y, uvB[0], uvB[1]);
      vertex(pointC.x, pointC.y, uvC[0], uvC[1]);
    }
    endShape();
    pop();
  }
}

function gotFaces(results) {
  faces = results;
}

function changeTexture(index) {
  currentTextureIndex = index;
}

function removeMask() {
  currentTextureIndex = -1; // Esto elimina la máscara
}
