//board
var blockSize = 25;
var rows = 20;
var columns = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = columns * blockSize;
    context = board.getContext("2d"); //used to draw on board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10); //run update function 10 times a second
}

function update(){
    //draw board
    context.fillStyle="black";
    context.fillRect(0,0, board.width, board.height);

    //draw Food
    context.fillStyle="Red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    //check if snake eats food
    if(snakeX  == foodX && snakeY == foodY){
        snakeBody.push([foodX,foodY]);
        placeFood();
    }

    //draw Snake
    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
}

function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft"&& velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight"&& velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function placeFood(){
    //random number for X&Y coordinates
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}