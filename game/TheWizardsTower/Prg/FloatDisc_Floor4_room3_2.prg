clearbuffer()
newplayer("HeroFloatDisc.tem")
layerput(8,8, 1,"tileset1.tst94")
push("South,South,South,South")
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
	push("South,South,South")
	newplayer("Hero.tem")
	push("South")
	layerput(8,15, 1,"tileset1.tst97")
}



