var rpgcode = application.remote;

var canvas = "renderNowCanvas";
rpgcode.setImage("mwin_small.png", 100, 0, 450, 50, canvas);
rpgcode.setImage("sword_profile_1_small.png", 0, 0, 100, 100, canvas);
rpgcode.setColor(255, 255, 255, 1.0);
rpgcode.drawText(105, 15, "You look like a strong guy. Push those blocks out of our way", canvas);
rpgcode.renderNow(canvas);

application.disconnect();

