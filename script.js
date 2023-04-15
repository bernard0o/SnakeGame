const board = document.getElementById("game-board");
let snakeBody = [
    {x: 5, y: 5},
    {x: 5, y: 4},
]

let points = 0;

document.getElementById("points").textContent = " " + `${points}`;
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
    snakeBody.pop();
    snakeBody.unshift({...snakeBody[0]});
    snakeBody[0][eixo] += num;
    updateSnake();
}

function putFood(){
    let div = document.createElement("div");
    div.id = "food";
    xfood = Math.round(Math.random() * 20);
    yfood = Math.round(Math.random() * 20);
    div.style.gridColumnStart = yfood;
    div.style.gridRowStart = xfood
    board.appendChild(div);
}

function clearAllIntervals(){
    const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);
    for (let i = 2; i < interval_id; i++) {
        window.clearInterval(i);
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
            document.getElementById("points").textContent = ` ${points}`;
            document.getElementById("points2").textContent = ` ${points}`;
            snakeBody.push({...snakeBody[snakeBody.length - 1]})
        }

        // If Snake is on border
        if (snakeBody[0].x <= 0 || snakeBody[0].x > 20 || snakeBody[0].y <= 0 || snakeBody[0].y > 20){
            document.getElementById("game-over").style.display = "flex";
        }
    }, 100);
}


start();