playerLocation("Hero", px, py, z)
createitem("Fired_Arrow.itm",pos)
putitem(pos,px,7,1)
itemstance(pos,"Fire",true)
destroyitem(pos)
playerstance("Hero","HurtSpin",true)
hp=hp-1
if (hp<1){run("GameOver.prg")}




