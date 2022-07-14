
let canvas = document.getElementById("bb");
let ctx = canvas.getContext("2d");;        
let rows = 25;
let cols = 25;
let snake = [
    {x:20,y:23}
];
let food;
let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;
let direction = "";
var aet = false;
let score = -1;
let highscore = 0;
if(JSON.parse(localStorage.getItem("highscore"))){
    highscore = parseInt(JSON.parse(localStorage.getItem("highscore")));
}


setFood();

t = setInterval(gameLoop, 200);
document.addEventListener("keydown", keyDown);
draw();


function draw(){
    ctx.fillStyle = "rgba(68, 68, 68, 0.297)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(47, 227, 62, 0.692)";
    snake.forEach(part => add(part.x, part.y));

    document.getElementById("sc").innerText = "Score: " + score;

    ctx.fillStyle = "white";
    add(food.x, food.y);

    requestAnimationFrame(draw);
}

function setFood(){
    score++;
    let randX = Math.floor(Math.random() * cols);
    let randY = Math.floor(Math.random() * rows);

    food = {x:randX, y:randY};

}

function add(x, y){
    ctx.fillRect(cellWidth*x, cellHeight*y, cellWidth-1, cellHeight-1);

}

function direct(){
    for(var i = snake.length-1; i > 0; i--){
        const part = snake[i];
        const lastPart = snake[i-1];
        part.x = lastPart.x;
        part.y = lastPart.y;
    }
}

function err(){
    if(JSON.parse(localStorage.getItem("highscore"))){
        if(score > highscore){
            localStorage.removeItem("highscore");
            localStorage.setItem("highscore", JSON.stringify(score));
            highscore = JSON.parse(localStorage.getItem("highscore"));
        }
    }
    else{
        if(score > highscore){
            localStorage.setItem("highscore", JSON.stringify(score));
            highscore = JSON.parse(localStorage.getItem("highscore"));
        }
    }
    document.getElementById("card").style.display = "block";
    console.log("score: "+score+", highscore: "+ highscore);
    document.getElementById("highscore").innerText = "Highscore: " + highscore;
    document.getElementById("score").innerText = "Scored: " + score;
    clearInterval(t);
}

function gameLoop(){
        if(aet){
            snake = [{
                    x: snake[0].x,
                    y: snake[0].y
                }, ...snake];

            aet = false;
        }
        direct();

        switch(direction){
        case 37:
            snake[0].x--;
        break;
        case 38:
            snake[0].y--;
        break;
        case 39:
            snake[0].x++;
        break;
        case 40:
            snake[0].y++;
        break;
        }

        if(snake[0].x == food.x &&
        snake[0].y == food.y ){
            aet = true;
            setFood();
        }
    
        if(snake[0].x >= cellWidth+4 || snake[0].x <= 0 || snake[0].y >= cellHeight+4 || snake[0].y <= 0 ){
            err();
        }
}

function keyDown(e){
    switch(e.keyCode || e ){
        case 37:
             setDir(37);
            break;
        case 38:
            setDir(38);         
            break;
        case 39:
            setDir(39);          
            break;
        case 40:
            setDir(40);                
            break;
    }
}

function setDir(dir){
    direction = dir;
}


