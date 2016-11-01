clearbuffer()
newplayer("HeroFloatDisc.tem")
layerput(16,12, 1,"")
push("West,West,West,West,West,West,West")
layerput(9,12, 1,"tileset1.tst97")
newplayer("Hero.tem")
push("West")
newplayer("HeroFloatDisc.tem")
layerput(8,12, 1,"")
get(key)
if (key=="DOWN"){
	push("South,South,South")
	layerput(8,15, 1,"tileset1.tst97")
	newplayer("Hero.tem")
	push("South")
}
else{
	push("North,North,North,North")
	layerput(8,8, 1,"tileset1.tst98")
	newplayer("Hero.tem")
	push("North")
}



