/* global rpgcode */

rpgcode.clearDialog();

var swordActive = rpgcode.getGlobal("swordactive");
if (swordActive) {
  rpgcode.sendToBoard("Room2.brd.json", 10, 21);
} else {
  rpgcode.showDialog("Hey where are you going. Come back here.");
}

rpgcode.endProgram();