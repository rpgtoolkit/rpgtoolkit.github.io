var rpgcode = application.remote;

rpgcode.getPlayerDirection(function(direction) {
  rpgcode.pushItem("source", direction);
  application.disconnect();
});