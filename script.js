//generate random word to guess
//create a collection of words
var wordPara = document.querySelector("#wordPara");
var startBtn = document.querySelector("#start");
var timePara = document.querySelector("#timePara")
var words = ["manatee", "zebra", "lumpsucker", "syzygy", "kiwi"];
var chosenWord;
var isPlaying = false;
var userGuessArray = [];
var timer;
var timeLeft=10;
//show user "_" for each letter in word
function startGame() {
    isPlaying=true
    userGuessArray=[];
  chosenWord = words[Math.floor(Math.random() * words.length)];
  chosenWord = chosenWord.split("");
  console.log("chosenword:", chosenWord);
  for (let i = 0; i < chosenWord.length; i++) {
    userGuessArray.push("_");
  }
  console.log("userGuess:", userGuessArray);
  wordPara.textContent = userGuessArray.join(" ");
  startTimer()
}

function startTimer() {
    timer = setInterval(function(){
        console.log(timeLeft);
        timeLeft--;
        timePara.textContent=timeLeft
        if(timeLeft<=0){
            clearInterval(timer);
            console.log("LOST!")
        }
    },1000)
}

//if won, add win
//when users guess matches word, they won
function checkWin() {
  if (userGuessArray.join("") === chosenWord.join("")) {
      isPlaying = false;
      clearInterval(timer);
    return true;
  } else {
    return false;
  }
}

startBtn.addEventListener("click",startGame);

//listen for keypress
document.addEventListener("keyup", function(event) {
    if (!isPlaying) {
      return;
    }
    var guessedLetter = event.key.toLowerCase();
    console.log("guessed:", guessedLetter);
    if (chosenWord.includes(guessedLetter)) {
      // if pressed key is in word, update shown word
      for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === guessedLetter) {
          userGuessArray[i] = guessedLetter;
        }
      }
      console.log("LETTER IS IN WORD!!!!!");
      console.log("updated userGuess", userGuessArray);
      wordPara.textContent = userGuessArray.join(" ");
      if (checkWin()) {
        console.log("WINNER!");
      }
    }
  });