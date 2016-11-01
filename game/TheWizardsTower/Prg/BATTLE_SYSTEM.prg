clearbuffer()
getboardname(tmp)
if (tmp=="room4.brd" and Enemy1Slain==true){end()}
if (tmp=="room6.brd" and Enemy2Slain==true){end()}
if (tmp=="room8.brd" and Enemy3Slain==true){end()}
if (tmp=="floor2_room4.brd" and Enemy4Slain==true){end()}
if (tmp=="floor2_room5.brd" and Enemy5Slain==true){end()}
if (tmp=="floor2_room9.brd" and Enemy6Slain==true){end()}
if (tmp=="floor3_branch1_room1.brd" and enemy7slain==true){end()}
if (tmp=="floor3_branch3_room1.brd" and enemy8slain==true){end()}
if (tmp=="floor3_room6.brd" and enemy9slain==true){end()}
if (tmp=="floor4_room5.brd" and enemy10slain==true){end()}

if (tmp=="Room4.brd" and Enemy1Slain==true){end()}
if (tmp=="Room6.brd" and Enemy2Slain==true){end()}
if (tmp=="Room8.brd" and Enemy3Slain==true){end()}
if (tmp=="Floor2_room4.brd" and Enemy4Slain==true){end()}
if (tmp=="Floor2_room5.brd" and Enemy5Slain==true){end()}
if (tmp=="Floor2_room9.brd" and Enemy6Slain==true){end()}
if (tmp=="Floor3_branch1_room1.brd" and enemy7slain==true){end()}
if (tmp=="Floor3_branch3_room1.brd" and enemy8slain==true){end()}
if (tmp=="Floor3_room6.brd" and enemy9slain==true){end()}
if (tmp=="Floor4_room5.brd" and enemy10slain==true){end()}



burn=false
atk=1
Heromenubuffer=createcanvas(80,90)
swordmenubuffer=createcanvas(80,190)
Battlemenubuffer=createcanvas(125,300)
battle=true


mediastop()
mediaplay("Battle.mp3")
turn=random(3)
playerlocation("Hero",px,py,z)
menx=480
meny=150
cho=1
ehp=3
enatk=1
Hprofile=createcanvas(54,24)
setimage("hero_battle_profile.png",0,0,54,24,Hprofile)
Sprofile=createcanvas(54,24)
setimage("sword_battle_profile.png",0,0,54,24,Sprofile)

life_icon=createcanvas(32,32)
mana_icon=createcanvas(32,32)
emptylife_icon=createcanvas(32,32)
emptymana_icon=createcanvas(32,32)
setimage("life.png",0,0,32,32,life_icon)
setimage("manasphere.png",0,0,32,32,mana_icon)
setimage("emptylife.png",0,0,32,32,emptylife_icon)
setimage("emptymana.png",0,0,32,32,emptymana_icon)

getboardname(tmpboard)
if (tmp=="floor2_room4.brd"){dir=3}
if (tmp=="floor2_room5.brd"){dir=3}
if (tmp=="floor2_room9.brd"){dir=3}
if (tmp=="room4.brd"){dir=1}
if (tmp=="room6.brd"){dir=2;menx=0;meny=50}
if (tmp=="room8.brd"){dir=3}
if (tmp=="floor3_branch1_room1.brd"){dir=3}
if (tmp=="floor3_branch3_room1.brd"){dir=3}
if (tmp=="floor3_room6.brd"){dir=3}
if (tmp=="floor4_room5.brd"){dir=3}
if (tmp=="floor5_final_room.brd"){dir=3;ehp=6;enatk=2}



if (tmp=="Floor2_room4.brd"){dir=3}
if (tmp=="Floor2_room5.brd"){dir=3}
if (tmp=="Floor2_room9.brd"){dir=3}
if (tmp=="Room4.brd"){dir=1}
if (tmp=="Room6.brd"){dir=2;menx=0;meny=50}
if (tmp=="Room8.brd"){dir=3}
if (tmp=="Floor3_branch1_room1.brd"){dir=3}
if (tmp=="Floor3_branch3_room1.brd"){dir=3}
if (tmp=="Floor3_room6.brd"){dir=3}
if (tmp=="Floor4_room5.brd"){dir=3}
if (tmp=="Floor5_final_room.brd"){dir=3;ehp=6;enatk=2}

