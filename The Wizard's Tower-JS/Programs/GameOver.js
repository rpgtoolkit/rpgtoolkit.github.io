/* global rpgcode */

var assets = {
  "images": ["GameOver.png"]
};

var gameOverCanvas = "gameOverCanvas";

rpgcode.loadAssets(assets, function() {
  rpgcode.createCanvas(640, 480, gameOverCanvas);
  rpgcode.setImage("GameOver.png", 0, 0, 640, 480, gameOverCanvas);
  rpgcode.renderNow(gameOverCanvas);

  rpgcode.delay(5000, function() {
    rpgcode.restart();
  });
}); 