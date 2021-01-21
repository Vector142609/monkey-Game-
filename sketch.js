
var monkey ,monkeyImage;
var ground,groundImage;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score=0;
var bananaScore=0;
var PLAY=1;
var END=0;
var gameState = PLAY;

function preload(){
  
  monkeyImage =       loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadAnimation("banana.png");
  obstacleImage = loadAnimation("obstacle.png");
 
}



function setup(){
 createCanvas(600,600);
  
  monkey=createSprite(50,height-70,20,20);
  monkey.addAnimation("monkey_running",monkeyImage);
  monkey.scale=0.1;
  
  ground=createSprite(width/2,height-10,width-50,125);
  ground.velocityX=-6;
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
}


function draw() {
  background("skyblue");
  
  stroke("black");
  textSize(15);
  fill("black");
  text ("Bananas Collected: "+bananaScore,200,50);
  
  stroke("black");
  textSize(15);
  fill("black");
  
  text ("Survival Time: "+score,50,50);
  
  if(gameState===PLAY){
    bananas();
    obstacles();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score*2/100);
  
    if((touches.lenght>0||keyDown("SPACE"))&&monkey.y>=height-200) {
      monkey.velocityY = -13; 
      touches=[];
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x > 0){
      ground.x = ground.width/2;
    }
    
    if(bananaGroup.isTouching(monkey)) {
    bananaScore=bananaScore+1;  
    bananaGroup.destroyEach();  
    switch(bananaScore) {
    case 10: monkey.scale=0.10;
      break;
    case 20: monkey.scale=0.11;
      break;
    case 30: monkey.scale=0.12;
      break;
    case 40: monkey.scale=0.13;
      break;
    default: break;
    }    
  }
    
    if (monkey.isTouching(obstacleGroup)){
      monkey.scale=0.1;
      gameState = END;
    }
    
  }
  else if(gameState===END){
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!", 150, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to restart", 170, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
  monkey.collide(ground);
  
 drawSprites();
}

function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,height-220, 50, 50 )
    banana.addAnimation("banana",bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*2/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
  }
  
}

function obstacles(){
  if (frameCount%150 === 0){
    
    obstacle = createSprite(620,height-95,50,50);
    obstacle.addAnimation("obstacle",obstacleImage);
    obstacle.setCollider("circle",0,0,180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*2/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
}

