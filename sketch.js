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


function setup() {
   createCanvas(1000, 1000);
   // x, y, height, width, vx, vy, lifetime, color
   snakes.push(new Snake(470, 470, 30, 30, 4, 0, 180, "#CE9178"))
}

var counter = 0;

function draw() {
   background(220);

   // ---------- UPDATE ----------
   counter++
   for (var snake of snakes) {
      snake.x += snake.vx;
      snake.y += snake.vy;

      if (counter % 10 == 0){
         snake.rectangles.push(new Rechthoek(snake.x, snake.y))
      }

      if(counter % 100 == 0){
         snake.vx = 0;
         snake.vy = 0;

         var vel = random(2, 5)
         
         if(random(0, 1) > 0.5){
            vel *= -1
         }

         if(random(0, 1) > 0.5){
            snake.vx = vel;
            
         } else {
            snake.vy = vel
         }
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
