let randomNumber = Math.floor(Math.random() * 100) + 1;
const LastGuess = document.querySelector('.LastGuess');
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
const NameSubmit = document.querySelector('.NameSubmit');
const NameField = document.querySelector('.NameField');
const HighestScoreField = document.querySelector('.HighestScoreField');
let guessCount = 1;
let Score = 0;
let HighestScore = 0;
let HighestScoreName = 'NaN';
let resetButton;
let userName;
let TableCookie;


function checkGuess() {
  let userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
  }

  if(userGuess === 69)
  {
    LastGuess.textContent = 'Thibault ne fait pas le malin :)';
  }
  else{
    LastGuess.textContent = 'Last Guess: ' + userGuess;
  }
  
    guesses.textContent += userGuess + ' ';

  if (userGuess === randomNumber) {
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = '¡¡¡GAME OVER!!!';
    lowOrHi.textContent = '';
    setGameOver();
  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';

    if(userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!' ;
    } else if(userGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }

  guessCount++;
  guessField.value = '';
  guessField.focus();
}



function setGameOver() {
  showScores();

  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  guessCount = 1;
  const resetParas = document.querySelectorAll('.resultParas p');
  for(let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }

  
  resetButton.parentNode.removeChild(resetButton);  
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();
  NameField.disabled = false;
  NameSubmit.disabled = false;
  NameField.value = '';
  NameField.focus();
  lastResult.style.backgroundColor = 'white';
  randomNumber = Math.floor(Math.random() * 100) + 1;
}

function showScores()
{
  var table = document.getElementById("myTable");

  // Create an empty <tr> element and add it to the 1st position of the table:
  var row = table.insertRow(table.row);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  Score = 10 - (guessCount);
  // Add some text to the new cells:
  cell1.innerHTML = userName;
  cell2.innerHTML = Score;

  compareScore();
}

function StockName()
{
  userName = NameField.value;
  NameField.disabled = true;
  NameSubmit.disabled = true;
  
  var d = new Date();
  d.setTime(d.getTime() + (24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  var table = document.getElementById("myTable");
  //document.cookie = table. + ";" + expires;
  TableCookie = document.cookie;

}

function compareScore()
{
  if(Score > HighestScore)
  {
    HighestScore = Score;
    HighestScoreName = userName;    
  }
  HighestScoreField.textContent = 'The highest score is: ' + HighestScore + ' made by: ' + HighestScoreName;
}

function WriteTable(){
  var table = document.getElementById("myTable");
  var tableCookie = document.cookie;
  for(let i = 0 ; i < tableCookie.length ; i++) {
     // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(table.row);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    // Add some text to the new cells:
    cell1.innerHTML = userName;
    cell2.innerHTML = Score;
  }

}
guessSubmit.addEventListener('click', checkGuess);
NameSubmit.addEventListener('click', StockName);

window.onload = WriteTable;
