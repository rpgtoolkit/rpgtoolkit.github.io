
complete=true
tmpx=8
tmpy=8
done=false
while(done==false){
	getboardtile(tmpx,tmpy,1,tilename)
	if (tilename=="tileset1.tst99"){complete=false}
	tmpx=tmpx+1
	if (tmpx==13){tmpx=8;tmpy=tmpy+1}
	if (tmpy==13){done=true}
}


if (complete==true){send("floor4_room3.brd",10,19)}
