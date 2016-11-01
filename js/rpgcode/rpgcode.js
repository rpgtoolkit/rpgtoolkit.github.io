/* global rpgtoolkit, rpgcode */

var rpgcode = null; // Setup inside of the engine.

function RPGcode() {
  // The last entity to trigger a program.
  this.source = {};

  this.canvases = {"renderNowCanvas": {
      canvas: rpgtoolkit.screen.renderNowCanvas,
      render: false
    }
  };

  // Global variable storage for user programs.
  this.globals = {};

  this.rgba = {r: 255, g: 255, b: 255, a: 1.0};
  this.font = "14px Arial";

  this.dialogWindow = {
    visible: false,
    profile: null,
    background: null,
    lineY: 5
  };
}

/**
 * Should not be used directly, instead see animateItem and animatePlayer.
 * 
 * @param {Object} generic - The object that supports animation.
 * @param {Object} resetGraphics - The graphics set to return to after the animation has finished.
 * @param {Function} callback - Invoked on animation end if defined.
 * @returns {undefined}
 */
RPGcode.prototype._animateGeneric = function (generic, resetGraphics, callback) {  
  var activeGraphics = generic.graphics.active;
  var soundEffect = activeGraphics.soundEffect;
  var frameRate = activeGraphics.frameRate;
  var delay = frameRate * 1000; // Get number of milliseconds.
  var repeat = activeGraphics.frames.length - 1;

  Crafty.e("Delay").delay(function () {
    generic.animate(frameRate);
    Crafty.trigger("Invalidate");
  }, delay, repeat, function () {
    generic.graphics.active = resetGraphics;
    Crafty.trigger("Invalidate");

    if (callback) {
      callback();
    }
  });

  if (soundEffect) {
    rpgcode.playSound(soundEffect, false);
  }
};

/**
 * Animates the item using the requested animation. The animationId must be
 * available for the item.
 * 
 * @param {number} itemId - The index of the item on the board to animate.
 * @param {string} animationId - The requested animation to play for the item.
 * @param {Function} callback - If defined, the function to invoke at the end of the animation.
 * @returns {undefined}
 */
RPGcode.prototype.animateItem = function (itemId, animationId, callback) {
  var entity = rpgtoolkit.craftyBoard.board.sprites[itemId];
  if (entity) {
    var item = entity.sprite.item;
    var resetGraphics = item.graphics.active;
    rpgcode.setItemStance(itemId, animationId);
    rpgcode._animateGeneric(item, resetGraphics, callback);
  }
};

/**
 * Animates the player using the requested animation. The animationId must be
 * available for the player.
 * 
 * @param {string} playerId - The label associated with the player. 
 * @param {string} animationId - The requested animation to player for the player.
 * @param {Function} callback - If defined, the function to invoke at the end of the animation.
 * @returns {undefined}
 */
RPGcode.prototype.animatePlayer = function (playerId, animationId, callback) {
  // TODO: playerId will be unused until parties with multiple players are supported.
  var player = rpgtoolkit.craftyPlayer.player;
  var resetGraphics = player.graphics.active;
  rpgcode.setPlayerStance(playerId, animationId);
  rpgcode._animateGeneric(player, resetGraphics, callback);
};

/**
 * Clears an entire canvas and triggers a redraw.
 * 
 * @param {string} canvasId - The canvas to clear, if undefined defaults to "renderNowCanas".
 * @returns {undefined}
 */
RPGcode.prototype.clearCanvas = function (canvasId) {
  if (!canvasId) {
    canvasId = "renderNowCanvas";
  }

  var instance = rpgcode.canvases[canvasId];
  if (instance) {
    var canvas = instance.canvas;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    instance.render = false;
    Crafty.trigger("Invalidate");
  }
};

/**
 * Clears and hides the dialog box.
 * 
 * @returns {undefined}
 */
RPGcode.prototype.clearDialog = function () {
  rpgcode.dialogWindow.visible = false;
  rpgcode.dialogWindow.lineY = 5;
  rpgcode.clearCanvas("renderNowCanvas");
};

/**
 * Creates a canvas with the specified width, height, and ID. This canvas will not
 * be drawn until renderNow is called with its ID.
 * 
 * @param {number} width - In pixels.
 * @param {number} height - In pixels.
 * @param {string} canvasId - The unique identifier for this canvas.
 * @returns {undefined}
 */