if (dir==1){//--player faceing west
	itemstance(0,"east_idle")
	playerstance("Hero","BattleIdle_West")
}
if (dir==2){//--player faceing west
	itemstance(0,"west_idle")
	playerstance("Hero","BattleIdle_East")
}
if (dir==3){//--player faceing west
	itemstance(0,"south_idle")
	playerstance("Hero","BattleIdle_North")
}

while (battle==true)
{

//	colorrgb(255,0,255);fillrect(0,0,640,480,buffer)
//	colorrgb(255,255,255)
//	pixeltext(100,300,tmpboard)
//	pixeltext(100,420,"MP "+mp+"/"+maxmp)
	//--health icons
	for (tmp=1;tmp<maxhp+1;tmp++){
		if (tmp<hp+1){drawcanvastransparent(life_icon,25+tmp*32,395,0,0,0,32,32)}
		if (tmp>hp){drawcanvastransparent(emptylife_icon,25+tmp*32,395,0,0,0,32,32)}

	}
	//--mana icons
	for (tmp=1;tmp<maxmp+1;tmp++){
		if (tmp<mp+1){drawcanvastransparent(mana_icon,25+tmp*32,430,0,0,0,32,32)}
		if (tmp>mp){drawcanvastransparent(emptymana_icon,25+tmp*32,430,0,0,0,32,32)}
	}

	//---HERO BATTLE MENU
	if (turn==1){
		key=""
		get(Key)
		if (key=="UP"){cho=cho-1}
		if (key=="DOWN"){cho=cho+1}

		if (cho<1){cho=1}
		if (cho>2 and submenu==0){cho=2}
		if (cho>4 and submenu==2){cho=4}

		tmp=tmp+1
		if (tmp>250){tmp=0}
		drawcanvas(hprofile,menx,meny-24)
		setimage("battle_menu.png",0,0,125,300,battlemenubuffer)
		if (submenu==0)
		{
			colorrgb(0,0,0);pixeltext(12,7,"Attack",battlemenubuffer)
			colorrgb(255,255,255)
			if (cho==1){colorrgb(tmp,tmp,tmp)}
			pixeltext(10,5,"Attack",battlemenubuffer)
			colorrgb(0,0,0);pixeltext(12,27,"Item",battlemenubuffer)
			colorrgb(255,255,255)
			if (cho==2){colorrgb(tmp,tmp,tmp)}
			pixeltext(10,25,"Item",battlemenubuffer)
			drawcanvas(battlemenubuffer,menx,meny)
		}
		if (submenu==2)
		{
			colorrgb(0,0,0);pixeltext(12,7,"Health Potion "+hpotion,battlemenubuffer)
			colorrgb(255,255,255)
			if (cho==1){colorrgb(tmp,tmp,tmp)}
			pixeltext(10,5,"Health Potion "+hpotion,battlemenubuffer)
			colorrgb(0,0,0);pixeltext(12,27,"Mana Potion "+mpotion,battlemenubuffer)
			colorrgb(255,255,255)
			if (cho==2){colorrgb(tmp,tmp,tmp)}
			pixeltext(10,25,"Mana Potion "+mpotion,battlemenubuffer)
			colorrgb(0,0,0);pixeltext(12,47,"Elixer "+ppotion,battlemenubuffer)
			colorrgb(255,255,255)
			if (cho==3){colorrgb(tmp,tmp,tmp)}
			pixeltext(10,45,"Elixer "+ppotion,battlemenubuffer)
			colorrgb(0,0,0);pixeltext(12,67,"Return",battlemenubuffer)
			colorrgb(255,255,255)
			if (cho==4){colorrgb(tmp,tmp,tmp)}
			pixeltext(10,65,"Return",battlemenubuffer)
			drawcanvas(battlemenubuffer,menx,meny)
		}
		if (key=="ENTER" and cho==4 and submenu==2){submenu=0}//----Return From Item Menu
		if (key=="ENTER" and cho==1 and submenu==2){//--------------Use healing Potion
			if (hpotion>0)
			{
				wav("item.wav")
				playerstance("Hero","BattleCure")
				playerstance("Hero","BattleIdle_West")
				hp=hp+3
				if (hp>maxhp){hp=maxhp}
				hpotion=hpotion-1
				turn=2;cho=1
			}
		}
		if (key=="ENTER" and cho==2 and submenu==2){//--------------Use mana Potion
			if (mpotion>0)
			{
				wav("item.wav")
				playerstance("Hero","BattleEther")
				playerstance("Hero","BattleIdle_West")
				mp=mp+3
				if (mp>maxmp){mp=maxmp}
				mpotion=mpotion-1
				turn=2;cho=1
			}
		}
		if (key=="ENTER" and cho==3 and submenu==2){//--------------Use Elixer
			if (ppotion>0)
			{
				wav("item.wav")
				playerstance("Hero","BattleCure")
				playerstance("Hero","BattleEther")
				playerstance("Hero","BattleIdle_West")
				hp=maxhp
				mp=maxmp
				ppotion=ppotion-1
				turn=2;cho=1
			}
		}



		if (key=="ENTER" and cho==2 and submenu==0){submenu=2}//----Choose Item Menu
		if (key=="ENTER" and cho==1 and submenu==0)//---------------ATTACK
		{
			wav("hit.wav")
			if (dir==1){
				playerstance("Hero","Attack_west")
				playerstance("Hero","BattleIdle_West")
				itemstance(0,"damage")
				itemstance(0,"east_idle")
			}
			if (dir==2){
				playerstance("Hero","Attack_east")
				playerstance("Hero","BattleIdle_East")
				itemstance(0,"damage")
				itemstance(0,"west_idle")
			}
			if (dir==3){
				playerstance("Hero","Attack_north")
				playerstance("Hero","BattleIdle_North")
				itemstance(0,"damage")
				itemstance(0,"south_idle")
			}

			ehp=ehp-atk
			turn=2;cho=1
			clearbuffer()
		}
	}
	//---SWORD BATTLE MENU
	if (turn==2){
		key=""
		get(Key)
		if (key=="UP"){cho=cho-1}
		if (key=="DOWN"){cho=cho+1}
		if (cho<1){cho=1}
		if (cho>9){cho=9}
		tmp=tmp+1
		if (tmp>250){tmp=0}
		drawcanvas(sprofile,menx,meny-24)
		setimage("battle_menu.png",0,0,125,300,battlemenubuffer)
		colorrgb(0,0,0);pixeltext(12,7,"Provoke",battlemenubuffer)
		colorrgb(255,255,255)
		if (cho==1){colorrgb(tmp,tmp,tmp)}
		pixeltext(10,5,"Provoke",battlemenubuffer)
		colorrgb(0,0,0);pixeltext(12,27,"Fire",battlemenubuffer)
		colorrgb(255,255,255)
		if (cho==2){colorrgb(tmp,tmp,tmp)}
		pixeltext(10,25,"Fire",battlemenubuffer)
		if (iceorb==true){
			colorrgb(0,0,0);pixeltext(12,47,"Ice",battlemenubuffer)
			colorrgb(255,255,255)
			if (cho==3){colorrgb(tmp,tmp,tmp)}
			pixeltext(10,45,"Ice",battlemenubuffer)
		}
		if (earthorb==true){
			colorrgb(0,0,0);pixeltext(12,67,"Earth",battlemenubuffer)
			colorrgb(255,255,255)
			if (cho==4){colorrgb(tmp,tmp,tmp)}
			pixeltext(10,65,"Earth",battlemenubuffer)
		}
		if (lightningorb==true){
			colorrgb(0,0,0);pixeltext(12,87,"Lightning",battlemenubuffer)
			colorrgb(255,255,255)
			if (cho==5){colorrgb(tmp,tmp,tmp)}
			pixeltext(10,85,"Lightning",battlemenubuffer)
		}
		if (cureorb==true){
			colorrgb(0,0,0);pixeltext(12,107,"Cure",battlemenubuffer)
			colorrgb(255,255,255)
			if (cho==6){colorrgb(tmp,tmp,tmp)}
			pixeltext(10,105,"Cure",battlemenubuffer)
		}
		if (pureorb==true){
			colorrgb(0,0,0);pixeltext(12,127,"Pure",battlemenubuffer)
			colorrgb(255,255,255)
			if (cho==7){colorrgb(tmp,tmp,tmp)}
			pixeltext(10,125,"Pure",battlemenubuffer)
		}
		if (strengthorb==true){
			colorrgb(0,0,0);pixeltext(12,147,"Strength",battlemenubuffer)
			colorrgb(255,255,255)
			if (cho==8){colorrgb(tmp,tmp,tmp)}
			pixeltext(10,145,"Strength",battlemenubuffer)
		}
		if (timeorb==true){
			colorrgb(0,0,0);pixeltext(12,167,"Time",battlemenubuffer)
			colorrgb(255,255,255)
			if (cho==9){colorrgb(tmp,tmp,tmp)}
			pixeltext(10,165,"Time",battlemenubuffer)
		}
		if (cho==3 and iceorb==false){cho=4}
		if (cho==4 and earthorb==false){cho=5}
		if (cho==5 and lightningorb==false){cho=6}
		if (cho==6 and cureorb==false){cho=7}
		if (cho==7 and pureorb==false){cho=8}
		if (cho==8 and strengthorb==false){cho=9}
		if (cho==9 and timeorb==false){cho=1}
		drawcanvas(battlemenubuffer,menx,meny)

		if (key=="ENTER" and cho==1)//------------------PROVOKE
		{
			if (dir==1){
				itemstance(0,"east_idle")
				playerstance("Hero","TakeSword")
			}
			if (dir==2){
				itemstance(0,"west_idle")
				playerstance("Hero","TakeSword")
			}
			if (dir==3){
				itemstance(0,"south_idle")
				playerstance("Hero","TakeSword")
			}
			setimage("mwin_small.png",100,0,540,50)
			setimage("sword_profile_1_small.png",0,0,100,100)
			colorrgb(255,255,255)
			tmp=random(5)
			if (tmp==1){pixeltext(120,10,"You're a PUSSY")}
			if (tmp==2){pixeltext(120,10,"STUPID MONSTER")}
			if (tmp==3){pixeltext(120,10,"My grandma is scarier than you")}
			if (tmp==4){pixeltext(120,10,"Come here and bleed")}
			if (tmp==5){pixeltext(120,10,"Go #%*$ #%$* with your %*#$%*#")}
			delay(3)
			tmp=random(10)
			turn=3
			if (tmp>8)
			{
				turn=1
				setimage("mwin_small.png",100,0,540,50)
				colorrgb(255,255,255)
				pixeltext(120,10,"Enemy gets angry and misses his turn")
				delay(3)
			}

			if (dir==1){
				itemstance(0,"east_idle")
				playerstance("Hero","BattleIdle_West")
			}
			if (dir==2){
				itemstance(0,"west_idle")
				playerstance("Hero","BattleIdle_East")
			}
			if (dir==3){
				itemstance(0,"south_idle")
				playerstance("Hero","BattleIdle_North")
			}
			clearbuffer()
		}

		if (key=="ENTER" and cho>1 and mp>0)//------------------SPELLS
		{
			turn=3
			playerstance("Hero","TakeSword")


			if (cho==2){itemstance(0,"BurnEast");burn=true;mp=mp-1;cho=1}//----fire
			if (cho==3){freeze=true}
			if (cho==4){playerstance("Hero","BattleEarth");def=1;mp=mp-1}
			if (cho==5){elec=true}
			if (cho==6){//--cure
				wav("item.wav")
				playerstance("Hero","BattleCure")
				if (dir==1){
					itemstance(0,"east_idle")
					playerstance("Hero","BattleIdle_West")
				}
				if (dir==2){
					itemstance(0,"west_idle")
					playerstance("Hero","BattleIdle_East")
				}
				if (dir==3){
					itemstance(0,"south_idle")
					playerstance("Hero","BattleIdle_North")
				}
				hp=hp+4
				if (hp>maxhp){hp=maxhp}
				mp=mp-1;cho=1
			}			
//			if (cho==7){pure}
			if (cho==8){//---strength
				wav("item.wav")
				playerstance("Hero","BattleEarth")
				if (dir==1){
					itemstance(0,"east_idle")
					playerstance("Hero","BattleIdle_West")
				}
				if (dir==2){
					itemstance(0,"west_idle")
					playerstance("Hero","BattleIdle_East")
				}
				if (dir==3){
					itemstance(0,"south_idle")
					playerstance("Hero","BattleIdle_North")
				}
				mp=mp-1
				atk=atk+1;cho=1
			}
			if (cho==9){//---Time spell
				turn=1
				wav("item.wav")
				playerstance("Hero","BattleTime")
				if (dir==1){
					itemstance(0,"east_idle")
					playerstance("Hero","BattleIdle_West")
				}
				if (dir==2){
					itemstance(0,"west_idle")
					playerstance("Hero","BattleIdle_East")
				}
				if (dir==3){
					itemstance(0,"south_idle")
					playerstance("Hero","BattleIdle_North")
				}
				mp=mp-1;cho=1
			}

			if (dir==1){
				itemstance(0,"east_idle")
				playerstance("Hero","BattleIdle_West")
			}
			if (dir==2){
				itemstance(0,"west_idle")
				playerstance("Hero","BattleIdle_East")
			}
			if (dir==3){
				itemstance(0,"south_idle")
				playerstance("Hero","BattleIdle_North")
			}
			clearbuffer()


		}



	}
	//---ENEMY TURN---
	if (turn==3 and ehp>0){
		delay(1)
		wav("hit.wav")
		itemstance(0,"attack")
		playerstance("Hero","HurtSpin")
		if (dir==1){
			itemstance(0,"east_idle")
			playerstance("Hero","BattleIdle_West")
		}
		if (dir==2){
			itemstance(0,"west_idle")
			playerstance("Hero","BattleIdle_East")
		}
		if (dir==3){
			itemstance(0,"south_idle")
			playerstance("Hero","BattleIdle_North")
		}

		hp=hp-enatk;hp=hp+def;def=0
		if (burn==true){itemstance(0,"BurnEast");itemstance(0,"damage");ehp=ehp-1}

		if (dir==1){
			itemstance(0,"east_idle")
			playerstance("Hero","BattleIdle_West")
		}
		if (dir==2){
			itemstance(0,"west_idle")
			playerstance("Hero","BattleIdle_East")
		}
		if (dir==3){
			itemstance(0,"south_idle")
			playerstance("Hero","BattleIdle_North")
		}

		turn=1
	}





	if (ehp<1){battle=false}
	if (hp<1){run("GameOver.prg")}
}
itemstance(0,"die")
destroyitem(0)
mediaplay("tower.mp3")
getboardname(tmp)
if(tmp=="room4.brd"){Enemy1Slain=true}
if(tmp=="room6.brd"){Enemy2Slain=true}
if(tmp=="room8.brd"){Enemy3Slain=true}
if(tmp=="floor2_room4.brd"){enemy4slain=true}
if(tmp=="floor2_room5.brd"){enemy5slain=true}
if(tmp=="floor2_room9.brd"){enemy6slain=true}
if(tmp=="floor3_branch1_room1.brd"){enemy7slain=true}
if(tmp=="floor3_branch3_room1.brd"){enemy8slain=true}
if(tmp=="floor3_room6.brd"){enemy9slain=true}
if(tmp=="floor4_room5.brd"){enemy10slain=true}

if(tmp=="Room4.brd"){Enemy1Slain=true}
if(tmp=="Room6.brd"){Enemy2Slain=true}
if(tmp=="Room8.brd"){Enemy3Slain=true}
if(tmp=="Floor2_room4.brd"){enemy4slain=true}
if(tmp=="Floor2_room5.brd"){enemy5slain=true}
if(tmp=="Floor2_room9.brd"){enemy6slain=true}
if(tmp=="Floor3_branch1_room1.brd"){enemy7slain=true}
if(tmp=="Floor3_branch3_room1.brd"){enemy8slain=true}
if(tmp=="Floor3_room6.brd"){enemy9slain=true}
if(tmp=="Floor4_room5.brd"){enemy10slain=true}


if(tmp=="floor5_final_room.brd"){run("END_CREDITS.prg")}
if(tmp=="Floor5_final_room.brd"){run("END_CREDITS.prg")}















