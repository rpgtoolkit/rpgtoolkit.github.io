//this is the code to stop the character from warping if he doesnt have the 2 keys from this floor
//and to warp him to the next board if he has both keys


if (key1==false or key2==false){setimage("mwin_small.png",60,420,450,50,cnvRenderNow)}
colorrgb(255,255,255)

if(key1==false and key2==false){pixeltext(115,430,"I need two keys to open this door",cnvRenderNow)}
if(key1==true and key2==false){pixeltext(115,430,"I need another key to open this door",cnvRenderNow)}
if(key1==false and key2==true){pixeltext(115,430,"I need another key to open this door",cnvRenderNow)}
//if(key1==true and key2==true){pixeltext(115,430,"opened",cnvRenderNow)}
Rendernow(cnvRenderNow)
timer=10
if(key1==true and key2==true){send("room8.brd",10,22,1)}






