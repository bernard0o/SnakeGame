const board = document.getElementById("game-board");
let snakeBody = [
    {x: 5, y: 5},
    {x: 5, y: 4},
    {x: 5, y: 3},
    {x: 5, y: 2},
]

let points = 0;

document.getElementById("points").textContent = `${points}`;
document.getElementById("points2").textContent = `${points}`;

let xfood = 0, yfood = 0;

function start(){
    updateSnake();
    putFood();
    game();
}

function updateSnake(){
    const snake = document.querySelectorAll(".snake");
    snake.forEach(item => {
        item.remove();
    });

    for (let i = 0; i < snakeBody.length; i++){
        let div = document.createElement("div");
        div.className = "snake";
        div.style.gridColumnStart = snakeBody[i].y;
        div.style.gridRowStart = snakeBody[i].x;
        board.appendChild(div);
    }
}

function move(eixo, num){    
    snakeBody.unshift({...snakeBody[0]});
    snakeBody[0][eixo] += num;
    snakeBody.pop();
    snakeOnSnake();
    updateSnake();
}

function putFood(){
    let randomNum = Math.round(Math.random() * 3);
    let div = document.createElement("div");
    div.id = "food";
    xfood = Math.round(Math.random() * 20);
    yfood = Math.round(Math.random() * 20);
    div.style.gridColumnStart = yfood;
    div.style.gridRowStart = xfood;
    if (randomNum == 1){
        div.style.backgroundImage = "url(strawberry.png)";
    } else if(randomNum == 2){
        div.style.backgroundImage = "url(burguer.webp)";
    } else{
        div.style.backgroundImage = "url(icecream.png)";
    }
    board.appendChild(div);
}

function clearAllIntervals(){
    const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);
    for (let i = 2; i < interval_id; i++) {
        window.clearInterval(i);
    }
}

function snakeOnSnake(){
    // If Snake is on Snake
    for (let i2 = 0; i2 < snakeBody.length - 1; i2++){
        for (let i = i2+1; i < snakeBody.length; i++){
            if (snakeBody[i2].y == snakeBody[i].y && snakeBody[i2].x == snakeBody[i].x){
                document.getElementById("game-over").style.display = "flex";
                clearInterval(1);
                clearAllIntervals;
            }
        }
    }
}


function game(){
    let lastKey = "";
    // Snake Movement
    document.addEventListener("keyup", (keyPressed) => {
        document.getElementById("hint").style.display = "none";
        if (keyPressed.key == "ArrowLeft"){
            if (lastKey != "ArrowLeft" && lastKey != "ArrowRight"){
                clearAllIntervals();
                setInterval(() => {
                    updateSnake();
                    move("y", -1);
                }, 300);
                lastKey = "ArrowLeft";
            }
        } else if(keyPressed.key == "ArrowRight"){
            if (lastKey != "ArrowRight" && lastKey != "ArrowLeft"){
                clearAllIntervals();
                setInterval(() => {
                    updateSnake();
                    move("y", 1);
                }, 300);
                lastKey = "ArrowRight";
            }
        } else if(keyPressed.key == "ArrowUp"){
            if (lastKey != "ArrowUp" && lastKey != "ArrowDown"){
                clearAllIntervals();
                setInterval(() => {
                    updateSnake();
                    move("x", -1);
                }, 300);
                lastKey = "ArrowUp";
            }
        } else if(keyPressed.key == "ArrowDown"){
            if (lastKey != "ArrowUp" && lastKey != "ArrowDown"){
                clearAllIntervals();
                setInterval(() => {
                    updateSnake();
                    move("x", 1);
                }, 300);
                lastKey = "ArrowDown";
            }
        }
    })

    // Detecting

    setInterval(() => {
        // If Snake is on food
        if (snakeBody[0].x == xfood && snakeBody[0].y == yfood){
            document.getElementById("food").remove();
            putFood();
            points++;
            if (points == 5){
                document.body.style.backgroundColor = "black";
                board.style.backgroundColor = "darkslategray";
                board.style.border = "1px solid white";
                document.getElementById("points").style.color = "white";
                document.getElementById("containerPoints").style.color = "white";
            }
            document.getElementById("points").textContent = ` ${points}`;
            document.getElementById("points2").textContent = ` ${points}`;
            snakeBody.push({...snakeBody[snakeBody.length - 1]});
        }

        // If Snake is on border
        if (snakeBody[0].x <= 0 || snakeBody[0].x > 20 || snakeBody[0].y <= 0 || snakeBody[0].y > 20){
            document.getElementById("game-over").style.display = "flex";
            clearInterval(0);
            clearAllIntervals();
        }        
    }, 100);
}


window.onload = () => {
    start();
}