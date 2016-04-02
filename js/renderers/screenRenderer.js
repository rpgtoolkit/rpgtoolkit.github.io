function screenRenderer() {
  
}

screenRenderer.prototype.render = function (context) {
  this.board = currentBoard;
  
  // Draw a black background.  
  context.fillStyle = "#000000";
  context.fillRect(0, 0, currentBoard.width * 32, currentBoard.height * 32);
  
  if (!this.board.layerCache.length) {
    this.board.generateLayerCache();
  }

  var layer, row, tile, source, data, renderer;

  // Loop through layers.
  for (var i = 0; i < this.board.layerCount; i++) {
    layer = this.board.tiles[i];

    /*
     * Step 1: Render this layer. 
     */
    context.drawImage(this.board.layerCache[i], 0, 0);

    /*
     * Step 2: Render items.
     */
    // TODO: render any items on this layer.

    /*
     * Step 3: Render npcs.
     */
    // TODO: render any npcs on this layer.

    /*
     * Step 4: Render the player above everything on this layer.
     */
    // TODO: if the player is on this layer render them now.
    if (currentPlayer.player.layer === i && currentPlayer.player.renderReady) {
      var frame = Crafty.assets[currentPlayer.player.graphics.active.frames[currentPlayer.player.graphics.frameIndex]];
      context.drawImage(
              frame,
              currentPlayer.x - (frame.width / 2),
              currentPlayer.y - (frame.height / 2),
              currentPlayer.player.graphics.active.animationWidth,
              currentPlayer.player.graphics.active.animationHeight);

      // Draw player collision rectangle.
      context.beginPath();
      context.lineWidth="2";
      context.strokeStyle="#FFFFFF";
      context.rect(
              currentPlayer.x - 20,
              currentPlayer.y + 10,
              currentPlayer.player.graphics.active.boundingBox.width,
              currentPlayer.player.graphics.active.boundingBox.height);
      context.stroke();
    }
  }

  /*
   * Step 5: (Optional) Render Vectors.
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
   * Step 6: (Optional) Render Programs.
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
};