//this is a thread that checks the position of the character and checks it against the position of the boulder and applys damage
//if they correspond.
//the reason I broke the code up and put this section here and the rest in Activateboulder.prg is that putting this extra code in with the 
//boulder movement made the bolder move jerky(to many commands to activate per loop of the program)
while (true){
	playerlocation("Hero",px,py,z)
	if (px>ix-2 and px<ix+1 and py>iy-2 and py<iy+1){playerstance("Hero","HurtSpin");hp=hp-1;bouldercollision=true;if(hp<1){run("GameOver.prg")}}
}

