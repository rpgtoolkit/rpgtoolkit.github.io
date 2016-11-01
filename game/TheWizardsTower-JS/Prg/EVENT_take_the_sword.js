/* global rpgcode */

//This is a very cheap way of doing a scene
//check the bitmap folder and see the images 
//named shot1 to shot11 to see what I mean
//You will notice that I change the tiles where the sword is(for obvious reasons) 
var canvas = undefined;
var assets = undefined;
var delay = 250;

var swordActive = rpgcode.getGlobal("swordActive");
if (!swordActive) {
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
    rpgcode.showDialog("NOW TAKE MY POWER");
    rpgcode.delay(2000, part1);
  });
} else {
  rpgcode.endProgram();
}

function part1(x) {
  rpgcode.clearDialog();

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
  rpgcode.showDialog("I have been here for so many years, cursed by that wizard");
  rpgcode.showDialog("to live in the form of a sword.");
  rpgcode.delay(4000, part5);
}

function part5() {
  rpgcode.showDialog("Let's go kill a wizard. I need my revenge.");
  rpgcode.delay(3000, finish);
}

function finish() {
  rpgcode.clearDialog();
  rpgcode.removeAssets(assets); // Clean up any loaded assets!
  rpgcode.endProgram();
}