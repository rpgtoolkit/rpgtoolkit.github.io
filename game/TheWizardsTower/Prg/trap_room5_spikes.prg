//this program changes the tiles on the board to be spikes or holes according to the timer "tmp"
while(true)
{
	tmpspike=tmpspike+1
	if (tmpspike==120){
		layerput(15, 7, 1,"tileset1.tst49")
		layerput(15, 8, 1,"tileset1.tst47")
		layerput(15, 9, 1,"tileset1.tst47")
		layerput(14, 7, 1,"tileset1.tst49")
		layerput(14, 8, 1,"tileset1.tst47")
		layerput(14, 9, 1,"tileset1.tst47")
		layerput(13, 7, 1,"tileset1.tst49")
		layerput(13, 8, 1,"tileset1.tst47")
		layerput(13, 9, 1,"tileset1.tst47")
	}
	if (tmpspike==240){
		layerput(15, 7, 1,"tileset1.tst48")
		layerput(15, 8, 1,"tileset1.tst46")
		layerput(15, 9, 1,"tileset1.tst46")
		layerput(14, 7, 1,"tileset1.tst48")
		layerput(14, 8, 1,"tileset1.tst46")
		layerput(14, 9, 1,"tileset1.tst46")
		layerput(13, 7, 1,"tileset1.tst48")
		layerput(13, 8, 1,"tileset1.tst46")
		layerput(13, 9, 1,"tileset1.tst46")
		tmpspike=0
	}
}







