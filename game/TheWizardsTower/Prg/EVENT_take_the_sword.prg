//This is a very cheap way of doing a scene
//check the bitmap folder and see the images 
//named shot1 to shot11 to see what I mean
//You will notice that I change the tiles where the sword is(for obvious reasons) 


if (swordactive==false){
	setimage("mwin_small.png",100,0,450,50)
	setimage("sword_profile_1_small.png",0,0,100,100)
	colorrgb(255,255,255)
	pixeltext(105,10,"NOW TAKE MY POWER")
	Delay(2)
	playerLocation("Hero", px, py, z)
	if (px==12){push("East")}
	layerput(12,12,1,"tileset1.tst82")
	layerput(13,12,1,"tileset1.tst83")
	layerput(12,11,2,"")
	layerput(13,11,2,"")
	setimage("shot1.png",0,0,637,477)
	delay(.1)
	setimage("shot2.png",0,0,637,477)
	delay(.1)
	setimage("shot3.png",0,0,637,477)
	delay(.1)
	setimage("shot4.png",0,0,637,477)
	delay(.1)
	setimage("shot5.png",0,0,637,477)
	delay(.1)
	setimage("shot6.png",0,0,637,477)
	delay(.1)
	setimage("shot7.png",0,0,637,477)
	delay(.1)
	setimage("shot8.png",0,0,637,477)
	delay(.1)
	setimage("shot9.png",0,0,637,477)
	delay(.1)
	setimage("shot10.png",0,0,637,477)
	delay(.1)
	setimage("shot11.png",0,0,637,477)
	delay(1)
	swordactive=true

	setimage("mwin_small.png",100,0,450,50)
	setimage("sword_profile_1_small.png",0,0,100,100)
	colorrgb(255,255,255)
	pixeltext(105,7,"I have been here for so many years, cursed by that wizard")
	pixeltext(105,25,"to live in the form of a sword.")
	Delay(4)
	setimage("mwin_small.png",100,0,450,50)
	setimage("sword_profile_1_small.png",0,0,100,100)
	colorrgb(255,255,255)
	pixeltext(105,10,"Let's go kill a wizard. I need my revenge.")
	Delay(3)

}











