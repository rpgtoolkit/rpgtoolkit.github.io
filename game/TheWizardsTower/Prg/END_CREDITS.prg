tmp=0
for(tmp=1;tmp<322;tmp++)
{
	colorrgb(0,0,0)
	fillrect(0,0,tmp,480)
	fillrect(640-tmp,0,640,480)
	delay(.01)
}

setimage("mwin_small.png",100,0,450,50)
setimage("sword_profile_1_small.png",0,0,100,100)
colorrgb(255,255,255)
pixeltext(105,10,"Congratulations on completing the Wizards Tower")
pixeltext(105,30,"")
delay(4)

setimage("mwin_small.png",100,0,450,50)
setimage("sword_profile_1_small.png",0,0,100,100)
colorrgb(255,255,255)
pixeltext(105,10,"All graphics and coding done by Grindalf")
pixeltext(105,30,"")
delay(4)

setimage("mwin_small.png",100,0,450,50)
setimage("sword_profile_1_small.png",0,0,100,100)
colorrgb(255,255,255)
pixeltext(105,10,"Game tested by nyttimangus, Hex, Val and rikurocks")
pixeltext(105,30,"")
delay(4)

setimage("mwin_small.png",100,0,450,50)
setimage("sword_profile_1_small.png",0,0,100,100)
colorrgb(255,255,255)
pixeltext(105,10,"Sorry to the author of the music but I could not find")
pixeltext(105,30,"out who you was.")
delay(4)

setimage("mwin_small.png",100,0,450,50)
setimage("sword_profile_1_small.png",0,0,100,100)
colorrgb(255,255,255)
pixeltext(105,10,"Special thanks to swordmaster for asking me to make this")
pixeltext(105,30,"game and putting up for how long it took.")
delay(4)

setimage("mwin_small.png",100,0,450,50)
setimage("sword_profile_1_small.png",0,0,100,100)
colorrgb(255,255,255)
pixeltext(105,10,"And of course for his work on bringing us 3.2.1 of the")
pixeltext(105,30,"RPGTOOLKIT")
delay(4)

setimage("mwin_small.png",100,0,450,50)
setimage("sword_profile_1_small.png",0,0,100,100)
colorrgb(255,255,255)
pixeltext(105,10,"Thanks for playing.")
pixeltext(105,30,"")
delay(4)

setimage("go.png",0,0,640,480)
wait(a)
windows()

