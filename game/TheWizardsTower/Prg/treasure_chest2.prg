//this is the program that runs when the chest is activated by pressing the activation key next to it
//this code destroys the closed chest item and creates the open chest item at the same location
//it also changes the key2 variable to true and puts a message window on the screen
key2=true
destroyitem(0)
createitem("chest_west_open.itm",pos)
putitem(pos,18,9,1)

setimage("mwin_small.png",60,420,450,50,cnvRenderNow)
colorrgb(255,255,255)
pixeltext(115,430,"Found Right Key",cnvRenderNow)
Rendernow(cnvRenderNow)
timer=10