RPGcode.prototype.createCanvas = function (width, height, canvasId) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  rpgcode.canvases[canvasId] = {canvas: canvas, render: false};
};

/**
 * Delays a programs execution for a specified number of milliseconds, after which the 
 * callback function is invoked.
 * 
 * @param {number} ms - Time to wait in milliseconds.
 * @param {Function} callback - Function to execute after the delay.
 * @returns {undefined}
 */
RPGcode.prototype.delay = function (ms, callback) {
  Crafty.e("Delay").delay(callback, ms);
};

/**
 * Destroys the canvas with the specified ID.
 * 
 * @param {string} canvasId - The ID for the canvas to destroy.
 * @returns {undefined}
 */
RPGcode.prototype.destroyCanvas = function (canvasId) {
  delete rpgcode.canvases[canvasId];
};

/**
 * Destroys a particular item instance and removes it from play.
 * 
 * @param {number} itemId - The index of the item on the board to animate.
 * @returns {undefined}
 */
RPGcode.prototype.destroyItem = function (itemId) {
  if (rpgtoolkit.craftyBoard.board.sprites[itemId]) {
    rpgtoolkit.craftyBoard.board.sprites[itemId].destroy();
    delete rpgtoolkit.craftyBoard.board.sprites[itemId];
    Crafty.trigger("Invalidate");
  }
};

/**
 * Draws the source canvas onto the target canvas.
 * 
 * @param {string} sourceId - The ID of the source canvas.
 * @param {number} x - The start position x in pixels.
 * @param {number} y - The start position y in pixels.
 * @param {number} width - In pixels.
 * @param {number} height - In pixels.
 * @param {string} targetId - The ID of the target canvas.
 * @returns {undefined}
 */
RPGcode.prototype.drawOntoCanvas = function (sourceId, x, y, width, height, targetId) {
  var source = rpgcode.canvases[sourceId];
  var target = rpgcode.canvases[targetId];

  if (source && target) {
    var sourceCanvas = source.canvas;
    var targetContext = target.canvas.getContext("2d");
    targetContext.drawImage(sourceCanvas, x, y, width, height);
  }
};

/**
 * Draws the text on the canvas starting at the specified (x, y) position, if no 
 * canvas is specified it defaults to the "renderNowCanvas".
 * 
 * @param {number} x - The start position x in pixels.
 * @param {number} y - The start postion y in pixels.
 * @param {string} text - A string of text to draw.
 * @param {string} canvasId - The ID of the canvas to draw onto, if undefined 
 *                          defaults to "renderNowCanvas".
 * @returns {undefined}
 */
RPGcode.prototype.drawText = function (x, y, text, canvasId) {
  if (!canvasId) {
    canvasId = "renderNowCanvas";
  }

  var instance = rpgcode.canvases[canvasId];
  if (instance) {
    var context = instance.canvas.getContext("2d");
    var rgba = rpgcode.rgba;
    context.fillStyle = "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")";
    context.font = rpgcode.font;
    context.fillText(text, x, y);
  }
};

/**
 * Ends the current program and releases control back to the main game loop. If nextProgram is
 * specified the main loop will not resume. Execution will be immediately passed to the program
 * the user specified.
 * 
 * @param {string} nextProgram - The relative path to the next program to execute.
 * @returns {undefined}
 */
RPGcode.prototype.endProgram = function (nextProgram) {
  if (nextProgram) {
    rpgtoolkit.endProgram(nextProgram);
  } else {
    rpgtoolkit.endProgram();
  }
};

/**
 * Fills a solid rectangle on the canvas.
 * 
 * @param {number} x - The start x postion.
 * @param {number} y - The start y postion.
 * @param {number} width - In pixels.
 * @param {number} height - In pixels.
 * @param {string} canvasId - The ID of the canvas to draw on, defaults to "renderNowCanvas" 
 * if none specified.
 * @returns {undefined}
 */
