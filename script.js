const player = document.querySelector(".player")
const enemy = document.querySelector(".enemy")
const startGame = document.querySelector(".startGame")
const ground = document.querySelector(".ground")
const background = document.querySelector(".background")
const gameWindow = document.querySelector(".game-window")
const menuWindow = document.querySelector(".game-menu")
const info = document.querySelector(".info")
const enemyBottom = 20
let entityX = 300
let playerX = 30
const playerWidth = 8
const enemyWidth = 8
let gameStarted = false
let playerBottom = 20
let isJumping = false
let speed = 100
let t = Date.now()
let timePassed
let movement = 0

const Move = () => {

    timePassed = (Date.now() - t) / 1000
    t = Date.now()
    let fps = Math.round(1 / timePassed)
    info.innerHTML = `FPS: ${fps}`

    entityX -= (speed * timePassed)
    background.style.backgroundPositionX = entityX + "vh"
    ground.style.backgroundPositionX = entityX + "vh"
    enemy.style.left = entityX + "vh"


    if ((entityX <= playerX + playerWidth) &&
        (playerBottom <= enemyBottom + 9) &&
        (entityX + enemyWidth >= playerX)) {
        console.log('stop', playerBottom)
        gameStarted = false
        gameOver()
    }

    if (entityX <= -20) {
        entityX = 300
    }

    if (gameStarted) {
        window.requestAnimationFrame(Move)
        window.requestAnimationFrame(gravity)
    }
};


startGame.addEventListener("click", () => {
    menuWindow.style.display = "none"
    enemy.style.left = 300 + "vh"
    player.style.bottom = 20 + "vh"
    gameStarted = true
    Move()
    gravity()
})

const jump = async () => {
    if (!isJumping) {
        isJumping = true
        let timerUpId = setInterval(() => {
            if (playerBottom >= 44 || !gameStarted) {
                clearInterval(timerUpId)
                isJumping = false
            }

            playerBottom += 6
            playerBottom *= 0.90
            player.style.bottom = playerBottom + 'vh'

        }, 20)
    }
}

const gravity = () => {
    if (playerBottom > 20 && !isJumping) {
        playerBottom -= 1.3
        player.style.bottom = Math.floor(playerBottom) + 1 + "vh"
    }
}




const gameOver = () => {
    console.log('shirt')
    menuWindow.style.display = "flex"
    startGame.innerHTML = "Restart Game"
}

gameWindow.addEventListener("click", () => {
    if (!isJumping && gameStarted && playerBottom <= 20) {
        jump()
    }
})





// background.addEventListener("touchstart", () => {
//     if (!isJumping) {
//         jump()
//     }
// })