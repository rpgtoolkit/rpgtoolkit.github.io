while (true){
	if (timer==0){tmp=random(100);clear(cnvRenderNow)}
	if (tmp>595 and timer==0){
		setimage("mwin_small.png",100,0,540,50,cnvRenderNow)
		setimage("sword_profile_1_small.png",0,0,100,100,cnvRenderNow)
		colorrgb(255,255,255)
		tmp=random(5)
		if (tmp==1){pixeltext(120,10,"Can we kill something now?",cnvRenderNow)}
		if (tmp==2){pixeltext(120,10,"You know whats fun?....Killing things!",cnvRenderNow)}
		if (tmp==3){pixeltext(120,10,"I'm bored, lets kill something.",cnvRenderNow)}
		if (tmp==4){pixeltext(120,10,"I'm sharp and pointy, lets go poke somebody.",cnvRenderNow)}
		if (tmp==5){pixeltext(120,10,"I could really kill sombody.",cnvRenderNow)}
		Rendernow(cnvRenderNow)
		timer=50
	}
	if (timer>0){timer=timer-1}
}



