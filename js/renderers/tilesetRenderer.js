function tilesetRenderer(tileset) {
  this.tileset = tileset;

  this.size = {
    x: this.tileset.count * 32,
    y: 32
  };
}

tilesetRenderer.prototype.render = function (cnv) {
  var cnv = cnv || document.createElement("canvas");

  cnv.width = this.size.x;
  cnv.height = this.size.y;

  var context = cnv.getContext("2d");

  var offset = {
    x: 0,
    y: 0
  };

  // render each tile
  for (var i = 0; i < this.tileset.count; i++) {
    this.renderTile(context, i, offset.x, offset.y);

    offset.x += 32;
    if ((offset.x + 32) > this.size.x) {
      offset.x = 0;
      offset.y += 32;
    }
  }

  return cnv;
};

tilesetRenderer.prototype.renderTile = function (context, tileIndex, offsetX, offsetY) {
  var tile = this.tileset.tiles[tileIndex];

  if (tile) {
    // grab pixel data for that specific tile
    var image = context.getImageData(offsetX, offsetY, 32, 32);
    var pixels = image.data;

    var pixelOffset = 0;

    // assign RBGA values for each pixel
    for (var y = 0; y < 32; y++) {
      for (var x = 0; x < 32; x++) {
        pixels[pixelOffset] = tile[x][y][0];
        pixels[pixelOffset + 1] = tile[x][y][1];
        pixels[pixelOffset + 2] = tile[x][y][2];
        pixels[pixelOffset + 3] = 255;
        pixelOffset += 4;
      }
    }

    context.putImageData(image, offsetX, offsetY);
  }
};