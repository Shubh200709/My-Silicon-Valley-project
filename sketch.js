var ship,shipImg,space,spaceImg;
var diamondImg,award,awardImg;
var burstImg,gameOver,gameOverImg;
var life,life2,life3,lifeImg,start,startImg,speed,speedImg;
var virusImg,laserImg,laserG;
var diamondG,virusG,astroidG;

var live=3,score=0,mineral=0,level=0;

var gameState=0;
var burstS,alertS,shootS;
var gold,goldImg,silver,sliverImg,bronze,bronzeImg;
var a1Img,a2Img,a3Img,a4Img;
var form;
//var PLAY=0;
//var END;
//var INTRO=1;

var restart,restartImg;

function preload(){
shipImg=loadAnimation("image/plane.png");
spaceImg=loadImage("image/background.png");

diamondImg=loadImage("image/diamond.png");
awardImg=loadImage("image/award.png");

burstImg=loadAnimation("image/burstImg.png");
gameOverImg=loadImage("image/gameover.png");

lifeImg=loadImage("image/lifeline.png");
startImg=loadImage("image/startButton.png");
speedImg=loadImage("image/speed.png");

virusImg=loadImage("image/virus.png");
laserImg=loadImage("image/laser.png");

restartImg=loadImage("image/restart.png");
goldImg=loadImage("image/goldMedal.png");
sliverImg=loadImage("image/sliverMedal.png");
bronzeImg=loadImage("image/bronzeMedal.png");

a1Img=loadImage("image/astroid1.png");
a2Img=loadImage("image/astroid2.png");
a3Img=loadImage("image/astroid3.png");
a4Img=loadImage("image/astroid4.png");

burstS=loadSound("sounds/burst.mp3");
//alertS=loadSound("sounds/siren.mp3");
shootS=loadSound("sounds/shoot.mp3");

}

function setup() {
  createCanvas(800,600);
  space=createSprite(400,0,1000,900);
  space.scale=2;
  space.addImage(spaceImg);
  space.visible=false;
  space.y=space.height/2;

  ship=createSprite(400,400,20,20);
  ship.addAnimation("shooting",shipImg);
  ship.addAnimation("destroyed",burstImg);
  ship.visible=false;

  life=createSprite(10,50,10,10);
  life.addImage(lifeImg);
  life.scale=0.1;
  life.visible=false;

  life2=createSprite(50,50,10,10);
  life2.addImage(lifeImg);
  life2.scale=0.1;
  life2.visible=false;

  life3=createSprite(90,50,10,10);
  life3.addImage(lifeImg);
  life3.scale=0.1;
  life3.visible=false;

  gameOver=createSprite(2*space.x-410,space.y-150);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
  restart=createSprite(2*space.x-410,space.y-200);
  restart.addImage(restartImg);
  restart.scale=.039;
  restart.visible=false;

  start=createSprite(400,480,20,20);
  start.addImage(startImg);
  start.visible=false;
  
  gold=createSprite(400,380,20,20);
  gold.addImage(goldImg);
  gold.scale=0.15;
  gold.visible=false;

  silver=createSprite(400,380,20,20);
  silver.addImage(sliverImg);
  silver.scale=0.25;
  silver.visible=false;

  bronze=createSprite(400,380,20,20);
  bronze.addImage(bronzeImg);
  bronze.scale=0.15;
  bronze.visible=false;

  award=createSprite(400,380,20,20);
  award.addImage(awardImg);
  award.scale=0.5;
  award.visible=false;

  form=new Form(400,0);

  virusG=createGroup();
  diamondG=createGroup();
  laserG=createGroup();
  astroidG=createGroup();
  
}

