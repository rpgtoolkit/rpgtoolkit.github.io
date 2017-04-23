/* global rpgcode */
var direction = rpgcode.getCharacterDirection();
var location = rpgcode.getCharacterLocation();
var vector = {};

var callback = function () {
    var hits = rpgcode.fireRaycast({_x: location.x, _y: location.y}, vector, 40);
    hits.forEach(function (hit) {
        rpgcode.destroyItem(hit.obj.getId());
    });
    rpgcode.endProgram();
};

switch (rpgcode.getCharacterDirection()) {
    case "NORTH":
        vector = {x: 0, y: -1};
        rpgcode.animateCharacter("Hero", "ATTACK_NORTH", callback);
        break;
    case "SOUTH":
        vector = {x: 0, y: 1};
        rpgcode.animateCharacter("Hero", "ATTACK_SOUTH", callback);
        break;
    case "EAST":
        vector = {x: 1, y: 0};
        rpgcode.animateCharacter("Hero", "ATTACK_EAST", callback);
        break;
    case "WEST":
        vector = {x: -1, y: 0};
        rpgcode.animateCharacter("Hero", "ATTACK_WEST", callback);
        break;
}
