//name variables
let squares = document.querySelectorAll(".square")
let numOfPlays = 0 
let replayBtn = document.querySelector(".replayBtn")
let playerTurnSpan = document.querySelector(".playerTurn")
let countSpan = document.querySelector(".counter")
// let circleImg = document.createElement("img");
// circleImg.src = "Project_Images/Circle\ \(1\).png";
// const computedStyleCircle = window.getComputedStyle(document.querySelector('.circle'));
// let circleBgImg = computedStyleCircle.getPropertyValue("background-image");


for (let i = 0; i < squares.length; i++){
    squares[i].setAttribute("data-number", i);
}

let circleSquaresStr = [];
let crossSquaresStr = [];

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

// listen for events
for (let square of squares){
    square.addEventListener("click", handlePlay)
}
replayBtn.addEventListener("click", handleReplay)
// // add some functions
function isEven(){
    return(numOfPlays % 2 === 0)
}

function handlePlay(event){
    if(isEven()){
        event.target.style.backgroundImage = "url(/Project_Images/circle.png)"
        //  event.target.style.backgroundColor = "var(--even-bg)";
         circleSquaresStr.push(event.target.getAttribute("data-number"));
         
    } else{
        event.target.style.backgroundImage = "url(/Project_Images/cross.png)"
        crossSquaresStr.push(event.target.getAttribute("data-number"));
    }
    numOfPlays ++
    hasWon()
    hasDraw()
    countSpan.innerText = numOfPlays
    
    if (isWinner === false && isDraw === false){
    
        if(isEven()) {
            playerTurnSpan.innerText = "circle's turn";
        } else{
            playerTurnSpan.innerText = "cross's turn";
        }
    }
    event.target.removeEventListener("click", handlePlay);
    
}
let isWinner = false
let isDraw = false
function hasWon(){
    for (let winArr of winningCombos){
        let circleCount = 0
        for (num of winArr){
            let circleSquaresArr = circleSquaresStr.map(Number);
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
            let crossSquaresArr = crossSquaresStr.map(Number);
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
    isDraw = false
    isWinner = false
    numOfPlays = 0
    // playerTurnSpan.innerText = "circle's turn"
    crossSquaresStr = []
    crossSquaresStr = []
    for (let square of squares){
    square.removeAttribute("style");
    square.addEventListener("click", handlePlay)

    }



}