function draw() {
  //background();
if(gameState===0){
  form.display();
}

if(gameState===1){
background(0);
start.visible=true;
strokeWeight(1);
    stroke("0");
    fill("#00cec9");
    textSize(30);
    text("Welcome Player. Welcome to the year 2220.", width/7,height/4);

    //strokeWeight(2);
    //stroke("0");
    fill("yellow");
    textSize(20);
    text("Our world is in grave danger. Humans have consumed all the resources for dvelopment.",10,190);
    text("Now we humans are struggling because of it. But we still have one last hope left.",35,220);
    text("We can extract resources from space.",205,250);
    text("You can see your health on the top left corner.The minimum level for a medal is 3",30,280);
    text("Be careful of the space virus. If they touch you, your health will decrease.",55,310);
    text("Use Right and Left arrow keys to move the space ship.",125,340);
    text("press space key to shoot the virus.",210,370);
    text("Now the future lies in your hands.",215,400);

    fill("#00cec9");
    text("Good luck!!!",350,430);

    if(mousePressedOver(start)){
gameState=2;
start.visible=false;
    }
}

  if(gameState===2){
//spaceS.play();
    gameOver.visible=false;
    restart.visible=false;
    award.visible=false;
    start.visible=false;

    life.visible=true;
    life2.visible=true;
    life3.visible=true;

    space.visible=true;
    ship.visible=true;

    //ship.x=ship.x + random(1,-1);

    space.velocityY= (2 + score/60);
    score=score+Math.round(getFrameRate()/62);

    if(diamondG.isTouching(ship)){
mineral=mineral+1;
diamondG.destroyEach();
    }

    if(keyDown("Left_arrow")){
      ship.x=ship.x-4;
    }

    if(keyDown("right_arrow")){
      ship.x=ship.x+4;
    }

    if(space.y>500){
space.y=400;
space.x=400;
    }

    if(keyWentDown("space")){
createLaser();
shootS.play();
    }
    //creates virus on the canvas
    spawnVirus();

    //creates diamond on the canvas
    spawnDiamond();

    if(virusG.isTouching(ship)){
virusG.destroyEach();
live=live-1;
    }

    if(astroidG.isTouching(ship)){
live=live-1;
astroidG.destroyEach();
    }

    if(live<=2){
life3.visible=false;
    }

    if(live<=1){
      life2.visible=false;
      //alertS.play();
    }

    if(live<=0){
      life.visible=false;
      gameState=3;
      burstS.play();
      ship.changeAnimation("destroyed",burstImg);
    ship.scale=0.4
    }

    if(laserG.isTouching(virusG)){
virusG.destroyEach();
laserG.destroyEach();
    }  


  }
  else if(gameState===3){
    space.velocityY=0;
    start.visible=true;

    if(mousePressedOver(start)&&gameState===3){
gameState=4
start.visible=false;
    }

    laserG.setVelocityYEach(0);
    virusG.setVelocityYEach(0);
    diamondG.setVelocityYEach(0);

    laserG.destroyEach();
    virusG.destroyEach();
    diamondG.destroyEach()
  }
  else if(gameState===4){
    background("cyan");
    space.visible=false;
    ship.visible=false;
    gameOver.visible=true;
    restart.visible=true;

    if(level===3){
      bronze.visible=true;
      textSize(20);
      stroke(0);
      fill("black");
      text("Hmm... Sorry, champ, these aren't enough.",200,100);
      text(" Try again by clicking on the restart button.",200,130);
          }
      
          if(level===4){
      silver.visible=true;
      textSize(20);
      stroke(0);
      fill("black");
      text("Well done Champ!!!",400,100);
      text(" Click on the restart button to play again.",300,130); 
      text("Just a little more to perfection.",300,160);
          }

          if(level===5 && mineral<400){
            gold.visible=true;
            textSize(20);
      stroke(0);
      fill("black");
            text("Well done Champ!!!",300,70);
            text("We Have Enough Resources For Survival.",300,100);
            text("Increase Your Rank By Collecting More Minerals ",300,130);
            text("So That We Can Start An Intersteller Civilisation",300,160);
          }
           if(level===5 && mineral===400){
            background("cyan");  
            ship.visible=false;
            restart.visible=true;
            gameOver.visible=true;
        award.visible=true;
        fill("black");
        textSize(20);
        stroke(0);
        text("Congratulations you won!!!",300,100);
        text("Now we have enough resources",300,130); 
        text("to start an intersteller civilisation!!!",300,160);
            
          }

    if(mousePressedOver(restart)){
reset();
    }
  }

  

drawSprites();
if(gameState===2){
text("Score: "+score,2500,10);

  fill("gold");
  textSize(20);
  text("Mineral: "+mineral,500,70);

  fill("gold");
  textSize(20);
  text("Lives ",10,30);

  fill("gold");
  textSize(20);
  text("LEVEL "+level,230,40);
//console.log(space.velocityY);


if(level===1){
  fill("gold");
  textSize(20);
text("collect 25 minerals",230,70);
}
}
if(mineral===25){
level=2;
}

if(level===2){
  fill("gold");
  textSize(20);
text("collect 50 minerals",230,70);
}

if(mineral===50){
level=3;
}

if(level===3){
  fill("gold");
  textSize(20);
text("collect 75 minerals",230,70);
}

if(mineral===75){
  level=4;
}

if(level===4){
  fill("gold");
  textSize(20);
text("collect 100 minerals",230,70);
}

if(mineral===100){
  level=5
}

if(level===5){
  fill("gold");
  textSize(20);
text("Congratulations for making it so far",300,200);
text(" NOW COLLECT 400 MINERALS AND SAVE YOURSELF FROM THE ASTEROIDS AND VIRUS",300,300);
spawnAstroid();
}

if(mineral===400){
  gameState=4;
  }
}

