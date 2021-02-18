import { Chess } from 'chess.js';
const chess = new Chess();

const board = chess.board();

console.log(chess);
console.log(board);

const fen = chess.fen();
console.log(fen);

//Creating empty board
const squares = chess.SQUARES;

const boardElement = document.querySelector('#board');

squares.forEach((el) => {
  const square = document.createElement('div');
  square.className = 'square';
  square.id = el;
  boardElement.appendChild(square);
});

//Set square text ID's
const squareElements = document.querySelectorAll('.square');
console.log(squareElements);
