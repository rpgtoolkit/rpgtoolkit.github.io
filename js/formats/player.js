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
  NORTH: "n",
  SOUTH: "s",
  EAST: "e",
  WEST: "w"
};

player.prototype.loadGraphics = function () {
  var frames = [];
  frames = frames.concat(this.graphics.north.frames);
  frames = frames.concat(this.graphics.south.frames);
  frames = frames.concat(this.graphics.east.frames);
  frames = frames.concat(this.graphics.west.frames);

  this.loadFrames(frames);
};

player.prototype.loadFrames = function (frames) {
  var assets = {
    "images": frames
  };

  Crafty.load(assets,
          function () { // when loaded
            var player = rpgtoolkit.craftyPlayer.player;
            player.graphics.active = player.graphics.south;
            player.renderReady = true;
            var e = {ctx: Crafty.canvasLayer.context};
            Crafty.trigger("Draw", e);
          },
          function (e) { // progress
    
          },
          function (e) { // uh oh, error loading
    
          });
};

player.prototype.frameLoaded = function () {
  // Forced to use craftyPlayer in here because the object invoking 
  // the callback isn't a player object!
  var player = rpgtoolkit.craftyPlayer.player;
  player.framesLoaded++;

  if (player.framesLoaded === player.totalFrames) {
    player.graphics.active = player.graphics.south;
    player.renderReady = true;

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

player.prototype.checkCollisions = function (collision, entity) {
  var object = collision.obj;
  switch(object.vectorType) {
    case "item":
      // TODO: need to examine the item, determine if it is a solid,
      //       does it have a program attached etc.
      entity.x += collision.normal.x;
      entity.y += collision.normal.y;
     
      if(object.sprite.activationProgram) {
        rpgtoolkit.runProgram(PATH_PROGRAM.concat(object.sprite.activationProgram), object);
      }
      
      entity.resetHitChecks();
      break;
    case "program":
      rpgtoolkit.runProgram(object.fileName, entity);
      break;
    case "solid":
      entity.x += collision.normal.x;
      entity.y += collision.normal.y;
      entity.resetHitChecks();
      break;
  }
};