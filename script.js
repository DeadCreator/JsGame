const player = document.querySelector(".player")
const enemy = document.querySelector(".enemy")
const startGame = document.querySelector(".startGame")
const enemyBottom = 18.5
let gameStarted = true
let playerBottom = 18.5
let enemyLeft = 100
let playerLeft = 10
let isJumping = false
let widthBetween, heightBetween

startGame.addEventListener("click", () => {
    gameStarted = true
    enemyMove()
})

const jump = () => {
    if (!isJumping && gameStarted) {
        isJumping = true
        let timerUpId = setInterval(() => {
            if (playerBottom >= 40) {
                clearInterval(timerUpId)
                playerBottom = Math.floor(playerBottom)
                let timerDownId = setInterval(() => {
                    if (playerBottom <= 20) {
                        clearInterval(timerDownId)
                        isJumping = false
                    }
                    playerBottom -= 1
                    player.style.bottom = playerBottom + 'vh'
                }, 20)
            }
            playerBottom += 5
            playerBottom *= 0.90
            player.style.bottom = playerBottom + 'vh'
            console.log(playerBottom)
        }, 20)
    }
}

const enemyMove = () => {
    if (gameStarted) {
        let timerUpId = setInterval(() => {
            widthBetween = enemyLeft - playerLeft - 6
            heightBetween = enemyBottom + 5 - playerBottom
            if (widthBetween <= 0 && heightBetween == 0) {
                clearInterval(timerUpId)
                gameStarted = false
                console.log(widthBetween)
            }

            if (enemyLeft == -10) {
                enemyLeft = 100
                enemy.style.left = enemyLeft + "vh"
            }
            enemyLeft -= 1
            enemy.style.left = enemyLeft + 'vh'
            console.log(playerBottom)
        }, 20)
    }
}



document.addEventListener("click", () => {
    jump()
})

document.addEventListener("touchstart", () => {
    jump()
})