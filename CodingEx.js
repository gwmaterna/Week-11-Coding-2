// const gameBoard = $('#gameBoard');
const gameBoard = document.getElementById("gameBoard");
const boxes = Array.from(document.getElementsByClassName("box"));
const resetBtn = document.getElementById("resetBtn");
const statusDiv = document.querySelector(".status");
const header = document.getElementById("header");
const spaces = [null, null, null, null, null, null, null, null, null];
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = O_TEXT;


// Drawing the board
const drawBoard = () => {
  boxes.forEach((box, index) => {
    let styleString = "";
    // Drawing a border under the top 3 boxes in the grid, indexes 0, 1, and 2
    if (index < 3) {
      styleString += `border-bottom: 3px solid var(--black);`;
    }
    // Drawing a border to the right of the left 3 boxes in the grid, indexes 0, 3, and 6
    if (index % 3 === 0) {
      styleString += `border-right: 3px solid var(--black);`;
    }
    // Drawing a border to the left of the right 3 boxes in the grid, indexes 2, 5, and 8
    if (index % 3 === 2) {
      styleString += `border-left: 3px solid var(--black);`;
    }
    // Drawing a border on the top of the bottom 3 boxes in the grid, indexes 6, 7, and 8
    if (index > 5) {
      styleString += `border-top: 3px solid var(--black);`;
    }
    box.style = styleString;
    box.addEventListener("click", boxClicked);
  });
};

function boxClicked(e) {
  // Grabbing the event target (the X or O that clicked the box) and entering it as a value (id) into
  //  the spaces array, and that inner text will be the current player
  const id = e.target.id;
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    if (hasPlayerWon(currentPlayer)) {
      header.innerHTML = `Player ${currentPlayer} wins!`;
      statusDiv.innerHTML = `Game Over`;
      return;
    }
    
    // If the game hasn't been won, we continue and switch to the next player.  
    // So below we use the ternary operator to ask 'If current player O is true, then the current player
    //  is now X.  If current player O is false, then the current player is now O.'
    currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
    statusDiv.innerHTML = `Player ${currentPlayer} is next`;
  }
  // I can't seem to get the 'Tie Game' to execute
  // if (spaces.isEmpty === false) {
  //   header.innerHTML = `Tie Game`;
  // }
}

const hasPlayerWon = (player) => {
  // From top left, check across, down, and diagonal 
  if (spaces[0] === player) {
    if (spaces[1] === player && spaces[2] === player) {
      console.log(`${player} wins up top`);
      return true;
    }
    if (spaces[3] === player && spaces[6] === player) {
      console.log(`${player} wins on the left`);
      return true;
    }
    if (spaces[4] === player && spaces[8] === player) {
      console.log(`${player} wins on the diagonal`);
      return true;
    }
  }
  // From bottom check up and across
  if (spaces[8] === player) {
    if (spaces[2] === player && spaces[5] === player) {
      console.log(`${player} wins on the right`);
      return true;
    }
    if (spaces[7] === player && spaces[6] === player) {
      console.log(`${player} wins on the bottom`);
      return true;
    }
  }
  // From middle check middle vertical and middle horizontal
  if (spaces[4] === player) {
    if (spaces[3] === player && spaces[5] === player) {
      console.log(`${player} wins on the middle horizontal`);
      return true;
    }
    if (spaces[1] === player && spaces[7] === player) {
      console.log(`${player} wins on the middle vertical`);
      return true;
    }
    if (spaces[6] === player && spaces[2] === player) {
      console.log(`${player} wins on the diagonal`);
      return true;
    }
  }
// I cannot get 'Tie Game' to work.  I've tried the below code, a function, a loop.  The 
//  console log 'Tie Game' works, but printing to the screen does not

  if (spaces[0] !== null && spaces[1] !== null && spaces[2] !== null && spaces[3] !== null && 
  spaces[4] !== null && spaces[5] !== null && spaces[6] !== null && spaces[7] !== null && 
  spaces[8] !== null) {
    console.log(`Tie Game`);
    statusDiv.innerHTML = `Tie Game`;
  }
};

resetBtn.addEventListener("click", () => {
  spaces.forEach((space, index) => {
    // Upon clicking 'reset' we give each space a null value 
    spaces[index] = null;  
  });
  boxes.forEach((box) => {
    // Then we clear each box and input an empty string 
    box.innerText = "";
  });
    // The header was used to display who won, so now we reset it to 'Tic Tac Toe' 
  header.innerHTML = `Tic Tac Toe`;
  statusDiv.innerHTML = `Player O begins...`;
  currentPlayer = O_TEXT;
});

drawBoard();


  

  


