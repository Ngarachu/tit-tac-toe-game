// Get references to HTML elements
let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))

// Get the winning indicator from CSS variable
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

// Constants for player symbols
const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

// Initialize game variables
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}


function boxClicked(e) {
    const id = e.target.id

    // Check if the box is already filled or if the game is already over
    if (!spaces[id] && playerHasWon() === false) {
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        // Check if the current player has won
        if (playerHasWon() !== false) {
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()

            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator)

            // Disable further clicks on boxes
            boxes.forEach(box => box.removeEventListener('click', boxClicked))
            return
        }

        // Check for draw
        if (!spaces.includes(null)) {
            playerText.innerHTML = 'It\'s a draw!'
            // Disable further clicks on boxes
            boxes.forEach(box => box.removeEventListener('click', boxClicked))
            return
        }

        // Switch to the next player
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}

// Winning combinations
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

// Function to check if a player has won
function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    playerText.innerHTML = 'Toe Tac Tic';

    currentPlayer = X_TEXT;

    // Re-add event listeners for box clicks
    boxes.forEach(box => {
        box.addEventListener('click', boxClicked);
    });
}

// Start game
startGame()
