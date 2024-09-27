let imagenFondo
let imagenInicio
let personaje
let obstaculo
let estado = 0  // 0: menú 1: jugando 2: gameOver
let nube
let x = 0
let y = 0
let posY = 200
let dY = 3
let wallX = []
let wallY = []
let puntaje = 0
let puntajeMax = 0
let recordAnterior = 0
let publicoAplausos
let musicaJuego
let musicaLobby
let risaArdilla
let customFontAngryBirds
let customFontZelda
let recordSoundPlayed = false;
let recordSoundPlayed2 = false;
let valorTamañoTexto = 90
let aumentoTamaño = 0.4
let mano
let zeldaNRecord
let zeldanorecord
let imagenzeldaderrota = -120
let imagenzeldavictoria = -120
let comenzoJuego = false
let victoriaSound
let velocidad = 3
let trollface
let zzz
let ajuñiga
let unavez = false
let unavez1 = false
let marcador50 = false
let marcador75 = false
let marcador100 = false
let go321
function preload() {
  imagenFondo = loadImage('./images/fondoangry.webp');
  personaje = loadImage('./images/red.webp');
  nube = loadImage('./images/nube.png');
  imagenInicio = loadImage('./images/angryportada.png');
  obstaculo = loadImage('./images/pilar3.png');
  trollface = loadImage('./images/trollface.webp')
  zzz = loadImage('./images/zzz.gif')
  publicoAplausos = loadSound('./sounds/aplauso.m4a')
  musicaJuego = loadSound('./sounds/musicafondo.mp3')
  musicaLobby = loadSound('./sounds/musicaLobby.mp3')
  risaArdilla = loadSound('./sounds/risaArdilla.m4a')
  victoriaSound = loadSound('./sounds/victoriaSound.m4a')
  ajuñiga = loadSound('./sounds/ajuñiga.m4a')
  go321 = loadSound('./sounds/321.m4a')
  zeldaNRecord = loadImage('./images/nuevorecord.gif')
  customFontZelda = loadFont('./fonts/Zelda_demo.ttf')
  zeldanorecord = loadImage('./images/norecord.gif')
  customFontAngryBirds = loadFont('./fonts/AngryBirdsPixela.ttf')
  mano = loadImage('./images/mano.png');
}

function setup() {
  createCanvas(1200, 600)
  textSize(55)


}

