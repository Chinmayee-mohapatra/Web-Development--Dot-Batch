const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

// lets create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // gameGrid ko UI pe v empty krna pade ga
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // one more ting is missing - initialize box with css properties again
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");

    // render the current player in the UI.
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }

    // update UI
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let ans = "";

    winningPositions.forEach((position) => {
        // check that all 3 boxes of the winning positions are non-empty and thay all are same either X or O.
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && ( gameGrid[position[1]]  === gameGrid[position[2]])) {
                // check if winner is X
                if(gameGrid[position[0]] === "X") {
                    ans = "X";
                } else {
                    ans = "O";
                }

                // disable pointer event to stop the game once we get a winner
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })
                // now we know the winner

                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    // it means we have a winner
    if(ans !== "") {
        gameInfo.innerText = `Winner Player - ${ans}`;
        newGameBtn.classList.add("active");
    }

    // when there is no winner we will reach this line - draw match
    // the below code ckecks if we have covered all the boxes and then stuck with a TIE
    // as we are coming to this function in every box-click so this verification is necessary.
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "") {
            fillCount += 1;
        }
    });

    // board is filled 
    if(fillCount===9) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }

}

function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer; // UI pe update krna
        gameGrid[index] = currentPlayer; // hamare js k grid me update kr raha hai
        boxes[index].style.pointerEvents = "none";
        // swap turn between players
        swapTurn();
        // check koi jeet to nai gaya 
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener('click', initGame);