const board = document.getElementById("game-board");
let snakeBody = [
    {x: 5, y: 5},
    {x: 5, y: 4},
    {x: 5, y: 3},
    {x: 5, y: 2},
    {x: 5, y: 1},
    {x: 5, y: 0},
]

let points = 0;

document.getElementById("points").textContent = `${points}`;
document.getElementById("points2").textContent = `${points}`;

let xfood = 5, yfood = 5;

function start(){
    updateSnake();
    putFood();
    game();
}

function updateSnake(){
    //Remove all snake and creates a new one with new position.
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
    //Removes the last snake piece and add a new one
    snakeBody.unshift({...snakeBody[0]});
    snakeBody[0][eixo] += num;
    snakeBody.pop();
    snakeOnSnake();
    updateSnake();
}

function putFood(){
    // If food spawns over the snake, it generates another x and y for food.
    for(let i = 0; i < snakeBody.length; i++){
        while (snakeBody[i].x == xfood && snakeBody[i].y == yfood){
            xfood = Math.round(Math.random() * 20);
            yfood = Math.round(Math.random() * 20);
            }
        };

        // Creating food div and applying styles.
        let randomNum = Math.round(Math.random() * 3);
        let div = document.createElement("div");
        div.id = "food";
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
        if (keyPressed.key == "a"){
            if (lastKey != "a" && lastKey != "d"){
                clearAllIntervals();
                setInterval(() => {
                    move("y", -1);
                    updateSnake();
                }, 200);
                lastKey = "a";
            }
        } else if(keyPressed.key == "d"){
            if (lastKey != "d" && lastKey != "a"){
                clearAllIntervals();
                setInterval(() => {
                    move("y", 1);
                    updateSnake();
                }, 200);
                lastKey = "d";
            }
        } else if(keyPressed.key == "w"){
            if (lastKey != "w" && lastKey != "s"){
                clearAllIntervals();
                setInterval(() => {
                    move("x", -1);
                    updateSnake();
                }, 200);
                lastKey = "w";
            }
        } else if(keyPressed.key == "s"){
            if (lastKey != "w" && lastKey != "s"){
                clearAllIntervals();
                setInterval(() => {
                    move("x", 1);
                    updateSnake();
                }, 200);
                lastKey = "s";
            }
        }
    })

    // Detecting

    setInterval(() => {
        // If Snake eats food
        // Remove the food and add a new one
        if (snakeBody[0].x == xfood && snakeBody[0].y == yfood){
            document.getElementById("food").remove();
            putFood();
            points++;
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
    }, 50);
}


window.onload = () => {
    start();
}