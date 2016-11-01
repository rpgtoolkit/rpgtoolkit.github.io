/* global rpgcode */

rpgcode.clearDialog();

var swordActive = rpgcode.getGlobal("swordactive");
if (!swordActive) {
  rpgcode.showDialog("Pssst, Over here");
}

rpgcode.endProgram();
