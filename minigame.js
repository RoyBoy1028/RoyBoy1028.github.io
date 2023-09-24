const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById("jump-score");
const startBtn = document.getElementById("jump-start-btn");
const reStartBtn = document.getElementById("jump-restart-btn");

const player_img = document.getElementById("player-img");
const enemy_img = document.getElementById("enemy-img");
const player_speed = 5;
const enemy_speed = 8;

// Characterproperties
const player = {
    x: 50,
    y: canvas.height - 50,
    width: 40,
    height: 40,
    speed: player_speed,
    jumping: false
};

// Enemy properties
const enemy = {
    x: canvas.width,
    y: 0,
    width: 20,
    height: 20,
    speed: enemy_speed,
};

// Game variables
let score = 0;
let gameInterval;
let gameOver = false;

const drawPlayer = () => {
    // ctx.fillStyle = 'green';
    // ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.drawImage(player_img, player.x, player.y, player.width, player.height);
}

const drawEnemy = () => {
    // ctx.fillStyle = 'red';
    // ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    ctx.drawImage(enemy_img, enemy.x, enemy.y, enemy.width, enemy.height);
}

const update = () => {
    if(gameOver) {
        return;
    }

    ctx.clearRect(0,0,canvas.width, canvas.height);

    // Rendering
    drawPlayer();
    if (player.jumping) {
        player.y -= player.speed *2;
    } else {
        if(player.y >= canvas.height - 50) {
            player.y = canvas.height-50;
        } else {
            player.y += player.speed * 2;
        }
    }
    drawEnemy();
    enemy.x -= enemy.speed;

    //Hitbox and collision
    if (
        player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y
    ) {
        gameOver = true;
        document.getElementById("jump-game-score").innerText = score;
        document.getElementById("Gameover").style.display = "flex";
        clearInterval(gameInterval);
    }

    // Score
    if (enemy.x < 0) {
        enemy.x = canvas.width;
        enemy.y = (Math.floor(Math.random() * 3) + 1) * 50
        score++;
        if(score !== 0 && score % 3 === 0) {
            enemy.speed++;
        }
            scoreElement.textContent = "score : " + score;
    }
}

const startGame = () => {
    score = 0;
    scoreElement.textContent = 'Score : 0';
    gameOver = false;
    enemy.x = canvas.width;
    enemy.y = canvas.height - 50;
    enemy.speed = enemy_speed;
    player.x = 50;
    player.y - canvas.height - 50;
    gameInterval = setInterval(update, 1000/60);
}

document.addEventListener('keydown', (event) => {
    if(event.keyCode === 32) {
        if(player.y < canvas.height-50) {
            return;
        } else {
            player.jumping = true;
        }
        setTimeout(() => {
            player.jumping = false;
        }, 200);
    }
})

startBtn.addEventListener("click", ()=>{
    document.querySelector(".jump-game-wrap").style.display = 'none';
    startGame();
})

reStartBtn.addEventListener("click", () => {
    document.getElementById("Gameover").style.display = 'none';
    startGame();
})

window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
    }
});