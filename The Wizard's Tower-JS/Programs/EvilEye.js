/* global rpgcode */

// Don't run the Evil eye logic if a particular program is being run in the engine.
var programState = rpgcode.isRunningProgram();
var runLogic = true;
if (programState.inProgram && programState.currentProgram !== null) {
    if (!programState.currentProgram.includes("SwordSlash.js")) {
        console.log(programState);
        runLogic = false;
    }
}

if (runLogic) {
    // Set up the global state for this evil eye.
    var state = rpgcode.getGlobal("evil_eye-" + this.getId());
    if (state === undefined) {
        state = {
            lastHit: Date.now()
        };
        rpgcode.setGlobal("evil_eye-" + this.getId(), state);
    } else {
        // Get the player's current location on the screen.
        var player = rpgcode.getCharacterLocation(false);

        // Are we on the same layer?
        if (player.layer === this.layer) {
            // Calculate the distance to the player.
            var a = player.x - this.x;
            var b = player.y - this.y;
            var distance = Math.sqrt(a * a + b * b); // Simple Pythagora's theorem.


            if (distance < 32) { // Are we less than a 32 pixels away? (1 tile at 32x32)
                var time = Date.now();
                if (time - state.lastHit > 1500) { // Only hit the character if 1.5 seconds has elapsed since last attempt.
                    var character = rpgcode.getCharacter(); // Get the active character.

                    if (character.health > 0) {
                        character.health -= 1;
                        rpgcode.animateCharacter("Hero", "HURT_SOUTH", null);
                    } else {
                        rpgcode.runProgram("GameOver.js");
                    }

                    state = {
                        lastHit: time
                    };
                    rpgcode.setGlobal("evil_eye-" + this.getId(), state);
                }
            } else if (distance < 160) { // Are we less than 160 pixels away? (5 tiles at 32x32)
                // Get the angle between us and the player in degrees.
                var dx = player.x - this.x;
                var dy = player.y - this.y;
                var angle = Math.atan2(dy, dx);

                // The change in (x, y) we want per call.
                var velocity = 1.25;

                // Calculate a shift in our (x, y) that will bring us closer.
                var velocityX = velocity * Math.cos(angle);
                var velocityY = velocity * Math.sin(angle);

                // Move towards the player for 50 milliseconds.
                rpgcode.moveSpriteTo(this.getId(), this.x + velocityX, this.y + velocityY, 50);
            }
        }
    }
}