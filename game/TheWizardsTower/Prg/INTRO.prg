hp=5
maxhp=5
mp=4
maxmp=4
atk=1
hpotion=2
mpotion=0
ppotion=0

setimage("startscreen.png",-3,0,640,480)
wait(a)
clearbuffer()
buffer=createcanvas(640,480)
while(done==false)
{
	colorrgb(0,0,0)
	fillrect(0,0,640,480,buffer)


	colorrgb(0+tmp1,0+tmp1,0+tmp1)
	pixeltext(10,10,"For as long as the villagers can remember the wizard's tower has stood upon the",buffer)
	colorrgb(0+tmp2,0+tmp2,0+tmp2)
	pixeltext(10,30,"grey plains. A reminder to not leave the village after dark.",buffer)
	colorrgb(0+tmp3,0+tmp3,0+tmp3)
	pixeltext(10,50,"Every hundred years somebody always goes missing from the village.",buffer)
	colorrgb(0+tmp4,0+tmp4,0+tmp4)
	pixeltext(10,70,"And the hundred years is up.",buffer)
	colorrgb(0+tmp5,0+tmp5,0+tmp5)
	pixeltext(10,90,"And this time is no different, apart from the fact that the girl that is missing is the",buffer)
	colorrgb(0+tmp6,0+tmp6,0+tmp6)
	pixeltext(10,110,"sister of a knight.",buffer)
	colorrgb(0+tmp7,0+tmp7,0+tmp7)
	pixeltext(10,130,"Without delay he grabs his armour and heads to the tower.....",buffer)



	get(key)
	if (key=="ENTER"){tmp=10}//tmp1=200;tmp2=200;tmp3=200;tmp4=200;tmp5=200;tmp6=200}
	tmp=tmp+1
	if (tmp>5)
	{
		tmp=0
		if (tmp1<200){tmp1=tmp1+1}
		if (tmp1>50 and tmp2<200){tmp2=tmp2+1}
		if (tmp2>50 and tmp3<200){tmp3=tmp3+1}
		if (tmp3>50 and tmp4<200){tmp4=tmp4+1}
		if (tmp4>50 and tmp5<200){tmp5=tmp5+1}
		if (tmp5>50 and tmp6<200){tmp6=tmp6+1}
		if (tmp6>50 and tmp7<200){tmp7=tmp7+1}
	}
	if (tmp7>190){end()}
	drawcanvas(buffer,0,0)
}










