
const squares = document.querySelectorAll(".square")

const replayBtn = document.querySelector(".replayBtn")
replayBtn.style.visibility = "hidden";
const playerTurnSpan = document.querySelector(".playerTurn")
const countSpan = document.querySelector(".counter")

let numOfPlays = 0 
let circleStr = [];
let crossStr = [];
let isWinner = false
let isDraw = false

const circleSound = new Audio("./Project_Audio/circleAudio.mp3")
const crossSound = new Audio("./Project_Audio/crossAudio.mp3")
const replayAudio = new Audio("./Project_Audio/replay.mp3")

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
        circleSound.play();
        event.target.classList.add("flipAnimate");
        event.target.style.backgroundImage = "url(./Project_Images/circle.png)"
        
         circleStr.push(event.target.getAttribute("data-number"));
         
    } else{
        crossSound.play();
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
                console.log("circle wins!")
        
                playerTurnSpan.innerText = ("circle wins!")
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
                console.log("cross wins!")

                playerTurnSpan.innerText = ("cross wins!")
                for (let square of squares){
                square.removeEventListener("click", handlePlay);
                }
            }
        }
    }
}


function hasDraw(){
    if (numOfPlays === 9 && isWinner === false){
        console.log("it's a tie")
        isDraw = true
        playerTurnSpan.innerText = ("It's a tie")
    return
    }
}


function handleReplay(){
    replayAudio.play();
    replayBtn.style.visibility = "hidden";
    isDraw = false
    isWinner = false
    numOfPlays = 0
    playerTurnSpan.innerText = "circle's turn"
    circleStr = []
    crossStr = []
    for (let square of squares){
    square.style.backgroundImage = "";
    square.addEventListener("click", handlePlay)
    }
}