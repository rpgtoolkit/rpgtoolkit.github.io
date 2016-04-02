var dt; // Craftyjs time step since last frame;

var screen;
var canvas = document.getElementById("canvas");

var currentBoard;
var currentPlayer;

/**
 * Setups up the games initial state based on the configuration found in the main file.
 * 
 * @param {type} filename
 * @returns {undefined}
 */
function setup(filename) {
  Crafty.init(640, 480);
  Crafty.canvasLayer.init();
  Crafty.viewport.init(640, 480);
  
  // Setup the drawing canvas (game screen).
  screen = new screenRenderer();
  
  currentBoard = new board(PATH_BOARD + "Room0.brd.json");
  loadBoard(currentBoard);

  // Setup the Player.
  var tkPlayer = new player(PATH_CHARACTER + "Hero.tem.json");
  tkPlayer.x = currentBoard.startingPositionX;
  tkPlayer.y = currentBoard.startingPositionY;
  loadPlayer(tkPlayer);
  Crafty.viewport.follow(currentPlayer, 0, 0);

  // Setup the drawing canvas (game screen).
  screen = new screenRenderer(currentBoard);

  // Run the startup program before the game logic loop.
//  runProgram("../game/TheWizardsTower-JS/Prg/INTRO.js");
}

function loadBoard(board) {
  /*
   * Setup vectors.
   */
  board.vectors.forEach(function (vector) {
    var points = vector.points;
    var len = points.length;
    for (var i = 0; i < len - 1; i++) {
      createVector(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y, vector.layer);
    }

    if (vector.isClosed) {
      createVector(points[0].x, points[0].y, points[len - 1].x, points[len - 1].y, vector.layer);
    }
  }, this);

  /*
   * Setup programs.
   */

  /*
   * Setup player.
   */
  // Set the player starting layer and position etc.

  /*
   * Play background music.
   */
  if (board.backgroundMusic) {
    var assets = {
      "audio": {
        "backgroundMusic": [PATH_MEDIA + board.backgroundMusic]
      }
    };
    Crafty.load(assets, function () {
      playSound("backgroundMusic", -1);
    });
  }

  var width = currentBoard.width * 32;
  var height = currentBoard.height * 32;

  Crafty.c("Board", {
    ready: true,
    width: width,
    height: height,
    init: function () {
      this.addComponent("2D, Canvas");
      this.attr({x: 0, y: 0, w: width, h: height});
      this.bind("Draw", function (e) {
        screen.render(e.ctx);
      });
    }
  });

  Crafty.e("Board");
}

function loadPlayer(tkPlayer) {
  currentPlayer = Crafty.e("DOM, Fourway, Collision")
          .attr({
            x: tkPlayer.x,
            y: tkPlayer.y,
            player: tkPlayer})
          .fourway(50)
          .collision(
                  new Crafty.polygon([-20, 10, 20, 10, 20, 25, -20, 25])
                  )
          .bind("Moved", function (from) {
            this.player.animate(dt);
            this.player.checkCollisions(this, from);
          })
          .bind("NewDirection", function (direction) {
            if (direction.x === 0 && direction.y === -1) {
              this.player.changeGraphics(this.player.DirectionEnum.NORTH);
            } else if (direction.x === 0 && direction.y === 1) {
              this.player.changeGraphics(this.player.DirectionEnum.SOUTH);
            } else if (direction.x === -1 && direction.y === 0) {
              this.player.changeGraphics(this.player.DirectionEnum.WEST);
            } else if (direction.x === 1 && direction.y === 0) {
              this.player.changeGraphics(this.player.DirectionEnum.EAST);
            }
          })
          .bind("EnterFrame", function (event) {
            dt = event.dt / 1000;
          });
}

function runProgram(filename) {
  var fileref = document.createElement("script");
  fileref.setAttribute("type", "text/javascript");
  fileref.setAttribute("src", filename);

  if (typeof fileref !== "undefined") {
    document.getElementsByTagName("head")[0].appendChild(fileref);
  }
}

function createVector(x1, y1, x2, y2, layer) {
  var xDiff = x2 - x1;
  var yDiff = y2 - y1;

  var distance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));

  var width;
  var height;

  if (x1 !== x2) {
    width = distance;
    height = 2;

    if (xDiff < 0) {
      x1 = x2;
    }
  } else {
    width = 2;
    height = distance;

    if (yDiff < 0) {
      y1 = y2;
    }
  }

  Crafty.e("solid-" + layer + ", Collision")
          .attr({x: x1, y: y1, w: width, h: height});
}

function playSound(sound, loop) {
  Crafty.audio.play(sound, loop);
}

/**
 * Utility function for getting accurate timestamps across browsers.
 * 
 * @returns {Number}
 */
function timestamp() {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}
