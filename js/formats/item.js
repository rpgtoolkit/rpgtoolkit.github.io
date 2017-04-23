/* global Sprite */

Item.prototype = Object.create(Sprite.prototype);
Item.prototype.constructor = Item;

function Item(filename) {
    console.info("Loading Item filename=[%s]", filename);
    Sprite.call(this);

    // TODO: Make the changes here that chrome suggests.
    var req = new XMLHttpRequest();
    req.open("GET", filename, false);
    req.overrideMimeType("text/plain; charset=x-user-defined");
    req.send(null);

    var item = JSON.parse(req.responseText);
    for (var property in item) {
        this[property] = item[property];
    }
    
    this.calculateCollisionPoints();
}

Item.prototype.checkCollisions = function (collision, entity) {
    console.debug("Checking collisions for Item name=[%s]", this.name);

    var object = collision.obj;
    switch (object.vectorType) {
        case "ITEM":
            entity.x += collision.normal.x;
            entity.y += collision.normal.y;
            entity.resetHitChecks();
            break;
        case "SOLID":
            entity.x += collision.normal.x;
            entity.y += collision.normal.y;
            entity.resetHitChecks();
            break;
    }
};