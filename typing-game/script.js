const quotes = [
    'When you have eliminated the impossibal, whatever remains, howerver improbable, must be the truth.',
    'There is nothing more deceptive than an obvious fact.',
    'I never make exceptions. An exception disproves the rule.',
    'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretations.',
]

let words = []
let wordIndex = 0;
let startTime = Date.now();
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');


document.getElementById('start').addEventListener('click', () => {
    // get quote
    const quoteIndex = Math.floor(Math.random() * quotes.length)
    // console.log (qouteIndex)

    const quote = quotes[quoteIndex]
    words = quote.split(' ')
    // reset the wordIndex for tracking
    wordIndex = 0;

    // UI update
    //  create an array of span elements so we can set a class 
    const spanWords = words.map(function(word) {return `<span>${word} </span>`})
    // convert into string and set as innerHTML or quote diaplay
    quoteElement.innerHTML = spanWords.join('')
    // highligh the first word to yellow
    quoteElement.childNodes[0].className = 'highlight'
    // clear any prior messages
    messageElement.innerText = ''

    // setup the textbox
    // clear the textbox
    typedValueElement.value = ''
    // set the event handler

    // set focus
    typedValueElement.focus()

    // start the timer
    startTime = new Date().getTime()

})

typedValueElement.addEventListener("input", () => {
    // get a current word
    const currentWord = words[wordIndex]
    // get the current value
    const typedValue = typedValueElement.value
    if (typedValue === currentWord && wordIndex === words.length - 1){
        const elaspedTime = new Date().getTime() - startTime
        const messages = (`Congratulations! you have finished in ${elaspedTime/1000}`)
        messageElement.innerText = messages
          
    }  else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        // end of word
        // clear the typedValueElement for the new word
        typedValueElement.value = ''
        // move to the next word
        wordIndex++
        // reset the class name for all elements in quote
        for (const wordElement of quoteElement.childNodes) {
            wordElement.className = ''
        }
        // highlight the new word
        quoteElement.childNodes[wordIndex].className = 'highlight'
    } else if (currentWord.startWith(typedValue)) {
        // currently correct
        // highlight the next word
        typedValueElement.className = ''
    } else {
        // error state
        typedValueElement.className = 'error'
    }
})


