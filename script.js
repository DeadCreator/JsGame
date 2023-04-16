const player = document.querySelector(".player")
const enemy = document.querySelector(".enemy")
const startGame = document.querySelector(".startGame")
const ground = document.querySelector(".ground")
const background = document.querySelector(".background")
const gameWindow = document.querySelector(".game-window")
const menuWindow = document.querySelector(".game-menu")
const enemyBottom = 20
let enemyX = 300
let playerX = 30
const playerWidth = 8
const enemyWidth = 8
let gameStarted = false
let playerBottom = 20
let isJumping = false

startGame.addEventListener("click", () => {
    menuWindow.style.display = "none"
    enemy.style.left = 300 + "vh"
    player.style.bottom = 20 + "vh"
    gameStarted = true
    Move()
})

const jump = () => {
    if (!isJumping && gameStarted) {
        isJumping = true
        let timerUpId = setInterval(() => {
            playerBottom += 6
            playerBottom *= 0.90
            player.style.bottom = playerBottom + 'vh'

            if (playerBottom >= 44) {
                clearInterval(timerUpId)
                playerBottom = Math.floor(playerBottom)
                let timerDownId = setInterval(() => {
                    playerBottom -= 1.5
                    player.style.bottom = playerBottom + 'vh'
                    if (playerBottom <= 20 || !gameStarted) {
                        clearInterval(timerDownId)
                        isJumping = false
                    }
                }, 20)
            }
        }, 20)
    }
}

let backgroundX = 0

const Move = () => {
    if (gameStarted) {
        let timerUpId = setInterval(() => {
            enemyX-= 0.4
            enemy.style.left = enemyX + 'vh'

            background.style.backgroundPositionX = backgroundX + "vh"
            ground.style.backgroundPositionX = backgroundX + "vh"
            backgroundX -= 0.4

            if ((enemyX <= playerX + playerWidth) &&
                (playerBottom <= enemyBottom + 9) &&
                (enemyX + enemyWidth >= playerX)) {
                gameStarted = false
                player.style.bottom = 20 + "vh"
                clearInterval(timerUpId)

            }

            if (enemyX <= -10) {
                enemyX = Math.random() * 100 + 300
                enemy.style.left = enemyX + "vw"
            }

        }, 5)
    }
}





gameWindow.addEventListener("click", () => {
    jump()
})

background.addEventListener("touchstart", () => {
    //jump()
})