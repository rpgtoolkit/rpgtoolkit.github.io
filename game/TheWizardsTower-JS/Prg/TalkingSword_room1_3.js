var rpgcode = application.remote;

rpgcode.getGlobal("swordactive", function (swordactive) {
  if (!swordactive) {
    drawImage();
  }
  application.disconnect();
});

function drawImage() {
  var canvas = "renderNowCanvas";
  rpgcode.setImage("mwin_small.png", 100, 0, 450, 50, canvas);
  rpgcode.setImage("sword_profile_1_small.png", 0, 0, 100, 100, canvas);
  rpgcode.setColor(255, 255, 255, 1.0);
  rpgcode.drawText(105, 15, "Pssst, Over here", canvas);
  rpgcode.renderNow(canvas);
}

