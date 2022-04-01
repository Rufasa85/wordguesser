//generate random word to guess
    //create a collection of words
var wordPara = document.querySelector("#wordPara")
var words = ["manatee","zebra","lumpsucker","syzygy","kiwi"]
    //show user "_" for each letter in word
var chosenWord = words[Math.floor(Math.random()*words.length)]
chosenWord = chosenWord.split("")
console.log("chosenword:", chosenWord)
var userGuessArray = [];
for (let i = 0; i < chosenWord.length; i++) {
    userGuessArray.push("_")
}
console.log("userGuess:",userGuessArray)
wordPara.textContent = userGuessArray.join(" ")
//listen for keypress
document.addEventListener("keyup",function(event){
    var guessedLetter = event.key.toLowerCase()
    console.log("guessed:",guessedLetter)
    if(chosenWord.includes(guessedLetter)){
        // if pressed key is in word, update shown word
        for (let i = 0; i < chosenWord.length; i++) {
            if(chosenWord[i]===guessedLetter){
                userGuessArray[i]=guessedLetter
            }    
        }
        console.log("LETTER IS IN WORD!!!!!")
        console.log("updated userGuess",userGuessArray)
        wordPara.textContent = userGuessArray.join(" ")
    }
})
//if won, add win
    //when users guess matches word, they won