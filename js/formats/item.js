Item.prototype = new Sprite();
Item.prototype.constructor = Item;

function Item(filename) {
  // TODO: Make the changes here that chrome suggests.
  var req = new XMLHttpRequest();
  req.open("GET", filename, false);
  req.overrideMimeType("text/plain; charset=x-user-defined");
  req.send(null);
  
  var item  = JSON.parse(req.responseText);
  
  item.DirectionEnum = this.DirectionEnum;
  item.changeGraphics = this.changeGraphics;
  item.animate = this.animate;
  item.checkCollisions = this.checkCollisions;
  item.load = this.load;
  item.loadFrames = this.loadFrames;
  item.loadSoundEffects = this.loadSoundEffects;
  item.loadAssets = this.loadAssets;

  item.direction = this.DirectionEnum.SOUTH;
  item.setReady = this.setReady;
  item.renderReady = false;
  
  return item;
}

Item.prototype.checkCollisions = function (collision, entity) {
  var object = collision.obj;
  switch (object.vectorType) {
    case "item":
      entity.x += collision.normal.x;
      entity.y += collision.normal.y;
      entity.resetHitChecks();
      break;
    case "solid":
      entity.x += collision.normal.x;
      entity.y += collision.normal.y;
      entity.resetHitChecks();
      break;
  }
};