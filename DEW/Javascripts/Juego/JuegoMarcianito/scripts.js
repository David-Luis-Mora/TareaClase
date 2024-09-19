/* 1.- Creamos la función initCanvas para iniciar el juego.
 *  El juego se cargará cuando se cargue la ventana: windows
 *  Vaya al punto 2.
 */

function initCanvas() {
  // Tomamos el lienzo html canvas
  var ctx = document.getElementById("my_canvas").getContext("2d");

  // 3.- Creamos variables
  var backgroundImage = new Image();
  var naveImage = new Image(); // Nave
  var enemiespic1 = new Image(); // enemigo 1
  var enemiespic2 = new Image(); // enemigo 2

  // 4.- Asignamos valores a variables
  backgroundImage.src = "imagenes/background-pic.jpg"; // Fondo del canvas
  naveImage.src = "imagenes/spaceship-pic.png"; // Nave aliada
  enemiespic1.src = "imagenes/enemigo1.png"; // Nave enemiga 1
  enemiespic2.src = "imagenes/enemigo2.png"; // Nave enemiga 2

  // 5.- Guardamos el ancho y alto del canvas que vienen del HTML
  var cW = ctx.canvas.width; // 700px
  var cH = ctx.canvas.height; // 600px

  // 6.- Creamos un Template para definir las naves enemigas
  var enemyTemplate = function (options) {
    return {
      id: options.id || "",
      x: options.x || "",
      y: options.y || "",
      w: options.w || "",
      h: options.h || "",
      image: options.image || enemiespic1,
    };
  };

  // 7.- Creamos las naves enemigas usando el Template
  var enemies = [
    // Primer grupo naves enemigas
    new enemyTemplate({ id: "1", x: 100, y: -20, w: 50, h: 30 }),
    new enemyTemplate({ id: "2", x: 225, y: -20, w: 50, h: 30 }),
    new enemyTemplate({ id: "3", x: 350, y: -20, w: 80, h: 30 }),
    new enemyTemplate({ id: "4", x: 100, y: -70, w: 80, h: 30 }),
    new enemyTemplate({ id: "5", x: 225, y: -70, w: 50, h: 30 }),
    new enemyTemplate({ id: "6", x: 350, y: -70, w: 50, h: 30 }),
    new enemyTemplate({ id: "7", x: 475, y: -70, w: 50, h: 30 }),
    new enemyTemplate({ id: "8", x: 600, y: -70, w: 80, h: 30 }),
    new enemyTemplate({ id: "9", x: 475, y: -20, w: 50, h: 30 }),
    new enemyTemplate({ id: "10", x: 600, y: -20, w: 50, h: 30 }),

    // Segundo grupo naves enemigas
    new enemyTemplate({
      id: "11",
      x: 100,
      y: -220,
      w: 50,
      h: 30,
      image: enemiespic2,
    }),
    new enemyTemplate({
      id: "12",
      x: 225,
      y: -220,
      w: 50,
      h: 30,
      image: enemiespic2,
    }),
    new enemyTemplate({
      id: "13",
      x: 350,
      y: -220,
      w: 80,
      h: 30,
      image: enemiespic2,
    }),
    new enemyTemplate({
      id: "14",
      x: 100,
      y: -270,
      w: 80,
      h: 30,
      image: enemiespic2,
    }),
    new enemyTemplate({
      id: "15",
      x: 225,
      y: -270,
      w: 50,
      h: 30,
      image: enemiespic2,
    }),
    new enemyTemplate({
      id: "16",
      x: 350,
      y: -270,
      w: 50,
      h: 30,
      image: enemiespic2,
    }),
    new enemyTemplate({
      id: "17",
      x: 475,
      y: -270,
      w: 50,
      h: 30,
      image: enemiespic2,
    }),
    new enemyTemplate({
      id: "18",
      x: 600,
      y: -270,
      w: 80,
      h: 30,
      image: enemiespic2,
    }),
    new enemyTemplate({
      id: "19",
      x: 475,
      y: -200,
      w: 50,
      h: 30,
      image: enemiespic2,
    }),
    new enemyTemplate({
      id: "20",
      x: 600,
      y: -200,
      w: 50,
      h: 30,
      image: enemiespic2,
    }),
  ];

  /*
   *  11.- Función para dibujar las naves enemigas
   */
  var renderEnemies = function (enemyList) {
    for (var i = 0; i < enemyList.length; i++) {
      console.log(enemyList[i]);
      ctx.drawImage(
        enemyList[i].image,
        enemyList[i].x,
        (enemyList[i].y += 0.5),
        enemyList[i].w,
        enemyList[i].h
      );
      // 23.- Detecta colision de naves enemigas con nave aliada
      launcher.hitDetectLowerLevel(enemyList[i]);
    }
  };

  /*
   * 12.- Creamos la función Launcher() para gestionar las colisiones
   */
  function Launcher() {
    // Ubicación de misiles
    (this.y = 500),
      (this.x = cW * 0.5 - 25),
      (this.w = 100),
      (this.h = 100),
      this.direccion,
      (this.bg = "white"), // Color del misil
      (this.misiles = []);

    /*
     *   13.- Definimos un objeto para controlar el estado del juego
     *   el campo over será falso para que el juego siga, true dentendrá el juego
     */
    this.gameStatus = {
      over: false,
      message: "",
      fillStyle: "white",
      font: "italic bold 36px Arial, sans-serif",
    };

    /*
     *  14.- Definimos la función que nos permite mover la nave aliada
     */
    this.render = function () {
      if (this.direccion === "left") {
        this.x -= 5;
      } else if (this.direccion === "right") {
        this.x += 5;
      } else if (this.direccion === "downArrow") {
        this.y += 5;
      } else if (this.direccion === "upArrow") {
        this.y -= 5;
      }

      // Llegamos hasta aqui, 16/09/2024

      ctx.fillStyle = this.bg; // Misil
      ctx.drawImage(backgroundImage, 0, 0); // Fondo del canvas
      ctx.drawImage(naveImage, this.x, this.y, 100, 90); // Nave aliada

      /*
       * 17.- Ciclo para disparar varios misiles en cada disparo
       */
      for (var i = 0; i < this.misiles.length; i++) {
        var m = this.misiles[i];
        ctx.fillRect(m.x, (m.y -= 5), m.w, m.h); // Dirección del misil
        this.hitDetect(this.misiles[i], i);
        // Controlamos cuando el misil llega al borde superior del canvas
        if (m.y <= 0) {
          this.misiles.splice(i, 1); // La función splice elimina el objeto del canvas
        }
      }

      /*
       * 18.- Condición de termino de juego por matar todas las naves enemigas
       */
      if (enemies.length === 0) {
        clearInterval(animateInterval); // Terminar juego
        ctx.font = this.gameStatus.font;
        ctx.fillText("¡Tú ganas!", cW * 0.5 - 80, 50); // Mostramos el mensaje
      }
    };

    /*
     * 19.- Función que detecta impacto de misil con nave enemiga
     */
    this.hitDetect = function (m, mi) {
      for (var i = 0; i < enemies.length; i++) {
        var e = enemies[i];
        // Condiciones de colisiones
        if (
          m.x + m.w >= e.x &&
          m.x <= e.x + e.w &&
          m.y >= e.y &&
          m.y <= e.y + e.h
        ) {
          this.misiles.splice(this.misiles[mi], 1); // Eliminar misil
          enemies.splice(i, 1); // Eliminar nave enemiga que colisiona con el misil
          document.querySelector(".barra").innerHTML =
            "Enemigos destruidos " + e.id + " "; // Muestra id de naves destruidas
        }
      }
    };

    /*
     * 20.- Función que detecta que los enemigos estan a nuestro lado.
     *       Esta condición terminará el juego.
     */
    this.hitDetectLowerLevel = function (enemy) {
      if (enemy.y > 550) {
        this.gameStatus.over = true;
        this.gameStatus.message = "¡Los enemigos han pasado!";
      }

      // 21.- Condición que detecta si mi nave colisiona con otra nave.
      // Esto hará que termine el juego
      if (
        enemy.y < this.y + 25 &&
        enemy.y > this.y - 25 &&
        enemy.x < this.x + 45 &&
        enemy.x > this.x - 45
      ) {
        this.gameStatus.over = true;
        this.gameStatus.message = "¡Moriste!";
      }

      /*
       * 22.- Función que detecta que el juego ha terminado.
       */
      if (this.gameStatus.over === true) {
        clearInterval(animateInterval); // Se termina el juego
        ctx.fillStyle = this.gameStatus.fillStyle;
        ctx.font = this.gameStatus.font;
        // Mostrar mensaje al usuario
        ctx.fillText(this.gameStatus.message, cW * 0.5 - 140, 50); // Texto x, y
      }
    };
  }

  /* 10.- Creamos el objeto launcher que servirá para detectar las
   *   colisiones con las naves enemigas
   */
  var launcher = new Launcher();

  /*
   *  9.- Definimos la función que es llamada desde setInterval()
   * Esta se encarga de dibujar
   */
  function animate() {
    ctx.clearRect(0, 0, cW, cH);
    launcher.render();
    renderEnemies(enemies);
  }

  /*
   *  8.- Definimos los intervalos refresco de pantalla con la función setInterval()
   *  le pasamos la animación "animate" y el tiempo de refresco, 6 milésimas de segundo
   */
  var animateInterval = setInterval(animate, 6);

  /*
   *  15.- Declaramos las variables para asignarles los botones de movimiento
   */
  var left_btn = document.getElementById("left_btn");
  var right_btn = document.getElementById("right_btn");
  var fire_btn = document.getElementById("fire_btn");
  var reset_btn = document.getElementById("reset_btn");

  /*
   *  26.- Listener para detectar las teclas del teclado
   */
  // Control de la tecla izquierda. Mueve nave aliada a la izquierda
  document.addEventListener("keydown", function (event) {
    if (event.keyCode == 37) {
      // Tecla posición izquierda
      launcher.direccion = "left";
      // Condición para que desaparezca por la izquierda
      if (launcher.x < cW * 0.2 - 130) {
        launcher.x += 0;
        launcher.direccion = "";
      }
    }
  });

  // Evento para evitar que la nave se pierda a la izquierda
  document.addEventListener("keyup", function (event) {
    if (event.keyCode == 37) {
      launcher.x += 0;
      launcher.direccion = "";
    }
  });

  // Control de la tecla derecha. Mueve nave aliada a la derecha
  document.addEventListener("keydown", function (event) {
    if (event.keyCode == 39) {
      // Tecla posición derecha
      launcher.direccion = "right";
      // Condición para que desaparezca por la derecha
      if (launcher.x > cW - 110) {
        launcher.x -= 0;
        launcher.direccion = "";
      }
    }
  });

  // Evento para evitar que la nave aliada se pierda a la derecha
  document.addEventListener("keyup", function (event) {
    if (event.keyCode == 39) {
      launcher.x -= 0;
      launcher.direccion = "";
    }
  });

  // Control de la tecla arriba. Mueve nave aliada hacia arriba
  document.addEventListener("keydown", function (event) {
    if (event.keyCode == 38) {
      // Tecla posición arriba
      launcher.direccion = "upArrow";
      if (launcher.y < cH * 0.2 - 80) {
        launcher.y += 0;
        launcher.direccion = "";
      }
    }
  });

  // Evento para evitar que la nave aliada se pierda arriba
  document.addEventListener("keyup", function (event) {
    if (event.keyCode == 38) {
      launcher.y += 0;
      launcher.direccion = "";
    }
  });

  // Control de la tecla abajo. Mueve nave aliada hacia abajo
  document.addEventListener("keydown", function (event) {
    if (event.keyCode == 40) {
      // Tecla posición abajo
      launcher.direccion = "downArrow";
      if (launcher.y > cH - 110) {
        launcher.y -= 0;
        launcher.direccion = "";
      }
    }
  });

  // Evento para evitar que la nave aliada se pierda abajo
  document.addEventListener("keyup", function (event) {
    if (event.keyCode == 40) {
      launcher.y -= 0;
      launcher.direccion = "";
    }
  });

  // Control de a la techa espacio. Dispaa misiles
  document.addEventListener("keydown", function (event) {
    if (event.keyCode == 32) {
      launcher.misiles.push({
        x: launcher.x + launcher.w * 0.5,
        y: launcher.y,
        w: 3,
        h: 10,
      });
    }
  });

  /*
   *  24.- Listeners para Controles utilizando botones
   */
  // Con esto movemos la nave aliada a la izquierda
  left_btn.addEventListener("mousedown", function (event) {
    launcher.direccion = "left";
  });

  // Con esto conseguimos la nave aliada no desaparezca por la izquierda
  left_btn.addEventListener("mouseup", function (event) {
    launcher.direccion = "";
  });

  // Con esto movemos la nave aliada a la derecha
  right_btn.addEventListener("mousedown", function (event) {
    launcher.direccion = "right";
  });

  // Con esto conseguimos que la nave aliada no desaparezca por la derecha
  right_btn.addEventListener("mouseup", function (event) {
    launcher.direccion = "";
  });

  /*
   *  16.- Lister para controlar botón html de disparo
   */
  fire_btn.addEventListener("mousedown", function (event) {
    launcher.misiles.push({
      x: launcher.x + launcher.w * 0.5,
      y: launcher.y,
      w: 3,
      h: 10,
    });
  });

  /*
   *  25.- Listener para reiniciar la pantalla de juego
   */
  reset_btn.addEventListener("mousedown", function (event) {
    location.reload();
  });
}

// 2.- Escuchamos el load de windows para iniciar el juego: initCanvas();
window.addEventListener("load", function (event) {
  initCanvas();
});
