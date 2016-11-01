menu_bg=createcanvas(640,480)
empty_tile=createcanvas(100,100)
ice_orb=createcanvas(100,100)
fire_orb=createcanvas(100,100)
lightning_orb=createcanvas(100,100)
time_orb=createcanvas(100,100)
earth_orb=createcanvas(100,100)
strength_orb=createcanvas(100,100)
cure_orb=createcanvas(100,100)
pure_orb=createcanvas(100,100)
health_potion=createcanvas(100,100)
mana_potion=createcanvas(100,100)
pure_potion=createcanvas(100,100)
life_icon=createcanvas(32,32)
mana_icon=createcanvas(32,32)
emptylife_icon=createcanvas(32,32)
emptymana_icon=createcanvas(32,32)
sword_icon=createcanvas(100,100)

herostance=createcanvas(223,374)
selected_box=createcanvas(100,100)
hpotion_description=createcanvas(210,100)
mpotion_description=createcanvas(210,100)
epotion_description=createcanvas(210,100)
sword_description=createcanvas(210,100)
fireorb_description=createcanvas(210,100)
iceorb_description=createcanvas(210,100)
litorb_description=createcanvas(210,100)
timeorb_description=createcanvas(210,100)
cureorb_description=createcanvas(210,100)
pureorb_description=createcanvas(210,100)
strengthorb_description=createcanvas(210,100)
defenceorb_description=createcanvas(210,100)


