const player = document.querySelector(".player")
const enemy = document.querySelector(".enemy")
const startGame = document.querySelector(".startGame")
const ground = document.querySelector(".ground")
const background = document.querySelector(".background")
const gameWindow = document.querySelector(".game-window")
const menuWindow = document.querySelector(".game-menu")
//const info = document.querySelector(".info")
const scoreInfo = document.querySelector(".score")
const scoreKeyFrames = new KeyframeEffect(
    scoreInfo,
    [
        { color: "white" },
        { color: "lime" },
        { color: "white" },
        { color: "lime" },
        { color: "white" }
    ],
    { duration: 2000, fill: "forwards"}
)
const scoreAnim = new Animation(
    scoreKeyFrames,
    document.timeline
)

const playerKeyFrames = new KeyframeEffect(
    player,
    [
        { height: "6.5vh" },
        { height: "8vh" },
        { height: "6.5vh" },
        { height: "8vh" }
    ],
    { duration: 1000, fill: "forwards"}
)
const playerAnim = new Animation(
    playerKeyFrames,
    document.timeline
)

const enemyBottom = 20
const playerWidth = 8
let playerHeight = 8
const enemyWidth = 8

let entityX = 300
let playerX = 30
let gameStarted = false
let playerBottom = 20
let isJumping = false
let speed = 100
let t = Date.now()
let timePassed
let backgroundX = 300
let movement = 0
let score = 0

startGame.addEventListener("click", () => {
    enemy.style.left = 300 + "vh"
    player.style.bottom = 20 + "vh"
    menuWindow.classList.add("no-blur")
    score = 0
    gameStarted = true
    Move()
    gravity()
})

const Move = () => {
    score += 1
    scoreInfo.innerHTML = `Score: ${Math.floor(score / 10)}`


    if ((score / 10 ) % 100 == 0) {
        scoreAnim.play()
    }

    timePassed = (Date.now() - t) / 1000
    t = Date.now()
    let fps = Math.round(1 / timePassed)
    //info.innerHTML = `FPS: ${fps}`

    entityX -= (speed * timePassed)
    ground.style.backgroundPositionX = entityX + "vh"
    enemy.style.left = entityX + "vh"
    playerHeight = player.style.height
    console.log(playerHeight)


    if ((entityX <= playerX + playerWidth) &&
        (playerBottom <= enemyBottom + 9) &&
        (entityX + enemyWidth >= playerX)) {
        gameStarted = false
        gameOver()
    }

    if (entityX <= -20) {
        entityX = 300 + Math.random() * 50
    }

    if (gameStarted) {
        window.requestAnimationFrame(Move)
        window.requestAnimationFrame(gravity)
        background.style.backgroundPositionX = backgroundX + "vh"
        backgroundX -= 0.1
    }
};

const jump = async () => {
    if (!isJumping) {
        isJumping = true
        playerAnim.play()
        let timerUpId = setInterval(() => {
            if (playerBottom >= 40 || !gameStarted) {
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
        playerBottom -= 0.2
        playerBottom /= 1.03
        player.style.bottom = Math.floor(playerBottom) + 1 + "vh"
    }
    if (isJumping) {
        player.classList.add("squash")
    }

    if (playerBottom <= 20) {
        player.classList.remove("squash")
    }
}




const gameOver = () => {
    console.log('shirt')
    menuWindow.style.display = "flex"
    menuWindow.classList.remove("no-blur")
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