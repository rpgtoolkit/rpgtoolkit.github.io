var rpgcode = application.remote;

rpgcode.getGlobal("swordactive", function (swordactive) {
  if (swordactive) {
    rpgcode.sendToBoard("Room2.brd.json", 10, 21);
  } else {
    drawImage();
  }
  application.disconnect();
});

function drawImage() {
  var canvas = "renderNowCanvas";
  rpgcode.setImage("mwin_small.png", 100, 0, 450, 50, canvas);
  rpgcode.setImage("sword_profile_1_small.png", 0, 0, 100, 100, canvas);
  rpgcode.setColor(255, 255, 255, 1.0);
  rpgcode.drawText(105, 15, "Hey where are you going. Come back here.", canvas);
  rpgcode.renderNow(canvas);
}