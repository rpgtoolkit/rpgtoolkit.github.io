function tilesetRenderer(tileset) {
  this.tileset = tileset;

  this.size = {
    x: this.tileset.count * rpgtoolkit.tileSize,
    y: rpgtoolkit.tileSize
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

    offset.x += rpgtoolkit.tileSize;
    if ((offset.x + rpgtoolkit.tileSize) > this.size.x) {
      offset.x = 0;
      offset.y += rpgtoolkit.tileSize;
    }
  }

  return cnv;
};

tilesetRenderer.prototype.renderTile = function (context, tileIndex, offsetX, offsetY) {
  var tile = this.tileset.tiles[tileIndex];

  if (tile) {
    // grab pixel data for that specific tile
    var image = context.getImageData(offsetX, offsetY, rpgtoolkit.tileSize, rpgtoolkit.tileSize);
    var pixels = image.data;

    var pixelOffset = 0;

    // assign RBGA values for each pixel
    for (var y = 0; y < rpgtoolkit.tileSize; y++) {
      for (var x = 0; x < rpgtoolkit.tileSize; x++) {
        var rgba = {r: tile[x][y][0], g: tile[x][y][1], b: tile[x][y][2]};
        
        // Deal with the magenta in the tilesets.
        rgba.a = rgba.r === 255 && rgba.g === 0 && rgba.b === 255 ? 0 : 255;
        
        pixels[pixelOffset] = rgba.r;
        pixels[pixelOffset + 1] = rgba.g;
        pixels[pixelOffset + 2] = rgba.b;
        pixels[pixelOffset + 3] = rgba.a;
        pixelOffset += 4;
      }
    }

    context.putImageData(image, offsetX, offsetY);
  }
};