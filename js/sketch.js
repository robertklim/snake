var scl = 30;
var snake;
var food;
//var score = 0;

function setup() {
    createCanvas(600, 600);
    frameRate(5);
    
    snake = new Snake();
    food = new Food();
    score = new Score();

    score.getBestScore();
}

function draw() {
    background(30);

    snake.changeDirection();
    if (snake.eat(food.getPos())) {
        food.pickLocation();
    }
    snake.update();
    snake.show();

    food.show();

    score.show(snake.tail.length - 1);

    if (snake.isDead()) {
        textSize(50);
        fill("red");
        text("GAME OVER!", width/2-150, height/2);
    }

}