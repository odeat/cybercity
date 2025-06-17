class Snake {
   constructor(x, y, height, width, vx, vy, lifetime, color) {
      this.x = x;
      this.y = y;
      this.height = height;
      this.width = width;
      this.vx = vx;
      this.vy = vy;
      this.lifetime = lifetime;
      this.color = color;
      this.rectangles = [];
   }
   randomizeSpeed(){

      this.vx = 0;
      this.vy = 0;

      var vel = random(2, 5)  
      if(random(0, 1) > 0.5){
         vel *= -1
      }
      if(random(0, 1) > 0.5){
         this.vx = vel;
      } else {
         this.vy = vel
      }
   }
}

class Rechthoek {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.age = 0;
      this.deleted = false;
   }
}

let snakes = [];
let colors = ["#B5CEA8", "#9CDCFE", "#FFD70A", "#C586C0", "#56818F", "#4EC9B0", "#6A8A36"]

function setup() {
   createCanvas(windowWidth, windowHeight);
   // x, y, height, width, vx, vy, lifetime, color
   for(var i = 0; i < 20; i++){
      generateSnake()
   }
}

function generateSnake(){
   var newSnake = new Snake(random(0, 1000), random(0, 1000), 
      random(1, 30), random(15, 40), 4, 0, 180, random(colors))
      newSnake.randomizeSpeed()
      snakes.push(newSnake)
}

var counter = 0;

function draw() {
   background(0);

   // ---------- UPDATE ----------
   counter++

   if(counter % 100 == 0){
      generateSnake()
   }

   for (var snake of snakes) {
      snake.x += snake.vx;
      snake.y += snake.vy;

      if (counter % 10 == 0){
         snake.rectangles.push(new Rechthoek(snake.x, snake.y))
      }

      if(counter % 100 == 0){
         snake.randomizeSpeed()
      }

      for(let rectangle of snake.rectangles){ 
         rectangle.age++

         if(rectangle.age > snake.lifetime){
            rectangle.deleted = true;
         }
      }
      snake.rectangles = snake.rectangles.filter((r)=> r.deleted == false)
   }
   

   // ---------- RENDER ----------
   for (var snake of snakes) {
      for (var rectangle of snake.rectangles) {
         fill(snake.color)
         rect(rectangle.x, rectangle.y, snake.height, snake.width)
      }
   }
}
