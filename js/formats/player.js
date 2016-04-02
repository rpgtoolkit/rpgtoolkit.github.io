function player(filename) {
  // TODO: Make the changes here that chrome suggests.
  var req = new XMLHttpRequest();
  req.open("GET", filename, false);
  req.overrideMimeType("text/plain; charset=x-user-defined");
  req.send(null);

  var player = JSON.parse(req.responseText);

  // TODO: This smells hacky.
  player.DirectionEnum = this.DirectionEnum;
  player.changeGraphics = this.changeGraphics;
  player.animate = this.animate;
  player.checkCollisions = this.checkCollisions;
  player.loadGraphics = this.loadGraphics;
  player.loadFrames = this.loadFrames;
  player.frameLoaded = this.frameLoaded;

  player.direction = this.DirectionEnum.SOUTH;
  player.renderReady = false;
  player.framesLoaded = 0;
  player.totalFrames = 0;

  return player;
}

player.prototype.DirectionEnum = {
  NORTH: 0,
  SOUTH: 1,
  EAST: 2,
  WEST: 3
};

player.prototype.loadGraphics = function () {
  appendPath(this.graphics.north.frames);
  appendPath(this.graphics.south.frames);
  appendPath(this.graphics.east.frames);
  appendPath(this.graphics.west.frames);
  
  var frames = [];
  frames = frames.concat(this.graphics.north.frames);
  frames = frames.concat(this.graphics.south.frames);
  frames = frames.concat(this.graphics.east.frames);
  frames = frames.concat(this.graphics.west.frames);

  this.loadFrames(frames);
};

// TODO: Make this a utility function. When there is a Craftyjs compiler
// it will do it instead.
function appendPath(frames) {
  var len = frames.length;
  for (var i = 0; i < len; i++) {
    frames[i] = PATH_BITMAP.concat(frames[i]);
  }
}

player.prototype.loadFrames = function (frames) {
  var assets = {
    "images": frames
  };

  Crafty.load(assets,
          function () { // when loaded
            currentPlayer.player.graphics.active = currentPlayer.player.graphics.south;
            currentPlayer.player.renderReady = true;
            var e = {ctx: Crafty.canvasLayer.context};
            Crafty.trigger("Draw", e);
          },
          function (e) { // progress
    
          },
          function (e) { // uh oh, error loading
    
          });
};

player.prototype.frameLoaded = function () {
  // Forced to use currentPlayer in here because the object invoking 
  // the callback isn't a player object!
  currentPlayer.player.framesLoaded++;

  if (currentPlayer.player.framesLoaded === currentPlayer.player.totalFrames) {
    currentPlayer.player.graphics.active = currentPlayer.player.graphics.south;
    currentPlayer.player.renderReady = true;

    var e = {ctx: Crafty.canvasLayer.context};
    Crafty.trigger("Draw", e);
  }
};

player.prototype.animate = function (step) {
  this.graphics.elapsed += step;

  if (this.graphics.elapsed >= this.graphics.active.frameRate) {
    this.graphics.elapsed = this.graphics.elapsed - this.graphics.active.frameRate;
    var frame = this.graphics.frameIndex + 1;
    if (frame < this.graphics.active.frames.length) {
      this.graphics.frameIndex = frame;
    } else {
      this.graphics.frameIndex = 0;
    }
  }
};

player.prototype.changeGraphics = function (direction) {
  this.graphics.elapsed = 0;
  this.graphics.frameIndex = 0;

  switch (direction) {
    case this.DirectionEnum.NORTH:
      this.graphics.active = this.graphics.north;
      break;
    case this.DirectionEnum.SOUTH:
      this.graphics.active = this.graphics.south;
      break;
    case this.DirectionEnum.EAST:
      this.graphics.active = this.graphics.east;
      break;
    case this.DirectionEnum.WEST:
      this.graphics.active = this.graphics.west;
      break;
  }
};

player.prototype.checkCollisions = function (entity, from) {
  var result = entity.hit("solid-" + this.layer);
  if (result) {
    switch (from.axis) {
      case "x":
        entity.x = from.oldValue;
        break;
      case "y":
        entity.y = from.oldValue;
        break;
    }
  }
};