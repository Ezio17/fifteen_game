'use strict';

let table = document.querySelector('table');
let button = document.querySelector('button');
let move = document.querySelector('#move');
let time = document.querySelector('#timer');
let newTable = table.innerHTML;
let moveCount = 1;
let findNumbers;
let numbers = [];

function game(e) {
  numbers = [];
  let empty = document.querySelector('.last');
  const firstWinCombination = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '',
  ];

  const secondWinCombination = [
    '',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
  ];

  function findEmptyPosition() {
    let emptyRow = empty.cellIndex;
    let emptyColumn = empty.closest('tr').rowIndex;
    let emptyPosition = '' + emptyColumn + emptyRow;

    return emptyPosition;
  }

  let target = e.target.closest('td');
  let trColumn = target.closest('tr').rowIndex;
  let tdRow = target.cellIndex;
  let position = '' + trColumn + tdRow;
  let finalPosition = position - findEmptyPosition();

  if (target.classList.contains('last')) {
    return;
  }

  if (
    !(finalPosition === -10 || finalPosition === -1 || finalPosition === 1 || finalPosition === 10)
  ) {
    return;
  }

  if (
    finalPosition === -10 ||
    finalPosition === -1 ||
    finalPosition === 1 ||
    finalPosition === 10
  ) {
    empty.classList.remove('last');
    empty.insertAdjacentHTML('afterBegin', `<span>${target.textContent}</span>`);

    target.classList.add('last');
    target.textContent = '';

    move.innerHTML = 'Ход: ' + moveCount++;
  }

  findNumbers();

  if (
    JSON.stringify(firstWinCombination) == JSON.stringify(numbers) ||
    JSON.stringify(secondWinCombination) == JSON.stringify(numbers)
  ) {
    alert('Победа! Вы победили за: ' + (moveCount - '1') + ' ходов и ' + timerCount + ' секунд!');

    clearInterval(seconds);
    table.removeEventListener('click', game);
  }
}

let seconds;
let timerCount;

button.onclick = function() {
  clearInterval(seconds);
  table.addEventListener('click', game);
  timerCount = 0;
  moveCount = 1;
  move.innerHTML = 'Ход: ' + 0;

  table.innerHTML = newTable;
  let span = document.querySelectorAll('span');
  let td = document.querySelectorAll('td');

  let arrTd = [...td];

  let randomNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  function compareRandom() {
    return Math.random() - 0.5;
  }
  randomNumbers.sort(compareRandom);

  randomNumbers.forEach(function(randomNumber, index) {
    span[index].innerHTML = randomNumber;
  });

  findNumbers = function() {
    arrTd.forEach(function(item, i) {
      numbers.push(item.textContent);
    });
  };

  seconds = setInterval(function() {
    time.textContent = 'Секундомер: ' + ++timerCount;
  }, 1000);
};
