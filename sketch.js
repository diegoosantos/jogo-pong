//variáveis da bola
let xBola = 300;
let yBola = 200;
let diametro = 25;
let raio = diametro / 2;

//velocidade da bola
let velocidadeXBola = 6;
let velocidadeYBola = 6;

//variáveis da minha raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 8;
let alturaRaquete = 80;

//variáveis da raquete do oponente
let xRaqueteOponente = 587;
let yRaqueteOponente = 150;

//placar
let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("Sons/trilha.mp3");
  ponto = loadSound("Sons/ponto.mp3");
  raquetada = loadSound("Sons/raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop(0.1, 1, 0.3);
}

function draw() {
  background(0);
  mostraBola();
  movimentaBola();
  colisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  colisaoRaquete();
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  colisaoRaqueteOponente();
  mostraPlacar();
  marcaPonto();
}

function mostraBola() {
  circle (xBola, yBola, diametro);
}

function movimentaBola() {
  xBola += velocidadeXBola
  yBola += velocidadeYBola
}

function colisaoBorda () {
  if (xBola + raio > width || 
    xBola - raio < 0) {
    velocidadeXBola *= -1;
  }

  if (yBola + raio > height || 
    yBola - raio < 0) {
  velocidadeYBola *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, comprimentoRaquete, alturaRaquete);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(87)) {
    yRaquete -= 7;
  }
  if (keyIsDown(83)) {
    yRaquete += 7;    
  }
}

function colisaoRaquete() {
  if (xBola - raio < xRaquete + comprimentoRaquete 
    && yBola - raio < yRaquete + alturaRaquete 
    && yBola + raio > yRaquete) {
    velocidadeXBola *= -1;
    raquetada.play();
  }
}

function colisaoRaqueteOponente() {
  if (xBola + raio > xRaqueteOponente
    && yBola - raio < yRaqueteOponente + alturaRaquete
    && yBola + raio > yRaqueteOponente) {
    velocidadeXBola *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente() {
  if (keyIsDown(UP_ARROW)) {
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaqueteOponente += 10;
  }  
}

function mostraPlacar() {
  stroke(255)
  textAlign(CENTER);
  textSize(14);
  fill (color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill (225)
  text(meusPontos, 170, 26)
  fill (color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill (225)
  text(pontosOponente, 470, 26)
}

function marcaPonto() {
  if (xBola > 585) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBola < 15) {
    pontosOponente += 1;
    ponto.play();  
  }
}
