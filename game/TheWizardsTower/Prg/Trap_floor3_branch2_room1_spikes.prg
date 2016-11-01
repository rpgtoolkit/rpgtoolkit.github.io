//this program changes the tiles on the board to be spikes or holes according to the timer "tmp"
while(true)
{
	tmpspike=tmpspike+1
	if (tmpspike==10){
		layerput(9, 9, 1,"tileset1.tst47")
		layerput(10, 9, 1,"tileset1.tst47")
		layerput(11, 9, 1,"tileset1.tst47")
		layerput(12, 9, 1,"tileset1.tst47")
		layerput(9, 10, 1,"tileset1.tst47")
		layerput(10,10, 1,"tileset1.tst47")
		layerput(11,10, 1,"tileset1.tst47")
		layerput(12,10, 1,"tileset1.tst47")
		layerput(9 ,11, 1,"tileset1.tst47")
		layerput(10,11, 1,"tileset1.tst47")
		layerput(11,11, 1,"tileset1.tst47")
		layerput(12,11, 1,"tileset1.tst47")
	}
	if (tmpspike==20){
		layerput(9, 9, 1,"tileset1.tst46")
		layerput(10, 9, 1,"tileset1.tst46")
		layerput(11, 9, 1,"tileset1.tst46")
		layerput(12, 9, 1,"tileset1.tst46")
		layerput(9, 10, 1,"tileset1.tst46")
		layerput(10,10, 1,"tileset1.tst46")
		layerput(11,10, 1,"tileset1.tst46")
		layerput(12,10, 1,"tileset1.tst46")
		layerput(9 ,11, 1,"tileset1.tst46")
		layerput(10,11, 1,"tileset1.tst46")
		layerput(11,11, 1,"tileset1.tst46")
		layerput(12,11, 1,"tileset1.tst46")
		tmpspike=0
	}
}






