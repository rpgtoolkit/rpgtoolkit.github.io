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
  
  player.loadGraphics();
  
  return player;
}

player.prototype.DirectionEnum = {
  NORTH: 0,
  SOUTH: 1,
  EAST: 2,
  WEST: 3
};

player.prototype.loadGraphics = function() {
  // TODO: Convert this to a loop later when the Editor I/O is finialised,
  // will be based on the graphics index e.g. this.graphics[0].frames etc...
  this.totalFrames += this.graphics.north.frames.length;
  this.totalFrames += this.graphics.south.frames.length;
  this.totalFrames += this.graphics.east.frames.length;
  this.totalFrames += this.graphics.west.frames.length;
  
  this.loadFrames(this.graphics.north.frames);
  this.loadFrames(this.graphics.south.frames);
  this.loadFrames(this.graphics.east.frames);
  this.loadFrames(this.graphics.west.frames);
};

player.prototype.loadFrames = function (frames) {
  var len = frames.length;
  for (var i = 0; i < len; i++) {
    var img = new Image();
    img.src = PATH_BITMAP + frames[i];
    img.onload = this.frameLoaded;
    frames[i] = img;
  }
};

player.prototype.frameLoaded = function () {
  // Forced to use currentPlayer in here because the object invoking 
  // the callback isn't a player object!
  currentPlayer.player.framesLoaded++;

  if (currentPlayer.player.framesLoaded === currentPlayer.player.totalFrames) {
    currentPlayer.player.graphics.active = currentPlayer.player.graphics.south;
    currentPlayer.player.renderReady = true;
    
    var e = { ctx: Crafty.canvasLayer.context };
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