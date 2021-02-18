import { Chess } from 'chess.js';
const chess = new Chess();

//Creating empty board
const squares = chess.SQUARES;

const boardElement = document.querySelector('#board');

squares.forEach((el) => {
  const square = document.createElement('div');
  square.className = 'square';
  square.id = el;
  boardElement.appendChild(square);

  //Set square text ID's
  const textId = document.createElement('span');
  textId.textContent = el;
  square.appendChild(textId);
});

//Create chess pieces
const squareElements = document.querySelectorAll('.square');

//Init board
let board = chess.board().flat();
console.log(board);

//Render board to display
function setPieces(el, i) {
  //console.log(board[i]);
  //change piecees
  //!Render white pawns
  if (board[i] !== null) {
    if (board[i].type === 'p' && board[i].color === 'w') {
      el.innerHTML += '&#9817';
    }
    //Render black pawns
    if (board[i].type === 'p' && board[i].color === 'b') {
      el.innerHTML += '&#9823';
    }
    //!render kings
    if (board[i].type === 'k' && board[i].color === 'w') {
      el.innerHTML += '&#9812';
    }
    if (board[i].type === 'k' && board[i].color === 'b') {
      el.innerHTML += '&#9818';
    }
    //!render queens
    if (board[i].type === 'q' && board[i].color === 'w') {
      el.innerHTML += '&#9813';
    }
    if (board[i].type === 'q' && board[i].color === 'b') {
      el.innerHTML += '&#9819';
    }
    //!render rooks
    if (board[i].type === 'r' && board[i].color === 'w') {
      el.innerHTML += '&#9814';
    }
    if (board[i].type === 'r' && board[i].color === 'b') {
      el.innerHTML += '&#9820';
    }
    //!render bishops
    if (board[i].type === 'b' && board[i].color === 'w') {
      el.innerHTML += '&#9815';
    }
    if (board[i].type === 'b' && board[i].color === 'b') {
      el.innerHTML += '&#9821';
    }
    //!render knights
    if (board[i].type === 'n' && board[i].color === 'w') {
      el.innerHTML += '&#9816';
    }
    if (board[i].type === 'n' && board[i].color === 'b') {
      el.innerHTML += '&#9822';
    }
  }
}

//Make moves
chess.move('e4');
chess.move('e5');
chess.move('f4');

//Update board
board = chess.board().flat();
//Render board to display
squareElements.forEach(setPieces);
