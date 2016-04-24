function tileset(filename) {
  this.file = new binaryIO(filename);

  this.version = this.file.readInt16();
  this.count = this.file.readInt16();
  this.detail = this.file.readInt16();

  this.tiles = [];

  var tile, tileRow;

  // loop through tiles
  for (var i = 0; i < this.count; i++) {
    tile = [];

    // rows
    for (var x = 0; x < rpgtoolkit.tileSize; x++) {
      tileRow = [];

      // columns
      for (var y = 0; y < rpgtoolkit.tileSize; y++) {

        // store RGB value
        tileRow.push([
          this.file.readUint8(),
          this.file.readUint8(),
          this.file.readUint8()
        ]);
      }

      tile.push(tileRow);
    }

    this.tiles.push(tile);
  }
}