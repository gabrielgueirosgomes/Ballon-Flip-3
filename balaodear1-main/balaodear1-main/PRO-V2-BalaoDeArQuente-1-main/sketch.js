var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3
var gameState = "play"
var gameOver, gameOverImg
var restart, restartImg
function preload(){
bgImg = loadImage ("assets/bg.png")
obsTop2 = loadImage ("assets/obsTop2.png")
obsTop1 = loadImage ("assets/obsTop1.png")
obsBottom1 = loadImage ("assets/obsBottom1.png")
obsBottom2 = loadImage ("assets/obsBottom2.png")
obsBottom3 = loadImage ("assets/obsBottom3.png")
balloonImg = loadAnimation ("assets/balloon1.png", "assets/balloon2.png", "assets/balloon3.png")
gameOverImg = loadImage ("assets/fimdejogo.png")
restartImg = loadImage ("assets/restart.png")
}

function setup(){

//imagem de plano de fundo
  bg = createSprite (165, 485, 1, 1)
  bg.addImage(bgImg)
  bg.scale = 1.3
//criando canto superior e inferior
bottomGround = createSprite (200, 390, 800, 20)
bottomGround.visible = false;

topGround = createSprite (200, 10, 800, 20)
topGround.visible = false;
      
//criando o balão     
  balloon = createSprite (100, 200, 20, 50)
  balloon.addAnimation("balão", balloonImg)
  balloon.scale = 0.2
 balloon.setCollider("rectangle",0,0,balloon.width, 350);
balloon.debug = true

  obstaclesTopGroup = createGroup();  
  obstacleBottomGroup = createGroup()

  gameOver = createSprite(200,100);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false
  
  restart = createSprite(200,140);
  restart.addImage(restartImg);
  restart.visible = false

  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
}

function draw() {
  
  background("black");
        if(gameState == "play"){
          if(keyDown("space")&& balloon.y >= 100) {
            balloon.velocityY = -12;
        }
          //adicionando gravidade
          balloon.velocityY = balloon.velocityY + 0.8
          spawnObstacles()
        barra()
        if(obstaclesTopGroup.isTouching(balloon)||obstacleBottomGroup.isTouching(balloon)||balloon.isTouching(topGround)||balloon.isTouching(bottomGround)){
          gameState = "end" 
        } 
      } 
     if(gameState == "end"){
       gameOver.visible = true
       restart.visible = true
       balloon.velocityY = 0
       balloon.velocityX = 0
       obstacleBottomGroup.setVelocityXEach(0);
       obstaclesTopGroup.setVelocityXEach(0); 
       obstacleBottomGroup.setLifetimeEach(-1);
    obstaclesTopGroup.setLifetimeEach(-1);
    if(mousePressedOver(restart)) {
      reset();
    }
    gameOver.depth = balloon.depth;
    gameOver.depth = gameOver.depth + 1;
     }
          //fazendo o balão de ar quente pular
          drawSprites(); 
         
}

function reset(){
  gameState = "play"
  gameOver.visible = false
  restart.visible = false
  obstacleBottomGroup.destroyEach()
  obstaclesTopGroup.destroyEach()
  balloon.position.y = 200
  balloon.position.x = 100
  
}


function barra(a){
  if (frameCount % 60 === 0){
        var barr = createSprite(400,200,10,600);
    barr.velocityX = -6
    barr.lifetime = 66
    barr.visible = false
  }   
}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacleTop = createSprite(400,50,40,50);
    obstacleTop.velocityX = -4
    obstacleTop.y = Math.round(random(10,80  ))

     //gerar obstáculos aleatórios
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: obstacleTop.addImage(obsTop1);
               break;
       case 2: obstacleTop.addImage(obsTop2);
               break;
       default: break;
     }
    
     //atribuir dimensão e tempo de vida ao obstáculo           
     obstacleTop.scale = 0.1;
     obstacleTop.lifetime = 100;
     obstacleTop.depth = balloon.depth;
    balloon.depth = balloon.depth + 1;
    //acrescentar cada obstáculo ao grupo
     obstaclesTopGroup.add(obstacleTop);
  }


  if (frameCount % 60 === 0){
    var obstacleBottom = createSprite(400,350,40,50);
    obstacleBottom.velocityX = -4
   // obstacleBottom.x = Math.round(random(10,100))
  var rand = Math.round(random(1,3));
  switch(rand) {
    case 1: obstacleBottom.addImage(obsBottom1);
            break;
    case 2: obstacleBottom.addImage(obsBottom2);
            break;
            case 3: obstacleBottom.addImage(obsBottom3);
            break;
    default: break;
  }
 
  //atribuir dimensão e tempo de vida ao obstáculo           
  obstacleBottom.scale = 0.07;
  obstacleBottom.lifetime = 100;
  obstacleBottom.depth = balloon.depth;
 balloon.depth = balloon.depth + 1;
 //acrescentar cada obstáculo ao grupo
 obstacleBottomGroup.add(obstacleBottom);
 }
}