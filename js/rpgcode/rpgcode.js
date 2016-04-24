function rpgcode() {
  this.api = {
    clearCanvas: this.clearCanvas,
    createCanvas: this.createCanvas,
    delay: this.delay,
    destroyCanvas: this.destroyCanvas,
    fillRect: this.fillRect,
    getGlobal: this.getGlobal,
    getPlayerDirection: this.getPlayerDirection,
    getPlayerLocation: this.getPlayerLocation,
    keyDown: this.keyDown,
    keyUp: this.keyUp,
    loadAssets: this.loadAssets,
    log: this.log,
    drawText: this.drawText,
    playSound: this.playSound,
    pushItem: this.pushItem,
    pushPlayer: this.pushPlayer,
    removeAssets: this.removeAssets,
    renderNow: this.renderNow,
    replaceTile: this.replaceTile,
    sendToBoard: this.sendToBoard,
    setColor: this.setColor,
    setGlobal: this.setGlobal,
    setImage: this.setImage,
    stopSound: this.stopSound
  };
  this.source = {}; // The entity that triggered the program.
  this.canvases = {"renderNowCanvas": {
      canvas: rpgtoolkit.screen.renderNowCanvas,
      render: false
    }
  };
  this.globals = {};
  this.rgba = {r: 255, g: 255, b: 255, a: 1.0};
  this.font = "14px Arial";
}

/**
 * Clears an entire canvas and triggers a redraw.
 * 
 * @param {type} canvasId the canvas to clear if undefined defaults to "renderNowCanas"
 * @returns {undefined}
 */
rpgcode.prototype.clearCanvas = function (canvasId) {
  if (!canvasId) {
    canvasId = "renderNowCanvas";
  }

  var instance = rpgtoolkit.rpgcodeApi.canvases[canvasId];
  if (instance) {
    var canvas = instance.canvas;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    instance.render = false;
    Crafty.trigger("Invalidate");
  }
};

/**
 * Creates a canvas with the specified width, height, and ID. This canvas will not
 * be drawn until renderNow is called with its ID.
 * 
 * @param {type} width in pixels
 * @param {type} height in pixels
 * @param {type} canvasId a unique identifier
 * @returns {undefined}
 */
rpgcode.prototype.createCanvas = function (width, height, canvasId) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  rpgtoolkit.rpgcodeApi.canvases[canvasId] = {canvas: canvas, render: false};
};

/**
 * Delays a program for a specified number of milliseconds, after which the 
 * callback function is invoked.
 * 
 * @param {type} ms time to wait in milliseconds
 * @param {type} callback function to execute after the delay
 * @returns {undefined}
 */
rpgcode.prototype.delay = function (ms, callback) {
  Crafty.e("Delay").delay(callback, ms);
};

/**
 * Destroys the canvas.
 * 
 * @param {type} canvasId canvas to destroy
 * @returns {undefined}
 */
rpgcode.prototype.destroyCanvas = function (canvasId) {
  delete rpgtoolkit.rpgcodeApi.canvases[canvasId];
};

/**
 * Fills a solid rectangle on the canvas.
 * 
 * @param {type} x start x postion
 * @param {type} y start y postion
 * @param {type} width 
 * @param {type} height
 * @param {type} canvasId canvas to draw on
 * @returns {undefined}
 */
rpgcode.prototype.fillRect = function (x, y, width, height, canvasId) {
  if (!canvasId) {
    canvasId = "renderNowCanvas";
  }

  var instance = rpgtoolkit.rpgcodeApi.canvases[canvasId];
  if (instance) {
    var context = instance.canvas.getContext("2d");
    var rgba = rpgtoolkit.rpgcodeApi.rgba;
    context.fillStyle = "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")";
    context.fillRect(x, y, width, height);
  }
};

/**
 * Gets a global variable and returns it to the callback.
 * 
 * @param {type} id variable ID
 * @param {type} callback function to invoke
 * @returns {undefined}
 */
rpgcode.prototype.getGlobal = function (id, callback) {
  callback(rpgtoolkit.rpgcodeApi.globals[id]);
};

/**
 * Gets the player's current direction and returns it to the callback.
 * 
 * @param {type} callback function to invoke
 * @returns {undefined}
 */
rpgcode.prototype.getPlayerDirection = function (callback) {
  callback(rpgtoolkit.craftyPlayer.player.direction);
};

/**
 * Gets the player's current location (in tiles) and returns it to the callback.
 * 
 * @param {type} callback function to invoke
 * @returns {undefined}
 */
