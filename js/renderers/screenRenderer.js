/* global rpgtoolkit, rpgcode */

function screenRenderer() {
  this.renderNowCanvas = document.createElement("canvas");
  this.renderNowCanvas.width = Crafty.viewport._width;
  this.renderNowCanvas.height = Crafty.viewport._height;
}

screenRenderer.prototype.render = function (context) {
  var x = -Crafty.viewport._x;
  var y = -Crafty.viewport._y;
  var width = Crafty.viewport._width;
  var height = Crafty.viewport._height;

  // Shorthand reference.
  var player = rpgtoolkit.craftyPlayer.player;
  player.x = rpgtoolkit.craftyPlayer.x;
  player.y = rpgtoolkit.craftyPlayer.y;

  if (rpgtoolkit.craftyBoard.show) {
    this.board = rpgtoolkit.craftyBoard.board;

    // Draw a black background.  
    context.fillStyle = "#000000";
    context.fillRect(x, y, width, height);

    if (!this.board.layerCache.length) {
      this.board.generateLayerCache();
    }

    // Loop through layers.
    for (var i = 0; i < this.board.layerCount; i++) {
      /*
       * Render this layer. 
       */
      context.drawImage(this.board.layerCache[i], x, y, width, height, x, y, width, height);

      /*
       * Sort sprites for depth.
       */
      var layerSprites = this.sortSprites(i, player);

      /*
       * Render sprites.
       */
      layerSprites.forEach(function (sprite) {
        var asset = Crafty.__paths.images +
                sprite.graphics.active.frames[sprite.graphics.frameIndex];
        var frame = Crafty.assets[asset];
        context.drawImage(
                frame,
                sprite.x - (frame.width / 2),
                sprite.y - frame.height,
                sprite.graphics.active.animationWidth,
                sprite.graphics.active.animationHeight);

        // Draw collision rectangle.
        var boxWidth = sprite.graphics.active.boundingBox.width;
        var boxHeight = sprite.graphics.active.boundingBox.height;
        context.beginPath();
        context.lineWidth = "2";
        context.strokeStyle = "#FFFFFF";
        context.rect(
                sprite.x - (boxWidth / 2),
                sprite.y - boxHeight,
                boxWidth,
                boxHeight);
        context.stroke();
      });
    }

    /*
     * (Optional) Render Vectors.
     */
    this.board.vectors.forEach(function (vector) {
      var haveMoved = false;
      context.strokeStyle = "#FFFFFF";
      context.lineWidth = 2.0;
      context.beginPath();
      vector.points.forEach(function (point) {
        if (!haveMoved) {
          context.moveTo(point.x, point.y);
          haveMoved = true;
        } else {
          context.lineTo(point.x, point.y);
        }
      }, this);
      context.closePath();
      context.stroke();
    }, this);

    /*
     * (Optional) Render Programs.
     */
    this.board.programs.forEach(function (program) {
      var haveMoved = false;
      context.strokeStyle = "#FFFF00";
      context.lineWidth = 2.0;
      context.beginPath();
      program.points.forEach(function (point) {
        if (!haveMoved) {
          context.moveTo(point.x, point.y);
          haveMoved = true;
        } else {
          context.lineTo(point.x, point.y);
        }
      }, this);
      context.closePath();
      context.stroke();
    }, this);
  }

  /*
   * Render rpgcode canvases.
   */
  var canvases = rpgcode.canvases;
  for (var property in canvases) {
    if (canvases.hasOwnProperty(property)) {
      var element = canvases[property];
      if (element.render) {
        context.drawImage(element.canvas, x, y);
      }
    }
  }
};

screenRenderer.prototype.sortSprites = function (layer, player) {
  var layerSprites = [];
  if (player.layer === layer && player.renderReady) {
    layerSprites.push(player);
  }

  this.board.sprites.forEach(function (entity) {
    var sprite = entity.sprite;
    var item = sprite.item;
    if (layer === sprite.layer && item.renderReady) {
      sprite.item.x = entity.x;
      sprite.item.y = entity.y;
      layerSprites.push(sprite.item);
    }
  });

  layerSprites.sort(function (a, b) {
    return a.y - b.y;
  });
  
  return layerSprites;
};