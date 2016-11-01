/* global PATH_BITMAP, PATH_MEDIA, PATH_PROGRAM, PATH_BOARD, PATH_CHARACTER, PATH_ITEM, jailed, rpgcode */

var rpgtoolkit = new RPGToolkit();

function RPGToolkit() {
  this.dt = 0; // Craftyjs time step since last frame;
  this.screen = {};
  this.craftyBoard = {};
  this.craftyPlayer = {};
  this.tilesets = {};
  this.keyboardHandler = {};
  this.tileSize = 32;

  // Program cache, stores programs as Function objects.
  this.programCache = {};

  // Used to store state when runProgram is called.
  this.endProgramCallback = null;
  this.keyDownHandlers = null;
  this.keyUpHandlers = null;
}

/**
 * Setups up the games initial state based on the configuration found in the main file.
 * 
 * @param {type} filename
 * @returns {undefined}
 */
RPGToolkit.prototype.setup = function (filename) {
  var configuration = new project(filename);

  Crafty.init(configuration.resolutionWidth, configuration.resolutionHeight);
  Crafty.canvasLayer.init();
  Crafty.viewport.init(configuration.resolutionWidth, configuration.resolutionHeight);
  Crafty.paths({audio: PATH_MEDIA, images: PATH_BITMAP});

  // Setup run time keys.
  this.keyboardHandler = new keyboard();
  this.keyboardHandler.downHandlers[configuration.menuKey] = function () {
    rpgtoolkit.runProgram(PATH_PROGRAM + configuration.menuPlugin, {});
  };

  // Setup the drawing canvas (game screen).
  this.screen = new screenRenderer();

  // Setup the RPGcode rutime.
  rpgcode = new RPGcode();

  // Create the initial board.
  this.createCraftyBoard(new board(PATH_BOARD + configuration.initBoard));

  // Setup the Player.
  var tkPlayer = new Player(PATH_CHARACTER + configuration.initChar);
  tkPlayer.x = this.craftyBoard.board.startingPositionX;
  tkPlayer.y = this.craftyBoard.board.startingPositionY;
  this.loadPlayer(tkPlayer);
  Crafty.viewport.follow(this.craftyPlayer, 0, 0);

  // Run the startup program before the game logic loop.
  if (!configuration.startupPrg) {
    this.runProgram(PATH_PROGRAM + configuration.startupPrg, {}, function () {
      rpgtoolkit.loadBoard();
    });
  } else {
    rpgtoolkit.loadBoard();
  }
};

RPGToolkit.prototype.createCraftyBoard = function (board) {
  var width = board.width * this.tileSize;
  var height = board.height * this.tileSize;

  Crafty.c("Board", {
    ready: true,
    width: width,
    height: height,
    init: function () {
      this.addComponent("2D, Canvas");
      this.attr({x: 0, y: 0, w: width, h: height, board: board, show: false});
      this.bind("Draw", function (e) {
        rpgtoolkit.screen.render(e.ctx);
      });
    }
  });

  this.craftyBoard = Crafty.e("Board");
};

RPGToolkit.prototype.loadBoard = function () {
  var board = this.craftyBoard.board;
  /*
   * Setup vectors.
   */
  board.vectors.forEach(function (vector) {
    var points = vector.points;
    var len = points.length;
    for (var i = 0; i < len - 1; i++) {
      this.createSolidVector(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y, vector.layer);
    }

    if (vector.isClosed) {
      this.createSolidVector(points[0].x, points[0].y, points[len - 1].x, points[len - 1].y, vector.layer);
    }
  }, this);

  /*
   * Setup programs.
   */
  board.programs.forEach(function (program) {
    var points = program.points;
    var len = points.length;
    for (var i = 0; i < len - 1; i++) {
      this.createProgramVector(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y,
              program.layer, PATH_PROGRAM.concat(program.fileName));
    }

    if (program.isClosed) {
      this.createProgramVector(points[0].x, points[0].y, points[len - 1].x, points[len - 1].y,
              program.layer, PATH_PROGRAM.concat(program.fileName));
    }
  }, this);

  /*
   * Setup board sprites.
   */
  var len = board.sprites.length;
  for (var i = 0; i < len; i++) {
    var sprite = board.sprites[i];
    sprite.item = new Item(PATH_ITEM + sprite.fileName);
    var boardSprite = this.loadSprite(sprite);
    boardSprite.sprite.item.load();
    board.sprites[i] = boardSprite;
  }

  /*
   * Play background music.
   */
  var backgroundMusic = board.backgroundMusic;
  if (backgroundMusic) {
    if (Crafty.asset(backgroundMusic)) {
      Crafty.audio.play(backgroundMusic);
    } else {
      var assets = {"audio": {}};
      assets.audio[board.backgroundMusic] = board.backgroundMusic;
      Crafty.load(assets, function () {
        rpgtoolkit.playSound(backgroundMusic, -1);
      });
    }
  }

  this.craftyBoard.show = true;
};

RPGToolkit.prototype.switchBoard = function (boardName, tileX, tileY) {
  this.craftyPlayer.disableControl();

  Crafty("Solid").destroy();
  Crafty("Board").destroy();
  Crafty.audio.stop();

  this.craftyPlayer.x = tileX * this.tileSize;
  this.craftyPlayer.y = tileY * this.tileSize;

  this.createCraftyBoard(new board(PATH_BOARD + boardName));
  this.loadBoard();

  this.craftyPlayer.enableControl();
};

