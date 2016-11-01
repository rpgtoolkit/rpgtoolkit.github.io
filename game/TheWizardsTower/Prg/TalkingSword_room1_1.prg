if (swordactive==false){
	setimage("mwin_small.png",100,0,450,50,cnvRenderNow)
	setimage("sword_profile_1_small.png",0,0,100,100,cnvRenderNow)
	colorrgb(255,255,255)
	pixeltext(105,10,"Hey where are you going. Come back here.",cnvRenderNow)
	Rendernow(cnvRenderNow)
}

if (swordactive==true){
	send("room2.brd",11,21)
}