/* global PATH_BITMAP */

function TileSet(filename) {
    console.info("Loading Tileset filename=[%s]", filename);
    
    // TODO: Make the changes here that chrome suggests.
    var req = new XMLHttpRequest();
    req.open("GET", filename, false);
    req.overrideMimeType("text/plain; charset=x-user-defined");
    req.send(null);

    var tileSet = JSON.parse(req.responseText);
    for (var property in tileSet) {
        this[property] = tileSet[property];
    }
}

TileSet.prototype.setReady = function () {
    console.info("Setting ready TileSet name=[%s]", this.name);
    
    this.img = Crafty.assets[Crafty.__paths.images + this.images[0]];

    this.tileRows = Math.floor(this.img.height / this.tileHeight);
    this.tileColumns = Math.floor(this.img.width / this.tileWidth);
    this.count = this.tileRows * this.tileColumns;

    this.canvas = document.createElement("canvas");
    this.canvas.width = this.img.width;
    this.canvas.height = this.img.height;

    this.ctx = this.canvas.getContext("2d");
    this.ctx.drawImage(this.img, 0, 0);
};

TileSet.prototype.getTile = function (index) {
    // Converted 1D index to 2D cooridnates.
    var x = index % this.tileColumns;
    var y = Math.floor(index / this.tileColumns);

    var tile = this.ctx.getImageData(
            x * this.tileWidth, y * this.tileHeight,
            this.tileWidth, this.tileHeight);

    return tile;
};