playerlocation("Hero",px,py,z)

getboardtile(px,py,z,tilename)
if (tilename=="tileset1.tst99"){layerput(px,py,1,"tileset1.tst100")}
elseif (tilename=="tileset1.tst100"){
	tmpx=8
	tmpy=8
	done=false
	while(done==false){
		getboardtile(tmpx,tmpy,1,tilename)
		if (tilename=="tileset1.tst100"){layerput(tmpx,tmpy,1,"tileset1.tst99")}
		tmpx=tmpx+1
		if (tmpx==13){tmpx=8;tmpy=tmpy+1}
		if (tmpy==13){done=true}
	}


//layerput(px,py,1,"tileset1.tst99")
}