RPGcode.prototype.fillRect = function (x, y, width, height, canvasId) {
  if (!canvasId) {
    canvasId = "renderNowCanvas";
  }

  var instance = rpgcode.canvases[canvasId];
  if (instance) {
    var context = instance.canvas.getContext("2d");
    var rgba = rpgcode.rgba;
    context.fillStyle = "rgba(" + rgba.r + "," + rgba.g + "," + rgba.b + "," + rgba.a + ")";
    context.fillRect(x, y, width, height);
  }
};

/**
 * Gets the current board's file name and returns it.
 * 
 * @returns {undefined}
 */
RPGcode.prototype.getBoardName = function () {
  return rpgtoolkit.craftyBoard.board.filename;
};

/**
 * Gets the value of global variable.
 * 
 * @param {string} id -  The ID associated with the global variable.
 * @returns {undefined}
 */
RPGcode.prototype.getGlobal = function (id) {
  return rpgcode.globals[id];
};

/**
 * Gets the player's current direction.
 * 
 * @returns {undefined}
 */
RPGcode.prototype.getPlayerDirection = function () {
  return rpgtoolkit.craftyPlayer.player.direction;
};

/**
 * Gets the player's current location (in tiles).
 * 
 * @returns {undefined}
 */
RPGcode.prototype.getPlayerLocation = function () {
  var instance = rpgtoolkit.craftyPlayer;
  return [
    instance.x / rpgtoolkit.tileSize, 
    instance.y / rpgtoolkit.tileSize, 
    instance.player.layer
  ];
};

/**
 * Gets a random number between the min and max inclusive.
 * 
 * @param {number} min - Minimum value for the random number.
 * @param {number} max - Maximum value for the random number.
 * @returns {undefined}
 */
RPGcode.prototype.getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Loads the requested assets into the engine, when all of the assets have been loaded
 * the onLoad callback is invoked.
 * 
 * @param {Object} assets - Object of assets to load.
 * @param {Function} onLoad - Callback to invoke after assets are loaded.
 * @returns {undefined}
 */
RPGcode.prototype.loadAssets = function (assets, onLoad) {
  // If the assets already exist Crafty just ignores 
  // them but still invokes the callback.
  Crafty.load(assets, onLoad);
};

/**
 * Log a message to the console.
 * 
 * @param {string} message - Message to log.
 * @returns {undefined}
 */
RPGcode.prototype.log = function (message) {
  console.log(message);
};

/**
 * Plays the supplied sound file, up to five sound channels can be active at once. 
 * 
 * @param {string} file - Relative path to the sound file to play.
 * @param {boolean} loop - Should it loop indefinitely?
 * @returns {undefined}
 */
RPGcode.prototype.playSound = function (file, loop) {
  var count = loop ? -1 : 1;
  Crafty.audio.play(file, count);
};

/**
 * Pushs the item by 8 pixels in the given direction.
 * 
 * @param {number} item - The index of item on the board to push.
 * @param {string} direction - The direction to push the item in.
 * @returns {undefined}
 */
RPGcode.prototype.pushItem = function (item, direction) {
  switch (item) {
    case "source":
      rpgcode.source.move(direction, 8);
      break;
  }
};

/**
 * Pushs the player by 8 pixels in the given direction.
 * 
 * @param {string} direction - The direction to push the player in.
 * @returns {undefined}
 */
RPGcode.prototype.pushPlayer = function (direction) {
  rpgtoolkit.craftyPlayer.move(direction, 8);
};

/**
 * Registers a keyDown listener for a specific key, for a list of valid key values see:
 *    http://craftyjs.com/api/Crafty-keys.html
 *    
 * The callback function will continue to be invoked for every keyDown event until it
 * is unregistered.
 * 
 * @param {string} key - The key to listen to.
 * @param {Function} callback - The callback function to invoke when the keyDown event fires.
 * @returns {undefined}
 */
RPGcode.prototype.registerKeyDown = function (key, callback) {
  rpgtoolkit.keyboardHandler.downHandlers[Crafty.keys[key]] = callback;
};

/**
 * Registers a keyUp listener for a specific key, for a list of valid key values see:
 *    http://craftyjs.com/api/Crafty-keys.html
 *    
 * The callback function will continue to be invoked for every keyUp event until it
 * is unregistered.
 * 
 * @param {string} key - The key to listen to.
 * @param {Function} callback - The callback function to invoke when the keyUp event fires.
 * @returns {undefined}
 */