function reset(){
 gameState=0;
gold.visible=false;
silver.visible=false;
bronze.visible=false;
award.visible=false;

  ship.changeAnimation("shooting",shipImg);
  ship.scale=1;
  ship.x=400;
  ship.y=400;
  
  life.visible=true;
  life2.visible=true;
  life3.visible=true;
 
  score=0;
  mineral=0;

  live=3;

  gameOver.visible=false;
  restart.visible=false;

  virusG.destroyEach();
  diamondG.destroyEach();
  laserG.destroyEach();
}

function spawnVirus(){
  if(frameCount % 100 === 0){
    var virus=createSprite(Math.round(random(10,1000)),0,20,20);
    virus.addImage(virusImg);
    virus.velocityY = (2 + 3*score/50);
    virus.lifetime=300;
    virus.scale=0.1;
    virusG.add(virus);
   }
}

function spawnDiamond(){
  if(frameCount % 150 === 0){
var diamond=createSprite(Math.round(random(10,1000)),0,20,20);
diamond.addImage(diamondImg);
diamond.velocityY = (2 + 2*score/50);
diamond.lifetime=300;
diamond.scale=.1;
diamondG.add(diamond);
  }
}

function createLaser(){
  var laser=createSprite(100,100,60,10);
  laser.addImage(laserImg);
  laser.scale=.1
  laser.x=ship.x;
  laser.y=ship.y-40;
  laser.velocityY=-4;
  laser.lifetime=200;
  laserG.add(laser);
  return laser;
}

function createLaser2(){
  var laser2=createSprite(100,100,60,10);
  laser2.addImage(laserImg);
  laser2.scale=.1
  laser2.x=ship.x+40;
  laser2.y=ship.y;
  laser2.velocityY=-4;
  laser2.lifetime=200;
  laserG.add(laser2);
  return laser2;
}

function createAstroid1(){
  var astroid1=createSprite(0,Math.round(random(0,600)),20,20);
  astroid1.addImage(a1Img);
  astroid1.scale=0.1;
  astroid1.velocityX=2;
  astroid1.velocityY=2;
  astroid1.lifetime=200;
}

function createAstroid2(){
  var astroid2=createSprite(800,Math.round(random(0,600)),20,20);
  astroid2.addImage(a2Img);
  astroid2.scale=0.1;
  astroid2.velocityX=-2;
  astroid2.velocityY=2;
  astroid2.scale=200;
}

function createAstroid3(){
  var astroid3=createSprite(800,Math.round(random(0,600)),20,20);
  astroid3.addImage(a3Img);
  astroid3.scale=0.1
  astroid3.velocityX=-2;
  astroid3.velocityY=2;
  astroid3.lifetime=200;
}

function createAstroid4(){
  var astroid4=createSprite(Math.round(random(0,800)),0,20,20);
  astroid4.addImage(a4Img);
  astroid4.scale=0.05
  astroid4.velocityY=2;
  astroid4.lifetime=200;
}

function spawnAstroid(){
  
  if(frameCount % 100===0){
    var astroid=createSprite(Math.round(random(0,800)),0,20,20);
    astroid.scale=0.1;
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: astroid.addImage(a1Img);
      astroid.velocityX=(2+2*score/60);
      astroid.velocityY=(2+2*score/60);
              break;
      case 2: astroid.addImage(a3Img);
      astroid.velocityX=-(1+2*score/60);
      astroid.velocityY=(2+2*score/60);
              break;
      case 3: astroid.addImage(a4Img);
      astroid.velocityY=(2+2*score/60);
      astroid.scale=0.05
              break;
      
      default: break;

  }

}}