function draw() {
  // put drawing code here
  if (estado === 1) {  // Jugando
    //reproducimos la musica
    if (musicaLobby.isPlaying()) {
      musicaLobby.stop();
    }
    if (!musicaJuego.isPlaying()) {
      musicaJuego.loop();
    }
    //fondo del juego en movimiento
    imageMode(CORNER)
    background(255, 255, 255)
    image(imagenFondo, x, 0)
    image(imagenFondo, imagenFondo.width + x, 0)
    x = x - 5
    dY = dY + 1
    posY = posY + dY
    if (x < -imagenFondo.width) {
      x = 0
    }

    //Obstaculos
    for (let i = 0; i < wallX.length; i++) {
      push()
      imageMode(CENTER)
      image(obstaculo, wallX[i], wallY[i] - 350)
      image(obstaculo, wallX[i], wallY[i] + 250)
      pop()
      if (wallX[i] < 0) {
        wallX[i] = width
        wallY[i] = random(200, 400)
      }
      //Revisando si el personaje pasa por el obstaculo
      if (wallX[i] + (5 + velocidad) > 105 && wallX[i] <= 105) {
        puntaje = puntaje + 1;
        puntajeMax = max(puntaje, puntajeMax);
      }
//reproduccion de sonidos en juego
      if(puntaje===18){
        if (!go321.isPlaying()&& !unavez1==true) {
          go321.play();
          unavez1 = true
        }
      }
      if(puntaje===24){
        if (!ajuñiga.isPlaying()&& !unavez==true) {
          ajuñiga.play();
          unavez = true
        }
        
      }
      //aumento de velocidad
      velocidad = 1 + puntaje/10
      
      if(puntaje>21){
        velocidad = 5
      }
      if(puntaje>50){
        velocidad = 7
        if (!ajuñiga.isPlaying()&& !marcador50==true) {
          ajuñiga.play();
          marcador50 = true
        }
      }
      if(puntaje>75){
        velocidad = 9
        if (!ajuñiga.isPlaying()&& !marcador75==true) {
          ajuñiga.play();
          marcador75 = true
        }
      }
      if(puntaje>100){
        velocidad = 11
        if (!ajuñiga.isPlaying()&& !marcador100==true) {
          ajuñiga.play();
          marcador100 = true
        }
      }
      if(puntaje>115){
        velocidad = 10
        
      }
      if(puntaje>125){
        velocidad = 9
      }
      if(puntaje>150){
        velocidad = 8
      }


      wallX[i] = wallX[i] - (5 + velocidad);

      
      
      //Revisando si el personaje se sale de la pantalla
      if (posY > height + 60 || posY < -60 ||
        (abs(wallX[i] - 100) < 60 && (posY < wallY[i] - 200 || posY > wallY[i] + 35))) {
        musicaJuego.stop()
        if (!risaArdilla.isPlaying()) {
          risaArdilla.play();
        }
        estado = 0
      }
    }

    //Personaje
    image(personaje, 100, posY, 60, 60)
    textFont(customFontAngryBirds)
    text("SCORE: " + puntaje, width / 2 - 60, 30)

  } else {
    unavez = false
    unavez1 = false
    //reproducimos la musica del lobby
    if (musicaJuego.isPlaying()) {
      musicaJuego.stop();
    }
    if (!musicaLobby.isPlaying()) {
      musicaLobby.loop();
    }

    background(0)
    //image(imagenInicio, 200, 0, 800, 700)
    //metodo para movimiento de fondo lobby
    //imagen 1
    image(imagenInicio, 200, x, 800, 900)
    image(imagenInicio, x, 0 + 700)
    x = x - 0.7

    //imagen 2
    image(imagenInicio, 200, x + 900, 800, 900)

    if (x < -900) {
      x = 0
    }
    //texto de inicio
    textAlign(CENTER, CENTER)
    textFont(customFontAngryBirds)
    fill(0, 0, 0, 255)
    rect(485, 30, 234, 100)
    rect(375, 180, 450, 50)
    noStroke()
    fill(255)
    text("THE GAME", 600, 60)
    text("HIGHSCORE: " + puntajeMax, 600, 200)
    push();
    textSize(16)
    text("Made by: ", 1100, 548)
    text("MarVin717p ", 1100, 568)
    text("creator's record:169 ", 80, 572) 
    pop();
    fill(0)
    rect(200, 80, 900, 100)
    rect(430,525, 340,50)
    fill(255)
    text("CLICK TO PLAY", 600, 550)
    push();
    fill(255)
    textSize(valorTamañoTexto)
    text("FLANGRY BIRDS", 600, 130)
    //aumento de tamaño de texto
    valorTamañoTexto += aumentoTamaño;

    if (valorTamañoTexto > 100 || valorTamañoTexto < 80) {
      aumentoTamaño *= -1;
    }
    pop();
    

    //gif de link sin nada(derrota)
    if (comenzoJuego === true) {
      if (puntaje < puntajeMax) {
     
        image(trollface, 520, 320, 150, 150);
      } 
    
      push();
      //imagen de zelda derrota
      if (imagenzeldaderrota < height) { // Si la posición aún está dentro de la pantalla
        imagenzeldaderrota += 1.5; // Incrementa la posición en 2 cada cuadro

        

        image(zeldanorecord, 17, imagenzeldaderrota, 200, 120);
        fill(255, 255, 255, 240);
        rect(32, imagenzeldaderrota + 90, 170, 20);
        textFont(customFontZelda);
        fill(0);
        textSize(11);
        text("Nothing is there unu", 85, imagenzeldaderrota + 99);

        pop();
      }
      //imagen central trollface
      if (puntaje < puntajeMax) {
        image(trollface, 520, 320, 150, 150);
      }
    }



    //sonido de aplausos o nuevo record
    if (puntajeMax > recordAnterior && !recordSoundPlayed) {
      //añadiendole un delay para que suene despues de la caja de link
      setTimeout(function () {
        if (!publicoAplausos.isPlaying()) {
          publicoAplausos.play();
          recordSoundPlayed = true;
        }
      }, 1000)
      risaArdilla.stop();
    

  }
  //zelda nuevo record gif con victoria
  if (puntajeMax > recordAnterior) {
    //image(zeldaNRecord, 17, 200, 200, 120)
    fill(0);
    //tapamos el link de la derecha
    rect(0, 0, 230, 1000);
    push();
    //imagen de zelda victoria
    if (imagenzeldavictoria < height) { // Si la posición aún está dentro de la pantalla
      imagenzeldavictoria += 1.5; // Incrementa la posición en 2 cada cuadro
      //sonido de victoria de cofre de link
      if (!victoriaSound.isPlaying() && !recordSoundPlayed2) {
        victoriaSound.play();
        recordSoundPlayed2 = true;
      }

      image(zeldaNRecord, 980, imagenzeldavictoria, 200, 120)
      fill(255, 255, 255, 245)
      rect(995, imagenzeldavictoria + 90, 170, 30);
      //textFont(customFontZelda);
      //texto de victoria en el gif
      fill(0);
      textSize(11);
      textFont()
      text("You got a", 1025, imagenzeldavictoria + 92)
      fill(255, 0, 0)
      text("NEW RECORD!", 1095, imagenzeldavictoria + 92)
      fill(0);
      text("LESGOOOO OMG " + puntajeMax + " REALLY??? o.0", 1080, imagenzeldavictoria + 105);
      pop();
    }

  }

//quitamos el cursor y añadimos la manita
  noCursor()
  image(mano, mouseX - 70 / 2, mouseY - 70 / 2, 60, 60)
}
}

function mousePressed() {
  comenzoJuego = true
  victoriaSound.stop()
  publicoAplausos.stop()
  if (estado === 0) {
    estado = 1
    x = 0
    posY = 200
    dY = -15
    wallX = [400, 800, 1100]
    wallY[0] = random(300, 460)
    wallY[1] = random(300, 460)
    wallY[2] = random(300, 460)
    puntaje = 0
    recordAnterior = puntajeMax
    recordSoundPlayed = false
    recordSoundPlayed2 = false
    noCursor()
    if (musicaRecord.isPlaying()) {
      musicaRecord.stop()
    }
    musicaJuego.loop()
  }
  dY = -15
  imagenzeldaderrota = -120
  imagenzeldavictoria = -120
  

}