RPGToolkit.prototype.loadPlayer = function (tkPlayer) {
  this.craftyPlayer = Crafty.e("DOM, Fourway, Collision")
          .attr({
            x: tkPlayer.x,
            y: tkPlayer.y,
            player: tkPlayer})
          .fourway(50)
          .collision(new Crafty.polygon([-15, -10, 15, -10, -15, 0, 15, 0]))
          .checkHits("Solid")
          .bind("HitOn", function (hitData) {
            this.player.checkCollisions(hitData[0], this);
          })
          .bind("HitOff", function (comp) {
            Crafty.log(comp);
            Crafty.log("Collision with Solid entity ended.");
          })
          .bind("Moved", function (from) {
            this.player.animate(this.dt);
          })
          .bind("NewDirection", function (direction) {
            if (direction.x === 0 && direction.y === -1) {
              this.player.direction = this.player.DirectionEnum.NORTH;
              this.player.changeGraphics(this.player.direction);
            } else if (direction.x === 0 && direction.y === 1) {
              this.player.direction = this.player.DirectionEnum.SOUTH;
              this.player.changeGraphics(this.player.DirectionEnum.SOUTH);
            } else if (direction.x === -1 && direction.y === 0) {
              this.player.direction = this.player.DirectionEnum.WEST;
              this.player.changeGraphics(this.player.DirectionEnum.WEST);
            } else if (direction.x === 1 && direction.y === 0) {
              this.player.direction = this.player.DirectionEnum.EAST;
              this.player.changeGraphics(this.player.DirectionEnum.EAST);
            }
          })
          .bind("EnterFrame", function (event) {
            this.dt = event.dt / 1000;
          });
  this.craftyPlayer.visible = false;
  this.craftyPlayer.player.load();
};

RPGToolkit.prototype.loadSprite = function (sprite) {
  // TODO: width and height of item must contain the collision polygon.
  var attr = {
    x: sprite.x,
    y: sprite.y,
    layer: sprite.layer,
    w: this.tileSize,
    h: this.tileSize,
    vectorType: "item",
    sprite: sprite
  };
  var entity = Crafty.e("2D, Solid, Collision")
          .attr(attr)
          .checkHits("Solid")
          .collision(new Crafty.polygon([-16, -32, 16, -32, 16, 0, -16, 0]))
          .bind("HitOn", function (hitData) {
            this.sprite.item.checkCollisions(hitData[0], this);
          });
  entity.visible = false;
  return entity;
};

RPGToolkit.prototype.openProgram = function (filename) {
  var program = rpgtoolkit.programCache[filename];

  if (!program) {
    // TODO: Make the changes here that chrome suggests.
    var req = new XMLHttpRequest();
    req.open("GET", filename, false);
    req.overrideMimeType("text/plain; charset=x-user-defined");
    req.send(null);

    program = new Function(req.responseText);
    rpgtoolkit.programCache[filename] = program;
  }

  return program;
};

RPGToolkit.prototype.runProgram = function (filename, source, callback) {
  rpgcode.source = source; // Entity that triggered the program.

  rpgtoolkit.craftyPlayer.disableControl();

  // Store endProgram callback and runtime key handlers.
  rpgtoolkit.endProgramCallback = callback;
  rpgtoolkit.keyDownHandlers = rpgtoolkit.keyboardHandler.downHandlers;
  rpgtoolkit.keyUpHandlers = rpgtoolkit.keyboardHandler.upHandlers;
  rpgtoolkit.keyboardHandler.downHandlers = {};
  rpgtoolkit.keyboardHandler.upHandlers = {};

  var program = rpgtoolkit.openProgram(filename);
  program();
};

RPGToolkit.prototype.endProgram = function (nextProgram) {
  if (nextProgram) {
    rpgtoolkit.runProgram(PATH_PROGRAM + nextProgram, rpgcode.source,
            rpgtoolkit.endProgramCallback);
  } else {
    if (rpgtoolkit.endProgramCallback) {
      rpgtoolkit.endProgramCallback();
      rpgtoolkit.endProgramCallback = null;
    }

    rpgtoolkit.keyboardHandler.downHandlers = rpgtoolkit.keyDownHandlers;
    rpgtoolkit.keyboardHandler.upHandlers = rpgtoolkit.keyUpHandlers;
    rpgtoolkit.craftyPlayer.enableControl();
  }
};

RPGToolkit.prototype.createSolidVector = function (x1, y1, x2, y2, layer) {
  var attr = this.calculateVectorPosition(x1, y1, x2, y2);
  attr.layer = layer;
  attr.vectorType = "solid";

  Crafty.e("Solid, Collision")
          .attr(attr);
};

RPGToolkit.prototype.createProgramVector = function (x1, y1, x2, y2, layer, fileName) {
  var attr = this.calculateVectorPosition(x1, y1, x2, y2);
  attr.layer = layer;
  attr.vectorType = "program";
  attr.fileName = fileName;

  Crafty.e("Solid, Collision")
          .attr(attr);
};

RPGToolkit.prototype.calculateVectorPosition = function (x1, y1, x2, y2) {
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

  return {x: x1, y: y1, w: width, h: height};
};

RPGToolkit.prototype.playSound = function (sound, loop) {
  Crafty.audio.play(sound, loop);
};

/**
 * Utility function for getting accurate timestamps across browsers.
 * 
 * @returns {Number}
 */
RPGToolkit.prototype.timestamp = function () {
  return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
};

// TODO: Make this a utility function. When there is a Craftyjs compiler
// it will do it instead.
RPGToolkit.prototype.prependPath = function (prepend, items) {
  var len = items.length;
  for (var i = 0; i < len; i++) {
    items[i] = prepend.concat(items[i]);
  }
};
