// Encapsulate this code to avoid namespace conflicts.
// see: https://www.zendesk.com/blog/keep-javascript-libraries-from-colliding/
(function () {
  var img = new Image();
  img.src = "../game/TheWizardsTower-JS/Bitmap/startscreen.png";
  img.onload = introLoaded;

  /**
   * Called when the background image has finished loading into memory.
   * 
   * @returns {undefined}
   */
  function introLoaded() {
    context = canvas.getContext("2d");
    context.drawImage(img, 0, 0, 640, 480);

    document.body.addEventListener("keydown", showIntro, false);
  }

  /**
   * Triggered after the player has "Pressed Any Key" on the intro screen.
   * 
   * @param {type} event
   * @returns {undefined}
   */
  function showIntro(event) {
    // IMPORTANT: Remember to remove any custom key listeners!
    // TODO: expand framework to allow listeners for specific keys.
    document.body.removeEventListener("keydown", showIntro, false);

    // TODO: Make this canvas clearing part of the framework.
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // FYI: https://en.wikibooks.org/wiki/Data_Structures/Stacks_and_Queues
    var messageStack = new Array();
    messageStack.push("Without delay he grabs his armour and heads to the tower.....");
    messageStack.push("sister of a knight.");
    messageStack.push("And this time is no different, apart from the fact that the girl that is missing is the");
    messageStack.push("And the hundred years is up.");
    messageStack.push("Every hundred years somebody always goes missing from the village.");
    messageStack.push("grey plains. A reminder to not leave the village after dark.");
    messageStack.push("For as long as the villagers can remember the wizard's tower has stood upon the");

    fadeIn(messageStack, 20, 20);
  }

  /**
   * TODO: this fadeIn is actually just writing over itself!
   * 
   * @param {type} messageStack
   * @param {type} x
   * @param {type} y
   * @returns {undefined}
   */
  function fadeIn(messageStack, x, y) {
    var alpha = 0.0;
    var message = messageStack.pop();
    var interval = setInterval(function () {
      context.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
      context.font = "16px Georgia";
      context.fillText(message, x, y);
      alpha = alpha + 0.05;
      if (alpha >= 0.9) {
        clearInterval(interval);

        if (messageStack.length > 0) {
          fadeIn(messageStack, x, y + 20);
        } else {
          start(); // Start the main game loop.
        }
      }
    }, 150);
  }
})();
