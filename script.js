const squares = document.querySelectorAll(".square")
const winMessage = document.querySelector(".winMessage")
const playerTurnSpan = document.querySelector(".playerTurn")
const countSpan = document.querySelector(".counter")
const replayBtn = document.querySelector(".replayBtn")
replayBtn.style.visibility = "hidden";

const circleAudio = new Audio("./Project_Audio/circleAudio.mp3")
const crossAudio = new Audio("./Project_Audio/crossAudio.mp3")
const winAudio = new Audio("./Project_Audio/winAudio.mp3")
const replayAudio = new Audio("./Project_Audio/replay.mp3")
replayAudio.volume = 0.5;

let numOfPlays = 0 
let circleStr = [];
let crossStr = [];
let isWinner = false
let isDraw = false

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

for (let i = 0; i < squares.length; i++){
    squares[i].setAttribute("data-number", i);
}

for (let square of squares){
    square.addEventListener("click", handlePlay)
}

replayBtn.addEventListener("click", handleReplay)

function isEven(){
    return(numOfPlays % 2 === 0)
}

function handlePlay(event){
    if(isEven()){
        circleAudio.play();
        event.target.classList.add("flipAnimate");
        event.target.style.backgroundImage = "url(./Project_Images/circle.png)"
        circleStr.push(event.target.getAttribute("data-number"));
    } else{
        crossAudio.play();
        event.target.classList.add("flipAnimate");
        event.target.style.backgroundImage = "url(./Project_Images/cross.png)"
        crossStr.push(event.target.getAttribute("data-number"));
    }
    numOfPlays ++
    hasWon()
    hasDraw()
    if (isWinner === true || isDraw === true){
        replayBtn.style.visibility = "visible";
        }
    if (isWinner === false && isDraw === false){
        if(isEven()) {
            playerTurnSpan.innerText = "circle's turn";
        } else{
            playerTurnSpan.innerText = "cross's turn";
        }
    }
    event.target.removeEventListener("click", handlePlay);
}

function hasWon(){
    for (let winArr of winningCombos){
        let circleCount = 0
        for (num of winArr){
            let circleSquaresArr = circleStr.map(Number);
            if(circleSquaresArr.includes(num)){
                circleCount++
            } 
            if (circleCount === 3){
                isWinner = true
                playerTurnSpan.innerText = ("")
                winMessage.innerText = ("CIRCLE WINS!")
                winAudio.play();
                for (let square of squares){
                    square.removeEventListener("click", handlePlay);
                    } 
            }
        }
        let crossCount = 0
        for (num of winArr){
            let crossSquaresArr = crossStr.map(Number);
            if(crossSquaresArr.includes(num)){
                crossCount++
            } 
            if (crossCount === 3){
                isWinner = true
                playerTurnSpan.innerText = ("")
                winMessage.innerText = ("CROSS WINS!")
                winAudio.play();
                for (let square of squares){
                square.removeEventListener("click", handlePlay);
                }
            }
        }
    }
}

function hasDraw(){
    if (numOfPlays === 9 && isWinner === false){
        isDraw = true
        playerTurnSpan.innerText = ("It's a tie")
    }
}

function handleReplay(){
    replayAudio.play();
    replayBtn.style.visibility = "hidden";
    playerTurnSpan.innerText = "circle's turn"
    winMessage.innerText = ("")
    isDraw = false
    isWinner = false
    numOfPlays = 0
    circleStr = []
    crossStr = []
    for (let square of squares){
        square.style.backgroundImage = "";
        square.addEventListener("click", handlePlay)
        square.classList.remove("flipAnimate");
    }
}