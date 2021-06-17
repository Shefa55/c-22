const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

let engine;
let world;

var ground,ball2;

function setup() {
  createCanvas(400,400);
  engine = Engine.create();
  
  world = engine.world;
  rectMode(CENTER);
  ellipseMode(RADIUS);
  
  ground = new Ground(200,390,400,20)


  var ball_options = {restitution: 0.95}
  ball = Bodies.circle(200,100,20,ball_options)
  World.add(world,ball) 

  ball2 = Bodies.circle(200,170,15,ball_options)
  World.add(world,ball2)


  con1= Matter.Constraint.create({
    stiffness:0.1,
    length:100,
    pointA:{x:200,y:20},
    bodyB:ball,
  })
  World.add(world,con1)

  con2 = Matter.Constraint.create({
    stiffness:0.1,
    length:70,
    bodyA:ball,
    bodyB:ball2
  })
  World.add(world,con2)

}

function draw() 
{
  background(51);
  Engine.update(engine);

  ground.show()


  ellipse(ball.position.x,ball.position.y,20);
  push()
  stroke("blue");
  strokeWeight(4);
  line(con1.pointA.x,con1.pointA.y,ball.position.x,ball.position.y-20);
  pop()

  ellipse(ball2.position.x,ball2.position.y,15)
  push()
  stroke("green");
  strokeWeight(4);
  line(ball.position.x,ball.position.y+20,ball2.position.x,ball2.position.y-15)
  pop()


}

function upforce(){
  Matter.Body.applyForce(ball, {x:0, y:0}, {x:0,y:-0.05})
}

function rightforce(){
  Matter.Body.applyForce(ball, {x:0, y:0}, {x:0.05,y:0})
}



function keyPressed(){
  if(keyCode === RIGHT_ARROW){
    Matter.Body.applyForce(ball, {x:0, y:0}, {x:0.05,y:0})
  }
}