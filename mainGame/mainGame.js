
let yPositionYellowBox = 200;
let xPositionYellowBox = 0;

let yPositionRedBox;
let xPositionRedBox;

let redBox = document.querySelector('#redBox');
let brownBox = document.querySelector('#brownBox');
let brownBox2 = document.querySelector('#brownBox2');
let yellowBox = document.querySelector('#yellowBox');
let score = document.querySelector('#score')
let lives = document.querySelector('#lives')

let posBrownBox = brownBox.getBoundingClientRect().top;
let posBrownBox2 = brownBox2.getBoundingClientRect().top;

let randomPositionX;
let randomPositionY;

let allUsers = JSON.parse(localStorage.getItem('users'));
let player = JSON.parse(localStorage.getItem('player'));

let scoreCounter = player.score || 0;
let livesCounter = player.lives || 100;
let countDown = player.timer || 50;

let arrImoje = ["🍕", "🍧", "🧁", "🍫", "🍬", "🍭", "🍡", "🍮"];

let time = setInterval(timer, 1000);

let plusTen = document.querySelector('#plusTen');
let highscore = localStorage.getItem('highScore');

document.querySelector('#highScore').textContent = `🏆  ${highscore}`;
document.querySelector('#player').textContent = `🧍‍♂️ ${player.fName}  ${player.lName}`;
document.querySelector('#timer').textContent = `⏱  ${player.timer}`;
lives.textContent = '💖 ' + livesCounter + '%';
score.textContent = '💰 ' + scoreCounter;

randomPosition(redBox);

redBox.animate([{ transform: 'scale(1)', opacity: 1, oofset: 0 },
{ transform: 'scale(.9)', opacity: .7, oofset: .2 },
{ transform: 'scale(1)', opacity: 1, oofset: 1 },
], {
    duration: 1000,
    iterations: Infinity,
}
)

let move = setInterval(moveUp1, 70);
let move2 = setInterval(moveUp2, 70);

function moveUp1() {
    if (posBrownBox <= 0) {
        posBrownBox = 450
        brownBox.style.top = posBrownBox + 'px';
        return
    } else {
        posBrownBox -= 5;
        brownBox.style.top = posBrownBox + 'px';
    }
    touch(redBox);
    touch(brownBox);
    touch(brownBox2);
}

function moveUp2() {
    if (posBrownBox2 <= 0) {
        posBrownBox2 = 450;
        brownBox2.style.top = posBrownBox2 + 'px';
        return
    } else {
        posBrownBox2 -= 5;
        brownBox2.style.top = posBrownBox2 + 'px';
    }
}

window.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowRight":
            right()
            break;
        case "ArrowLeft":
            left()
            break;
        case "ArrowUp":
            up()
            break;
        case "ArrowDown":
            down()
            break;
    }
});

function up() {
    if (yPositionYellowBox <= 0) {
        yPositionYellowBox = 440;
        yellowBox.style.top = yPositionYellowBox + 'px';
        return;
    }
    yPositionYellowBox -= 10;
    yellowBox.style.top = yPositionYellowBox + 'px';
}

function down() {
    if (yPositionYellowBox >= 450) {
        yPositionYellowBox = 10;
        yellowBox.style.top = yPositionYellowBox + 'px';
        return
    }
    yPositionYellowBox += 10;
    yellowBox.style.top = yPositionYellowBox + 'px';

}

function right() {
    if (xPositionYellowBox >= 750) {
        xPositionYellowBox = 10;
        yellowBox.style.left = xPositionYellowBox + 'px';
        return
    }
    xPositionYellowBox += 10;
    yellowBox.style.left = xPositionYellowBox + 'px';
}

function left() {
    if (xPositionYellowBox <= 0) {
        xPositionYellowBox = 740;
        yellowBox.style.left = xPositionYellowBox + 'px';
        return
    }
    xPositionYellowBox -= 10;
    yellowBox.style.left = xPositionYellowBox + 'px';
}

function randomImoje() {
    return Math.floor(Math.random() * 7)
}

function randomPosition(colorBox) {
    randomPositionX = Math.floor(Math.random() * 75) * 10;
    randomPositionY = Math.floor(Math.random() * 45) * 10;
    colorBox.style.left = randomPositionX + 'px';
    colorBox.style.top = randomPositionY + 'px';
}

function touch(colorBox) {
    let yellowPos = yellowBox.getBoundingClientRect();
    let boxPos = colorBox.getBoundingClientRect();
    if (yellowPos.left <= boxPos.right && yellowPos.right >= boxPos.left &
        yellowPos.bottom >= boxPos.top && yellowPos.top <= boxPos.bottom) {
        if (colorBox == redBox) {
            document.querySelector('#redBox').textContent = arrImoje[randomImoje()];
            youWin()
        } else {
            youLoose()
        }
    }
}

function youWin() {
    randomPosition(redBox);
    scoreCounter++;
    player.score = scoreCounter;
    score.textContent = '💰 ' + scoreCounter;
    new Audio('../sound/correct-choice.mp3').play();

    setTimeout(function displayNone() {
        plusTen.style.display = 'none';
    }, 800)
    if (scoreCounter % 5 == 0) {
        new Audio('../sound/yeah.mp3').play();
        countDown += 10;
        plusTen.style.display = 'inline';
        plusTen.textContent = '+10 Sec';
    }
    updateUser()
}

function youLoose() {
    randomPosition(brownBox);
    randomPosition(brownBox2);
    livesCounter -= 10;
    player.lives = livesCounter;
    lives.textContent = '💖 ' + livesCounter + '%';
    new Audio('../sound/teleport.mp3').play();

    if (livesCounter == 0) {
        gameOver()
    }
    updateUser()
}
function updateUser() {
    for (let i = 0; i < allUsers.length; i++) {
        if (player.fName == allUsers[i].fName && player.lName == allUsers[i].lName) {
            allUsers[i] = player;
        }
    }
    localStorage.setItem('users', JSON.stringify(allUsers));
}

function newGame() {
    scoreCounter = 0;
    livesCounter = 100;
    player.lives = 100;
    player.score = 0;
    player.timer = 50;
    countDown = 50;
    yPositionYellowBox = 200;
    xPositionYellowBox = 0;
    yellowBox.style.top = yPositionYellowBox + 'px';
    yellowBox.style.left = xPositionYellowBox + 'px';
    lives.textContent = '💖 ' + player.lives + '%';
    score.textContent = '💰 ' + player.score;
    updateUser()
}


function timer() {
    document.querySelector('#timer').textContent = '⏱ ' + countDown;
    player.timer = countDown;
    countDown--;
    if (countDown < 5) {
        new Audio('../sound/time-passing.mp3').play();
    }
    if (countDown < 0) {
        gameOver()
        document.querySelector('#timer').textContent = '⏱ ' + 0;
    }
}

function gameOver() {
    localStorage.setItem('finelScore', player.score);
    newGame()
    localStorage.setItem('player', JSON.stringify(player));
    location.href = '../gameover.html';
}
