dir=playerDirection("Hero")
if(dir==tkDIR_N){push("North,North,North")}
if(dir==tkDIR_S){push("South,South,South")}
playerlocation("Hero",px,py,z)
if (px==9 and py==6){playerstance("Hero","HurtSpin");hp=hp-1}
if (px==12 and py==6){playerstance("Hero","HurtSpin");hp=hp-1}
