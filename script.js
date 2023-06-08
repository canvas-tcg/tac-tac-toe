//name variables
let squares = document.querySelectorAll(".square")
let numOfPlays = 0 
let replayBtn = document.querySelector(".replayBtn")
let playerTurnSpan = document.querySelector(".playerTurn")
let countSpan = document.querySelector(".counter")


for (let i = 0; i < squares.length; i++){
    squares[i].setAttribute("data-number", i);
}

let pinkSquaresStr = [];
let greenSquaresStr = [];

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
         event.target.style.backgroundColor = "var(--even-bg)";
         pinkSquaresStr.push(event.target.getAttribute("data-number"));
         
    } else{
        event.target.style.backgroundColor = "var(--odd-bg)"
        greenSquaresStr.push(event.target.getAttribute("data-number"));
    }
    numOfPlays ++
    hasWon()
    hasDraw()
    countSpan.innerText = numOfPlays
    
    if (isWinner === false && isDraw === false){
    
        if(isEven()) {
            playerTurnSpan.innerText = "pink's turn";
        } else{
            playerTurnSpan.innerText = "green's turn";
        }
    }
    event.target.removeEventListener("click", handlePlay);
    
}
let isWinner = false
let isDraw = false
function hasWon(){
    for (let winArr of winningCombos){
        let pinkCount = 0
        for (num of winArr){
            let pinkSquaresArr = pinkSquaresStr.map(Number);
            if(pinkSquaresArr.includes(num)){
                pinkCount++
            } 
            if (pinkCount === 3){
                isWinner = true
                console.log("Pink wins!")
        
                playerTurnSpan.innerText = ("Pink wins!")
                for (let square of squares){
                    square.removeEventListener("click", handlePlay);
                    } 
            }
        }
        let greenCount = 0
        for (num of winArr){
            let greenSquaresArr = greenSquaresStr.map(Number);
            if(greenSquaresArr.includes(num)){
                greenCount++
            } 
            if (greenCount === 3){
                isWinner = true
                console.log("Green wins!")

                playerTurnSpan.innerText = ("Green wins!")
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
    pinkSquaresStr = []
    greenSquaresStr = []
    for (let square of squares){
    square.removeAttribute("style");
    square.addEventListener("click", handlePlay)

    }



}