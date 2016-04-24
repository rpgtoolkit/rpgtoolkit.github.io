var rpgtoolkit = new RPGToolkit();

function RPGToolkit() {
  this.dt = 0; // Craftyjs time step since last frame;
  this.screen = {};
  this.craftyBoard = {};
  this.craftyPlayer = {};
  this.tilesets = {};
  this.rpgcodeApi = {};
  this.keyboardHandler = {};
  this.tileSize = 32;
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

  this.keyboardHandler = new keyboard();

  // Setup the drawing canvas (game screen).
  this.screen = new screenRenderer();
  this.createCraftyBoard(new board(PATH_BOARD + configuration.initBoard));

  // Setup the Player.
  var tkPlayer = new player(PATH_CHARACTER + configuration.initChar);
  tkPlayer.x = this.craftyBoard.board.startingPositionX;
  tkPlayer.y = this.craftyBoard.board.startingPositionY;
  this.loadPlayer(tkPlayer);
  Crafty.viewport.follow(this.craftyPlayer, 0, 0);

  this.rpgcodeApi = new rpgcode();

  // Run the startup program before the game logic loop.
  if (configuration.startupPrg) {
    this.runProgram(PATH_PROGRAM + configuration.startupPrg, {}, function () {
      rpgtoolkit.loadBoard();
    });
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
    sprite.item = new item(PATH_ITEM + sprite.fileName);
    board.sprites[i] = this.loadSprite(sprite);
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
          .collision(new Crafty.polygon([-15, 10, 15, 10, 15, 25, -15, 25]))
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
  this.craftyPlayer.player.loadGraphics();
};

RPGToolkit.prototype.loadSprite = function (sprite) {
  // TODO: width and height of item must be contain the collision polygon.
  var attr = {
    x: sprite.x,
    y: sprite.y,
    layer: sprite.layer,
    w: 32,
    h: 32,
    vectorType: "item",
    sprite: sprite
  };
  var entity = Crafty.e("2D, Solid, Collision")
          .attr(attr)
          .checkHits("Solid")
          .collision(new Crafty.polygon([0, 0, 32, 0, 32, 32, 0, 32]))
          .bind("HitOn", function (hitData) {
            var vectorType = hitData[0].obj.vectorType;
            switch (vectorType) {
              case "solid":
                this.x += hitData[0].normal.x;
                this.y += hitData[0].normal.y;
                break;
              case "item":
                console.log(hitData[0]);
                this.x += hitData[0].normal.x;
                this.y += hitData[0].normal.y;
                break;
            }

            this.resetHitChecks();
          });
  entity.visible = false;
  return entity;
};

RPGToolkit.prototype.runProgram = function (filename, source, callback) {
  // Provide the full path for Jailed.
  var host = location.protocol
          .concat("//")
          .concat(window.location.hostname)
          .concat(":".concat(location.port));

  this.rpgcodeApi.source = source; // Entity that triggered the program.

  rpgtoolkit.craftyPlayer.disableControl();

  var program = new jailed.Plugin(host + "/" + filename, this.rpgcodeApi.api);
  program.whenConnected(function () {

  });
  program.whenDisconnected(function () {
    if (callback) {
      callback();
    }
    rpgtoolkit.craftyPlayer.enableControl();
  });
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