setimage("menu_bg.png",0,0,640,480,menu_bg)
setimage("item_box.png",0,0,100,100,empty_tile)
setimage("fire_orb.png",0,0,100,100,fire_orb)
setimage("ice_orb.png",0,0,100,100,ice_orb)
setimage("lightning_orb.png",0,0,100,100,lightning_orb)
setimage("time_orb.png",0,0,100,100,time_orb)
setimage("earth_orb.png",0,0,100,100,earth_orb)
setimage("cure_orb.png",0,0,100,100,cure_orb)
setimage("pure_orb.png",0,0,100,100,pure_orb)
setimage("strength_orb.png",0,0,100,100,strength_orb)
setimage("health_potion.png",0,0,100,100,health_potion)
setimage("mana_potion.png",0,0,100,100,mana_potion)
setimage("pure_potion.png",0,0,100,100,pure_potion)
setimage("life.png",0,0,32,32,life_icon)
setimage("manasphere.png",0,0,32,32,mana_icon)
setimage("emptylife.png",0,0,32,32,emptylife_icon)
setimage("emptymana.png",0,0,32,32,emptymana_icon)
setimage("herostance.png",0,0,223,374,herostance)
setimage("item_box_selection.png",0,0,100,100,selected_box)
setimage("hpotion_descr_box.png",0,0,210,100,hpotion_description)
setimage("mpotion_descr_box.png",0,0,210,100,mpotion_description)
setimage("epotion_descr_box.png",0,0,210,100,epotion_description)
setimage("sword_descr_box.png",0,0,210,100,sword_description)
setimage("fireorb_descr_box.png",0,0,210,100,fireorb_description)
setimage("iceorb_descr_box.png",0,0,210,100,iceorb_description)
setimage("litorb_descr_box.png",0,0,210,100,litorb_description)
setimage("timeorb_descr_box.png",0,0,210,100,timeorb_description)
setimage("cureorb_descr_box.png",0,0,210,100,cureorb_description)
setimage("pureorb_descr_box.png",0,0,210,100,pureorb_description)
setimage("strengthorb_descr_box.png",0,0,210,100,strengthorb_description)
setimage("defenceorb_descr_box.png",0,0,210,100,defenceorb_description)
setimage("sword_item_box.png",0,0,100,100,sword_icon)
//tmp testing variables
//hpotion=3
//mpotion=3
//ppotion=3
if (swordactive==true){fireorb=true}
//iceorb=true
//hp=2
//mp=3
//maxhp=6
//maxmp=5
//lightningorb=true
//timeorb=true
//cureorb=true
//pureorb=true
//strengthorb=true
earthorb=true
cho=1
buffer=createcanvas(640,480)
clearbuffer()
done=false
//===========================================================MAIN LOOP======================================================
while (done==false){
	drawcanvas(menu_bg,0,0,640,480,buffer)
	
	get(key)
	if (key=="UP"){cho=cho-3;key=0}
	if (key=="DOWN"){cho=cho+3;key=0}
	if (key=="RIGHT"){cho=cho+1;key=0}
	if (key=="LEFT"){cho=cho-1;key=0}
	if (cho<1){cho=1}
	if (cho>12){cho=12}
	clearbuffer()
	//--sword_slot
	drawcanvas(empty_tile,25,25,100,100,buffer)
	if (swordactive==true){drawcanvas(sword_icon,25,25,100,100,buffer)}
	if (cho==1){drawcanvastransparent(selected_box,25,25,255,0,255,100,100,buffer)}

	//--health potion slot
	if (Hpotion==0){drawcanvas(empty_tile,25,135,100,100,buffer)}
	if (Hpotion>0){drawcanvas(health_potion,25,135,100,100,buffer)}
	if (cho==4){drawcanvastransparent(selected_box,25,135,255,0,255,100,100,buffer)}
	if (hpotion>0){pixeltext(100,145,Hpotion,buffer)}

	//--mana potion slot
	if (Mpotion==0){drawcanvas(empty_tile,25,245,100,100,buffer)}
	if (Mpotion>0){drawcanvas(mana_potion,25,245,100,100,buffer)}
	if (cho==7){drawcanvastransparent(selected_box,25,245,255,0,255,100,100,buffer)}
	if (mpotion>0){pixeltext(100,255,Mpotion,buffer)}

	//--pure potion slot
	if (Ppotion==0){drawcanvas(empty_tile,25,355,100,100,buffer)}
	if (Ppotion>0){drawcanvas(pure_potion,25,355,100,100,buffer)}
	if (cho==10){drawcanvastransparent(selected_box,25,355,255,0,255,100,100,buffer)}
	if (ppotion>0){pixeltext(100,365,Ppotion,buffer)}

	//--fire orb slot
	if (fireorb==false){drawcanvas(empty_tile,160,25,100,100,buffer)}
	if (fireorb==true){drawcanvas(fire_orb,160,25,100,100,buffer)}
	if (cho==2){drawcanvastransparent(selected_box,160,25,255,0,255,100,100,buffer)}

	//--ice orb slot
	if (iceorb==false){drawcanvas(empty_tile,270,25,100,100,buffer)}
	if (iceorb==true){drawcanvas(ice_orb,270,25,100,100,buffer)}
	if (cho==3){drawcanvastransparent(selected_box,270,25,255,0,255,100,100,buffer)}

	//--lightning orb slot
	if (lightningorb==false){drawcanvas(empty_tile,160,135,100,100,buffer)}
	if (lightningorb==true){drawcanvas(lightning_orb,160,135,100,100,buffer)}
	if (cho==5){drawcanvastransparent(selected_box,160,135,255,0,255,100,100,buffer)}

	//--time orb slot
	if (timeorb==false){drawcanvas(empty_tile,270,135,100,100,buffer)}
	if (timeorb==true){drawcanvas(time_orb,270,135,100,100,buffer)}
	if (cho==6){drawcanvastransparent(selected_box,270,135,255,0,255,100,100,buffer)}

	//--cure orb slot
	if (cureorb==false){drawcanvas(empty_tile,160,245,100,100,buffer)}
	if (cureorb==true){drawcanvas(cure_orb,160,245,100,100,buffer)}
	if (cho==8){drawcanvastransparent(selected_box,160,245,255,0,255,100,100,buffer)}

	//--pure orb slot
	if (pureorb==false){drawcanvas(empty_tile,270,245,100,100,buffer)}
	if (pureorb==true){drawcanvas(pure_orb,270,245,100,100,buffer)}
	if (cho==9){drawcanvastransparent(selected_box,270,245,255,0,255,100,100,buffer)}

	//--strength orb slot
	if (strengthorb==false){drawcanvas(empty_tile,160,355,100,100,buffer)}
	if (strengthorb==true){drawcanvas(strength_orb,160,355,100,100,buffer)}
	if (cho==11){drawcanvastransparent(selected_box,160,355,255,0,255,100,100,buffer)}

	//--earth orb slot
	if (earthorb==false){drawcanvas(empty_tile,270,355,100,100,buffer)}
	if (earthorb==true){drawcanvas(earth_orb,270,355,100,100,buffer)}
	if (cho==12){drawcanvastransparent(selected_box,270,355,255,0,255,100,100,buffer)}

	//--profile pic
	drawcanvas(herostance,402,22,223,374,buffer)

	//--health icons
	for (tmp=1;tmp<maxhp+1;tmp++){
		if (tmp<hp+1){drawcanvastransparent(life_icon,375+tmp*32,395,0,0,0,32,32,buffer)}
		if (tmp>hp){drawcanvastransparent(emptylife_icon,375+tmp*32,395,0,0,0,32,32,buffer)}

	}
	//--mana icons
	for (tmp=1;tmp<maxmp+1;tmp++){
		if (tmp<mp+1){drawcanvastransparent(mana_icon,375+tmp*32,430,0,0,0,32,32,buffer)}
		if (tmp>mp){drawcanvastransparent(emptymana_icon,375+tmp*32,430,0,0,0,32,32,buffer)}
	}

	//--Description boxes
	if (cho==1 and swordactive==true){drawcanvastransparent(sword_description,125,25,255,0,255,210,100,buffer)}
	if (cho==2 and fireorb==true){drawcanvastransparent(fireorb_description,260,25,255,0,255,210,100,buffer)}
	if (cho==3 and iceorb==true){drawcanvastransparent(iceorb_description,370,25,255,0,255,210,100,buffer)}
	if (cho==4 and hpotion>0){drawcanvastransparent(hpotion_description,125,135,255,0,255,210,100,buffer)}
	if (cho==5 and lightningorb==true){drawcanvastransparent(litorb_description,260,135,255,0,255,210,100,buffer)}
	if (cho==6 and timeorb==true){drawcanvastransparent(timeorb_description,370,135,255,0,255,210,100,buffer)}
	if (cho==7 and mpotion>0){drawcanvastransparent(mpotion_description,125,245,255,0,255,210,100,buffer)}
	if (cho==8 and cureorb==true){drawcanvastransparent(cureorb_description,260,245,255,0,255,210,100,buffer)}
	if (cho==9 and pureorb==true){drawcanvastransparent(pureorb_description,370,245,255,0,255,210,100,buffer)}
	if (cho==10 and ppotion>0){drawcanvastransparent(epotion_description,125,355,255,0,255,210,100,buffer)}
	if (cho==11 and strengthorb==true){drawcanvastransparent(strengthorb_description,260,355,255,0,255,210,100,buffer)}
	if (cho==12 and earthorb==true){drawcanvastransparent(defenceorb_description,370,355,255,0,255,210,100,buffer)}

	//---use items
	if (key=="ENTER"){
		if (cho==4 and hpotion>0 and hp<maxhp){hpotion=hpotion-1;hp=hp+3;wav("item.wav")}
		if (cho==7 and mpotion>0 and mp<maxmp){mpotion=mpotion-1;mp=mp+3;wav("item.wav")}
		if (cho==8 and mp>0 and hp<maxhp and cureorb==true){mp=mp-1;hp=hp+4;wav("item.wav")}
		if (cho==10 and ppotion>0){
			if (mp<maxmp or hp<maxhp){ppotion=ppotion-1;hp=hp+3;mp=mp+3;wav("item.wav")}
		}
		key=0
		if (hp>maxhp){hp=maxhp}
		if (mp>maxmp){mp=maxmp}
	}

	//----------EXIT MENU
	get(key);if (key=="ESC"){done=true;key=0}

	//----------DRAW IMAGES TO SCREEN
	drawcanvas(buffer,0,0)
}






































