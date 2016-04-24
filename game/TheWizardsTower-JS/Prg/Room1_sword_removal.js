// Removes the sword from the board if the player already has it
var rpgcode = application.remote;
rpgcode.getGlobal("swordactive", function (swordactive) {
  if (swordactive) {
    rpgcode.replaceTile(12, 12, 1,"tileset1.tst82");
    rpgcode.replaceTile(13, 12, 1,"tileset1.tst83");
    rpgcode.replaceTile(12, 11, 2,"");
    rpgcode.replaceTile(13, 11, 2,"");
  }
  application.disconnect();
});