rpgcode.prototype.getPlayerLocation = function (callback) {
  var instance = rpgtoolkit.craftyPlayer;
  callback(instance.x / rpgtoolkit.tileSize,
          instance.y / rpgtoolkit.tileSize,
          instance.player.layer);
};

/**
 * Registers a keyDown listener for a specific key, for a list of valid key values see:
 *    http://craftyjs.com/api/Crafty-keys.html
 *    
 * The callback function will continue to be invoked for every keyDown event until it
 * is unregistered.
 * 
 * @param {type} key
 * @param {type} callback
 * @returns {undefined}
 */
rpgcode.prototype.keyDown = function (key, callback) {
  rpgtoolkit.keyboardHandler.downHandlers[Crafty.keys[key]] = callback;
};

/**
 * Registers a keyUp listener for a specific key, for a list of valid key values see:
 *    http://craftyjs.com/api/Crafty-keys.html
 *    
 * The callback function will continue to be invoked for every keyUp event until it
 * is unregistered.
 * 
 * @param {type} key
 * @param {type} callback
 * @returns {undefined}
 */
rpgcode.prototype.keyUp = function (key, callback) {
  rpgtoolkit.keyboardHandler.upHandlers[Crafty.keys[key]] = callback;
};

/**
 * Loads the requested assets into the engine, when all of the assets have been loaded
 * the onLoad callback is invoked.
 * 
 * @param {type} assets 
 * @param {type} onLoad callback to invoke after assets are loaded
 * @returns {undefined}
 */
rpgcode.prototype.loadAssets = function (assets, onLoad) {
  // If the assets already exist Crafty just ignores 
  // them but still invokes the callback.
  Crafty.load(assets, onLoad);
};

/**
 * Log a message to the console.
 * 
 * @param {type} message message to log
 * @returns {undefined}
 */
rpgcode.prototype.log = function (message) {
  console.log(message);
};

/**
 * Draws the text on the canvas startig at the specified (x, y) position, if no 
 * canvas is specified it defaults to the "renderNowCanvas".
 * 
 * @param {type} x
 * @param {type} y
 * @param {type} text
 * @param {type} canvasId
 * @returns {undefined}
 */
rpgcode.prototype.drawText = function (x, y, text, canvasId) {
  if (!canvasId) {
    canvasId = "renderNowCanvas";
  }

  var instance = rpgtoolkit.rpgcodeApi.canvases[canvasId];
  if (instance) {
    var context = instance.canvas.getContext("2d");
    var rgba = rpgtoolkit.rpgcodeApi.rgba;
    context.fillStyle = "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")";
    context.font = rpgtoolkit.rpgcodeApi.font;
    context.fillText(text, x, y);
  }
};

/**
 * Plays the supplied sound file, up to five sound channels can be active at once. 
 * 
 * @param {type} file 
 * @param {type} loop 
 * @returns {undefined}
 */
rpgcode.prototype.playSound = function (file, loop) {
  var count = loop ? -1 : 1;
  Crafty.audio.play(file, count);
};

/**
 * Pushs the item by 1 pixel in the give direction.
 * 
 * @param {type} item
 * @param {type} direction
 * @returns {undefined}
 */
rpgcode.prototype.pushItem = function (item, direction) {
  switch (item) {
    case "source":
      rpgtoolkit.rpgcodeApi.source.move(direction, 1);
      break;
  }
};

/**
 * Pushs the player by 1 pixel in the given direction.
 * 
 * @param {type} direction
 * @returns {undefined}
 */
