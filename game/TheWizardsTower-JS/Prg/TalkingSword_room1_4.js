var rpgcode = application.remote;

rpgcode.getGlobal("swordactive", function (swordactive) {
  if (!swordactive) {
    var assets = {"images": ["mwin_small.png", "sword_profile_1_small.png"]};
    rpgcode.loadAssets(assets, drawImage);;
  } else {
    application.disconnect();
  }
});

function drawImage() {
  var canvas = "renderNowCanvas";
  rpgcode.setImage("mwin_small.png", 100, 0, 450, 50, canvas);
  rpgcode.setImage("sword_profile_1_small.png", 0, 0, 100, 100, canvas);
  rpgcode.setColor(255, 255, 255, 1.0);
  rpgcode.drawText(105, 15, "You will need my power to defeat the wizard", canvas);
  rpgcode.renderNow(canvas);
  application.disconnect();
}

