//This program applies damage when the character walks over spikes and also plays the pain animation
//The tiles are changed in the program trap_room5_spikes_part1.prg
//this program checks what tile is under the characters feet and does the damage accordingly
	playerLocation("Hero", px, py, z)
	getboardtile(px,py,z,tileno)
	if (tileno=="tileset1.tst47" or tileno=="tileset1.tst49"){
		playerstance("Hero","HurtSpin",true)
		hp=hp-1
		if (hp<1){run("GameOver.prg")}
	}





