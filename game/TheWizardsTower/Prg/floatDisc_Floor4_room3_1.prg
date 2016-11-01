clearbuffer()
newplayer("HeroFloatDisc.tem")
layerput(8,15, 1,"")
push("North,North,North")
get(key)
if (key=="RIGHT"){
	layerput(8,12, 1,"tileset1.tst97")
	newplayer("Hero.tem")
	push("East")
	newplayer("HeroFloatDisc.tem")
	layerput(9,12, 1,"")
	push("East,East,East,East,East,East,East")
	newplayer("Hero.tem")
	push("East")
	layerput(16,12, 1,"tileset1.tst97")
}
else{
	push("North,North,North,North")
	layerput(8,8, 1,"tileset1.tst98")
	newplayer("Hero.tem")
	push("North")
}



