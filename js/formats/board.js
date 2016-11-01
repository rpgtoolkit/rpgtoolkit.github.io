function board(filename) {
  // TODO: Make the changes here that chrome suggests.
  var req = new XMLHttpRequest();
  req.open("GET", filename, false);
  req.overrideMimeType("text/plain; charset=x-user-defined");
  req.send(null);

  var board = JSON.parse(req.responseText);
  board.tiles = [];
  board.layerCache = [];
  board.filename = filename;

  var skipTiles = 0, tileIndex = 0;

  // loop through layers
  for (var layer = 0; layer < board.layerCount; layer++) {
    var currentLayer = [];

    // y axis
    for (var y = 0; y < board.height; y++) {
      var currentColumn = [];

      // x axis
      for (var x = 0; x < board.width; x++) {

        // if still repeating for X tiles
        if (skipTiles > 0) {
          skipTiles -= 1;
          currentColumn.push(tileIndex);
        } else {
          // get tile
          tileIndex = board.tileIndex.shift();

          // if tile is less than -X, means we're repeating the next tile for (-X) -1
          if (tileIndex < 0) {
            skipTiles = (-tileIndex) - 1;

            // get tile to be repeated
            tileIndex = board.tileIndex.shift();
          }

          currentColumn.push(tileIndex);
        }
      }

      currentLayer.push(currentColumn);
    }

    board.tiles.push(currentLayer);
  }
  
  board.generateLayerCache = this.generateLayerCache;
  board.getTileData = this.getTileData;
  return board;
};

board.prototype.generateLayerCache = function () {
  var cnvLayer, context, layer, row, tile, source, data, renderer;
  this.layerCache = [];

  // Loop through layers.
  for (var i = 0; i < this.layerCount; i++) {
    cnvLayer = document.createElement("canvas");
    cnvLayer.width = this.width * rpgtoolkit.tileSize;
    cnvLayer.height = this.height * rpgtoolkit.tileSize;
    context = cnvLayer.getContext("2d");
    layer = this.tiles[i];

    /*
     * Step 1: Render this layer's tiles. 
     */
    // y axis
    for (var y = 0; y < layer.length; y++) {
      row = layer[y];

      // x axis
      for (var x = 0; x < row.length; x++) {
        tile = row[x] - 1;

        if (tile > -1) {
          source = this.tileNames[tile];

          if (source) {
            // extract data (filename and index)
            data = this.getTileData(source);

            // load tileset
            if (rpgtoolkit.tilesets[data.tileset] === undefined) {
              rpgtoolkit.tilesets[data.tileset] = new tileset(PATH_TILESET + data.tileset);
            }

            renderer = new tilesetRenderer(rpgtoolkit.tilesets[data.tileset]);

            // render tile to board canvas
            renderer.renderTile(context, data["tile"] - 1, x * rpgtoolkit.tileSize, y * rpgtoolkit.tileSize);
          }
        }
      }
    }

    this.layerCache.push(cnvLayer);
  }
};

board.prototype.getTileData = function (source) {
  var splitPoint = source.indexOf(".tst") + 4;
  return {
    tileset: source.substring(0, splitPoint),
    tile: source.substring(splitPoint)
  };
};
  