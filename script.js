//generate random word to guess
//create a collection of words
var wordPara = document.querySelector("#wordPara");
var startBtn = document.querySelector("#start");
var timePara = document.querySelector("#timePara")
var lossesSpan = document.querySelector("#lossesSpan")
var winsSpan = document.querySelector("#winsSpan")
var words = ["manatee", "zebra", "lumpsucker", "syzygy", "kiwi"];
var chosenWord;
var isPlaying = false;
var userGuessArray = [];
var timer;
var timeLeft=10;
var wins = localStorage.getItem("wins")||0;
var losses =localStorage.getItem("losses")|| 0;
winsSpan.textContent = wins;
lossesSpan.textContent = losses;
//show user "_" for each letter in word
function startGame() {
    if(isPlaying){
        return
    }
    isPlaying=true
    userGuessArray=[];
    timeLeft=10;
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
    timePara.textContent=timeLeft
    timer = setInterval(function(){
        console.log(timeLeft);
        timeLeft--;
        timePara.textContent=timeLeft
        if(timeLeft<=0){
            clearInterval(timer);
            console.log("LOST!")
            wordPara.textContent = `Too slow! the word was: ${chosenWord.join("")}`
            losses++
            localStorage.setItem("losses",losses)
            lossesSpan.textContent = losses;
            isPlaying=false
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
        wordPara.textContent = `WINNER! the word was: ${chosenWord.join("")}`
        wins++
        localStorage.setItem("wins",wins)
        winsSpan.textContent = wins;
      }
    }
  });

  //reset scores
  document.querySelector("#resetBtn").addEventListener("click",function(){
      wins=0;
      losses=0;
      localStorage.setItem("wins",0)
      localStorage.setItem("losses",0)
      winsSpan.textContent=0;
      lossesSpan.textContent=0;
  })