let stars = []; // Arreglo para las estrellas
let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Crear estrellas aleatorias
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(2, 5),
      speed: random(0.5, 1),
      brightness: random(100, 255),
    });
  }

  // Configurar la cámara
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();

  textFont("Press Start 2P"); // Fuente estilo retro
}

function draw() {
  // Dibujar fondo de estrellas
  background(20, 30, 60);
  drawStars();

  // Dibujar título
  textAlign(CENTER);
  fill(0, 255, 136);
  textSize(32);
  text("✨ Espejo Indie con Filtros Divertidos ✨", width / 2, 80);

  // Dibujar el recuadro de la cámara
  drawNeonBox(width / 2 - 330, height / 2 - 250, 660, 500, color(0, 255, 136));
  image(capture, width / 2 - 320, height / 2 - 240, 640, 480);

  // Dibujar el cuadro de información
  drawInfoBox();
}

// Función para dibujar estrellas
function drawStars() {
  for (let star of stars) {
    noStroke();
    fill(star.brightness, star.brightness, star.brightness, 200);
    ellipse(star.x, star.y, star.size);

    // Actualizar brillo para el efecto de parpadeo
    star.brightness += star.speed;
    if (star.brightness > 255 || star.brightness < 100) {
      star.speed *= -1;
    }
  }
}

// Función para dibujar un recuadro estilo neón
function drawNeonBox(x, y, w, h, neonColor) {
  stroke(neonColor);
  strokeWeight(6);
  noFill();
  rect(x, y, w, h);
  noStroke();
  fill(neonColor);
  ellipse(x, y, 10, 10);
  ellipse(x + w, y, 10, 10);
  ellipse(x, y + h, 10, 10);
  ellipse(x + w, y + h, 10, 10);
}

// Función para el cuadro de información
function drawInfoBox() {
  let boxX = width / 2 - 320;
  let boxY = height / 2 + 270;
  let boxW = 640;
  let boxH = 150;

  fill(40, 40, 60, 200);
  noStroke();
  rect(boxX, boxY, boxW, boxH, 10);

  fill(255);
  textAlign(LEFT);
  textSize(14);
  text(
    "Descripción: Una experiencia interactiva donde puedes aplicar filtros divertidos\n" +
      "como ojos gigantes, orejas de gato, y más.\n" +
      "Interacción: Cambia los filtros con botones o gestos en tiempo real.",
    boxX + 20,
    boxY + 30
  );
}
