//this is the code that moves the boulder after the player has stepped on the pressure plates(changing bolderactive to true)
//the reason I broke the code up and put this section here and the rest in bouldercollision.prg is that putting the extra code in with the 
//boulder movement made the bolder move jerky(to many commands to activate per loop of the program)


while(true){
pushitem("Source","West,West,West,South,South,South,South,South,South,South,South,East,East,East,East,East,East,North,North,North,North,North,North,North,North,West,West,West")
itemlocation("Source",ix,iy,z)
}