rpgcode.prototype.pushPlayer = function (direction) {
  // Naive, player could go through vectors with this.
  var from = {x: rpgtoolkit.craftyPlayer.x, y: rpgtoolkit.craftyPlayer.y};
  switch (direction) {
    case "NORTH":
      rpgtoolkit.craftyPlayer.y -= rpgtoolkit.tileSize;
      Crafty.trigger("Moved", from);
      break;
    case "SOUTH":
      rpgtoolkit.craftyPlayer.y += rpgtoolkit.tileSize;
      Crafty.trigger("Moved", from);
      break;
    case "EAST":
      rpgtoolkit.craftyPlayer.x += rpgtoolkit.tileSize;
      Crafty.trigger("Moved", from);
      break;
    case "WEST":
      rpgtoolkit.craftyPlayer.x -= rpgtoolkit.tileSize;
      Crafty.trigger("Moved", from);
      break;
    case "NORTHEAST":
      rpgtoolkit.craftyPlayer.x += rpgtoolkit.tileSize;
      rpgtoolkit.craftyPlayer.y -= rpgtoolkit.tileSize;
      Crafty.trigger("Moved", from);
      break;
    case "NORTHWEST":
      rpgtoolkit.craftyPlayer.x -= rpgtoolkit.tileSize;
      rpgtoolkit.craftyPlayer.y -= rpgtoolkit.tileSize;
      Crafty.trigger("Moved", from);
      break;
    case "SOUTHEAST":
      rpgtoolkit.craftyPlayer.x += rpgtoolkit.tileSize
      rpgtoolkit.craftyPlayer.y += rpgtoolkit.tileSize
      Crafty.trigger("Moved", from);
      break;
    case "SOUTHWEST":
      rpgtoolkit.craftyPlayer.x -= rpgtoolkit.tileSize
      rpgtoolkit.craftyPlayer.y += rpgtoolkit.tileSize
      Crafty.trigger("Moved", from);
      break;
  }
};

/**
 * Removes assets from the engine.
 * 
 * @param {type} assets
 * @returns {undefined}
 */
rpgcode.prototype.removeAssets = function (assets) {
  Crafty.removeAssets(assets);
};

/**
 * Renders the specified canvas, if none then the "renderNowCanvas" is shown.
 * 
 * @param {type} canvasId
 * @returns {undefined}
 */
rpgcode.prototype.renderNow = function (canvasId) {
  if (!canvasId) {
    canvasId = "renderNowCanvas";
  }
  
  var canvas = rpgtoolkit.rpgcodeApi.canvases[canvasId];
  if (canvas) {
    canvas.render = true;
    Crafty.trigger("Invalidate");
  }
};

/**
 * Replaces a tile at the supplied (x, y, z) position.
 * 
 * @param {type} tileX
 * @param {type} tileY
 * @param {type} layer
 * @param {type} tileName
 * @returns {undefined}
 */
rpgcode.prototype.replaceTile = function (tileX, tileY, layer, tileName) {
  var index = rpgtoolkit.craftyBoard.board.tileNames.indexOf(tileName);
  if (index === -1) {
    index = rpgtoolkit.craftyBoard.board.tileNames.push(tileName);
  } else {
    index += 1;
  }
  rpgtoolkit.craftyBoard.board.tiles[layer][tileY][tileX] = index;
  rpgtoolkit.craftyBoard.board.layerCache = []; // TODO: Very expensive.
};

/**
 * Sends the player to a board and places them at the given (x, y) position in tiles.
 * 
 * @param {type} boardName
 * @param {type} tileX
 * @param {type} tileY
 * @returns {undefined}
 */
rpgcode.prototype.sendToBoard = function (boardName, tileX, tileY) {
  rpgtoolkit.switchBoard(boardName, tileX, tileY);
};

/**
 * Sets the RGBA color for all drawing operations to use.
 * 
 * @param {type} r
 * @param {type} g
 * @param {type} b
 * @param {type} a
 * @returns {undefined}
 */
rpgcode.prototype.setColor = function (r, g, b, a) {
  rpgtoolkit.rpgcodeApi.rgba = {r: r, g: g, b: b, a: a};
};

/**
 * Sets a global value in the engine, if it doesn't exist it is created.
 * 
 * @param {type} id
 * @param {type} value
 * @returns {undefined}
 */
rpgcode.prototype.setGlobal = function (id, value) {
  rpgtoolkit.rpgcodeApi.globals[id] = value;
};

/**
 * Sets an image on the canvas.
 * 
 * @param {type} fileName
 * @param {type} x
 * @param {type} y
 * @param {type} width
 * @param {type} height
 * @param {type} canvasId
 * @returns {undefined}
 */
rpgcode.prototype.setImage = function (fileName, x, y, width, height, canvasId) {
  if (!canvasId) {
    canvasId = "renderNowCanvas";
  }

  var instance = rpgtoolkit.rpgcodeApi.canvases[canvasId];
  if (instance) {
    var image = Crafty.asset(Crafty.__paths.images + fileName);
    if (image) {
      var context = instance.canvas.getContext("2d");
      context.drawImage(image, x, y, width, height);
    }
  }
};

/**
 * Stops playing the specified sound file.
 * 
 * @param {type} file
 * @returns {undefined}
 */
rpgcode.prototype.stopSound = function (file) {
  Crafty.audio.stop(file);
};