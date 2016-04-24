function keyboard() {
  this.downHandlers = {};
  this.upHandlers = {};
  this.entity = Crafty.e()
          .bind("KeyDown", function (e) {
            var handler = rpgtoolkit.keyboardHandler.downHandlers[e.keyCode];
            if (handler) {
              handler();
            }
          })
          .bind("KeyUp", function (e) {
            var handler = rpgtoolkit.keyboardHandler.upHandlers[e.keyCode];
            if (handler) {
              handler();
            }
          });
}