RPGcode.prototype.registerKeyUp = function (key, callback) {
  rpgtoolkit.keyboardHandler.upHandlers[Crafty.keys[key]] = callback;
};

/**
 * Removes assets from the engine and frees up the memory allocated to them.
 * 
 * @param {Object} assets - The object containing the assets identifiers.
 * @returns {undefined}
 */
RPGcode.prototype.removeAssets = function (assets) {
  Crafty.removeAssets(assets);
};

/**
 * Renders the specified canvas, if none then the "renderNowCanvas" is shown.
 * 
 * @param {string} canvasId - The ID of the canvas to render.
 * @returns {undefined}
 */
RPGcode.prototype.renderNow = function (canvasId) {
  if (!canvasId) {
    canvasId = "renderNowCanvas";
  }

  var canvas = rpgcode.canvases[canvasId];
  if (canvas) {
    canvas.render = true;
    Crafty.trigger("Invalidate");
  }
};

/**
 * Replaces a tile at the supplied (x, y, z) position.
 * 
 * @param {number} tileX - The x position in tiles.
 * @param {number} tileY - The y postion in tiles.
 * @param {number} layer - The layer the tile is on.
 * @param {string} tileName - The name of the tile to replace with.
 * @returns {undefined}
 */
RPGcode.prototype.replaceTile = function (tileX, tileY, layer, tileName) {
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
 * Restarts the game.
 * 
 * @returns {undefined}
 */
RPGcode.prototype.restart = function () {
  location.reload(); // Cheap way to implement game restart for the moment.
};

/**
 * Sends the player to a board and places them at the given (x, y) position in tiles.
 * 
 * @param {string} boardName - The board to send the player to.
 * @param {number} tileX - The x position to place the player at, in tiles.
 * @param {number} tileY - The y position to place the player at, in tiles.
 * @returns {undefined}
 */
RPGcode.prototype.sendToBoard = function (boardName, tileX, tileY) {
  rpgtoolkit.switchBoard(boardName, tileX, tileY);
};

/**
 * Sets the RGBA color for all drawing operations to use.
 * 
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @param {number} a
 * @returns {undefined}
 */
RPGcode.prototype.setColor = function (r, g, b, a) {
  rpgcode.rgba = {r: r, g: g, b: b, a: a};
};

/**
 * Sets a global value in the engine, if it doesn't exist it is created.
 * 
 * @param {string} id - The ID to use for this global.
 * @param {Object} value - The value this global holds.
 * @returns {undefined}
 */
RPGcode.prototype.setGlobal = function (id, value) {
  rpgcode.globals[id] = value;
};

/**
 * Sets an image on the canvas.
 * 
 * @param {string} fileName - The relative path to the image.
 * @param {number} x - The start position x in pixels.
 * @param {number} y - The start position y in pixels.
 * @param {number} width - In pixels.
 * @param {number} height - In pixels.
 * @param {string} canvasId - The ID of the canvas to put the image on.
 * @returns {undefined}
 */
RPGcode.prototype.setImage = function (fileName, x, y, width, height, canvasId) {
  if (!canvasId) {
    canvasId = "renderNowCanvas";
  }

  var instance = rpgcode.canvases[canvasId];
  if (instance) {
    var image = Crafty.asset(Crafty.__paths.images + fileName);
    if (image) {
      var context = instance.canvas.getContext("2d");
      context.drawImage(image, x, y, width, height);
    }
  }
};

/**
 * Sets the dialog box's speaker profile image and the background image.
 * 
 * @param {string} profileImage - The relative path to the profile image.
 * @param {string} backgroundImage - The relative path to the background image.
 * @returns {undefined}
 */
RPGcode.prototype.setDialogGraphics = function (profileImage, backgroundImage) {
  rpgcode.dialogWindow.profile = profileImage;
  rpgcode.dialogWindow.background = backgroundImage;
};

/**
 * Sets the location of the item.
 * 
 * @param {number} itemId - The index of the item on the board to move.
 * @param {number} x - In pixels by default.
 * @param {number} y - In pixels by default.
 * @param {number} layer - Target layer to put the item on.
 * @param {boolean} isTiles - Is (x, y) in tile coordinates, defaults to pixels.
 * @returns {undefined}
 */
RPGcode.prototype.setItemLocation = function (itemId, x, y, layer, isTiles) {
  if (isTiles) {
    x *= rpgtoolkit.tileSize;
    y *= rpgtoolkit.tileSize;
  }

  var item = rpgtoolkit.craftyBoard.board.sprites[itemId];
  if (item) {
    item.x = x;
    item.y = y;
    item.layer = layer;
    Crafty.trigger("Invalidate");
  }
};

/**
 * Sets the item's current stance, uses the first frame in the animation.
 * 
 * @param {number} itemId - The index of the item on the board.
 * @param {string} stanceId - The stanceId (animationId) to use.
 * @returns {undefined}
 */
RPGcode.prototype.setItemStance = function (itemId, stanceId) {
  var entity = rpgtoolkit.craftyBoard.board.sprites[itemId];
  if (entity) {
    entity.sprite.item.changeGraphics(stanceId);
  }
};

/**
 * Sets the player's location without triggering any animation.
 * 
 * @param {string} playerId - The identifier associated with player to move.
 * @param {number} x - In pixels by default.
 * @param {number} y - In pixels by default.
 * @param {number} layer - Target layer to put the item on.
 * @param {boolean} isTiles - Is (x, y) in tile coordinates, defaults to pixels.
 * @returns {undefined}
 */
RPGcode.prototype.setPlayerLocation = function (playerId, x, y, layer, isTiles) {
  if (isTiles) {
    x *= rpgtoolkit.tileSize;
    y *= rpgtoolkit.tileSize;
  }

  // TODO: playerId will be unused until parties with multiple players 
  // are supported.
  rpgtoolkit.craftyPlayer.x = x;
  rpgtoolkit.craftyPlayer.y = y;
  rpgtoolkit.craftyPlayer.player.layer = layer;
};

/**
 * Sets the player's current stance, uses the first frame in the animation.
 * 
 * @param {string} playerId - The index of the item on the board.
 * @param {string} stanceId - The stanceId (animationId) to use.
 * @returns {undefined}
 */
RPGcode.prototype.setPlayerStance = function (playerId, stanceId) {
  // TODO: playerId will be unused until parties with multiple players 
  // are supported.
  rpgtoolkit.craftyPlayer.player.changeGraphics(stanceId);
  Crafty.trigger("Invalidate");
};

/**
 * Shows the dialog window and adds the dialog to it if it is already 
 * visible the dialog is just appended to the current window.
 * 
 * Note the dialog window is drawn on the default "renderNowCanvas".
 * 
 * @param {string} dialog - The dialog to output.
 * @returns {undefined}
 */
RPGcode.prototype.showDialog = function (dialog) {
  var dialogWindow = rpgcode.dialogWindow;

  if (!dialogWindow.visible) {
    rpgcode.setImage(dialogWindow.profile, 0, 0, 100, 100);
    rpgcode.setImage(dialogWindow.background, 100, 0, 540, 100);
    dialogWindow.visible = true;

  }

  dialogWindow.lineY += parseInt(rpgcode.font);
  rpgcode.drawText(105, dialogWindow.lineY, dialog);
  rpgcode.renderNow();
};

/**
 * Stop playing a specific sound file, if no file is set stop
 * all sounds.
 * 
 * @param {string} file - The relative path of the sound file to stop.
 * @returns {undefined}
 */
RPGcode.prototype.stopSound = function (file) {
  if (file) {
    Crafty.audio.stop(file);
  } else {
    Crafty.audio.stop();
  }
};

/**
 * Removes a previously registered keyDown listener.
 * 
 * @param {string} key - The key associated with the listener.
 * @returns {undefined}
 */
RPGcode.prototype.unregisterKeyDown = function (key) {
  delete rpgtoolkit.keyboardHandler.downHandlers[Crafty.keys[key]];
};

/**
 * Removes a previously registered keyUp listener.
 * 
 * @param {string} key - The key associated with the listener.
 * @returns {undefined}
 */
RPGcode.prototype.unregisterKeyUp = function (key) {
  delete rpgtoolkit.keyboardHandler.upHandlers[Crafty.keys[key]];
};