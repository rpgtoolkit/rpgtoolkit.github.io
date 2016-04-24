//This is a very cheap way of doing a scene
//check the bitmap folder and see the images 
//named shot1 to shot11 to see what I mean
//You will notice that I change the tiles where the sword is(for obvious reasons) 
var rpgcode = application.remote;
var canvas = undefined;
var assets = undefined;
var delay = 250;
rpgcode.getGlobal("swordactive", function (swordactive) {
  if (!swordactive) {
    assets = {"images":
              [
                "shot1.png",
                "shot2.png",
                "shot3.png",
                "shot4.png",
                "shot5.png",
                "shot6.png",
                "shot7.png",
                "shot8.png",
                "shot9.png",
                "shot10.png",
                "shot11.png"
              ]};
    rpgcode.loadAssets(assets, function () {
      canvas = "renderNowCanvas";
      rpgcode.setImage("mwin_small.png", 100, 0, 450, 50, canvas);
      rpgcode.setImage("sword_profile_1_small.png", 0, 0, 100, 100, canvas);
      rpgcode.setColor(255, 255, 255, 1.0);
      rpgcode.drawText(105, 15, "NOW TAKE MY POWER", canvas);
      rpgcode.renderNow(canvas);
      rpgcode.delay(2000, part2);
    });
  } else {
    application.disconnect();
  }
});

function part1() {
  rpgcode.getPlayerLocation(part2);
}

function part2(x, y, layer) {
  if (x === 12) {
    rpgcode.pushPlayer("EAST");
  }
 
  rpgcode.replaceTile(11, 11, 0, "tileset1.tst82");
  rpgcode.replaceTile(12, 11, 0, "tileset1.tst83");
  rpgcode.replaceTile(11, 10, 1, "");
  rpgcode.replaceTile(12, 10, 1, "");

  rpgcode.delay(delay, animate);
}

function animate() {
  var image = assets.images.shift();
  rpgcode.setImage(image, 0, 0, 640, 480, canvas);
  rpgcode.renderNow(canvas);

  if (assets.images.length) {
    rpgcode.delay(delay, animate);
  } else {
    rpgcode.delay(delay, part4);
  }
}

function part4() {
  rpgcode.setGlobal("swordactive", true);

  rpgcode.setImage("mwin_small.png", 100, 0, 450, 50, canvas);
  rpgcode.setImage("sword_profile_1_small.png", 0, 0, 100, 100, canvas);
  rpgcode.setColor(255, 255, 255, 1.0);
  rpgcode.drawText(105, 15, "I have been here for so many years, cursed by that wizard", canvas);
  rpgcode.drawText(105, 30, "to live in the form of a sword.", canvas);
  rpgcode.renderNow(canvas);
  rpgcode.delay(4000, part5);
}

function part5() {
  rpgcode.setImage("mwin_small.png", 100, 0, 450, 50, canvas);
  rpgcode.setImage("sword_profile_1_small.png", 0, 0, 100, 100, canvas);
  rpgcode.setColor(255, 255, 255, 1.0);
  rpgcode.drawText(105, 15, "Let's go kill a wizard. I need my revenge.", canvas);
  rpgcode.renderNow(canvas);
  rpgcode.delay(3000, finish);
}

function finish() {
  rpgcode.clearCanvas(canvas);
  rpgcode.removeAssets(assets); // Clean up any loaded assets!
  application.disconnect();
}










