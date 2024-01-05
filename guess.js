//Setting Game Name
let gameName = "Guess The Word!";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created By Me😎`;

// Setting Game Options
let numbersOfTries = 5;
let numbersOfLetters = 6;
let currentTry = 1;
let numberOfHints = 2;

// Manage Words
let wordToGuess = "";
const words = ["Create","Update","Delete","Master","Branch",
"Mainly","School","option","People","Matrix","Called","Finger"
,"Listen","Mobile","Laptop","System","Column"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

// Manage Hints
document.querySelector(".hint span").innerHTML = numberOfHints;
const getHintButton = document.querySelector(".hint");
getHintButton.addEventListener("click",getHint);

function generateInput(){
    const inputsContainer = document.querySelector(".inputs");
    for(let i =1 ; i <= numbersOfTries; i ++){
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i} </span>`;
        if (i != 1) tryDiv.classList.add("hidden");
        for(let j = 1 ; j <= numbersOfLetters ; j++){
            const input = document.createElement("input");
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlenght","1");
            tryDiv.appendChild(input);
        } 
        inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus();
    const inputsInHiddenDiv = document.querySelectorAll(".hidden input");
    inputsInHiddenDiv.forEach((input) => (input.disabled = true));
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input , index) =>{
        input.addEventListener("input",function(){
            this.value = this.value.toUpperCase();
            const nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus();
        });
        input.addEventListener("keydown",function(event){
            const currentIndex = Array.from(inputs).indexOf(event.target);
            if(event.key === "ArrowRight"){
                const nextInput = currentIndex + 1;
                if(nextInput < inputs.length) inputs[nextInput].focus();
            }
            if(event.key === "ArrowLeft"){
                const prevInput = currentIndex - 1;
                if(prevInput >= 0) inputs[prevInput].focus();
            }
        });
    });
 };
 console.log(wordToGuess);
const guessButton = document.querySelector(".check");
guessButton.addEventListener("click",handleGuesses);
function handleGuesses(){
    let successGuess = true;
    for(let i = 1; i<= numbersOfLetters; i++){
        const inputField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
        const letter = inputField.value.toLowerCase();
        const actualLetter = wordToGuess[i -1];
        if(letter === actualLetter){
            inputField.classList.add("in");
        }else if(wordToGuess.includes(letter)&& letter !== ""){
            inputField.classList.add("not-in");
            successGuess = false;
        }
        else {
            inputField.classList.add("no");
            successGuess = false;
        }
    }
// Check Winner
let messageArea = document.querySelector(".message");
if(successGuess){
    messageArea.innerHTML = `<span>You Win🤓</span>`;
    let allTries = document.querySelectorAll(".inputs >div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("hidden"));
    guessButton.disabled = true;
    getHintButton.disabled = true;
}else{
    document.querySelector(`.try-${currentTry}`).classList.add("hidden");
    const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    currentTryInputs.forEach((input) => (input.disabled = true));
    currentTry++;
    const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInputs.forEach((input) => (input.disabled = false))
    let el = document.querySelector(`.try-${currentTry}`);
    if(el){
        document.querySelector(`.try-${currentTry}`).classList.remove("hidden");
        el.children[1].focus();
    }else{
        guessButton.disabled = true;
        getHintButton.disabled = true;
        messageArea.innerHTML = `You Lose😜 The Word Is <span>${wordToGuess}</span>`;
    }
}
}

// Hint Button
function getHint(){
    if(numberOfHints > 0){
        numberOfHints--;
        document.querySelector(".hint span").innerHTML = numberOfHints;
    } 
    if (numberOfHints === 0){
        getHintButton.disabled = true;
    }
    const enabledInputs = document.querySelectorAll("input:not([disabled])");
    const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
    if(emptyEnabledInputs.length > 0){
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput = emptyEnabledInputs[randomIndex];
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
        if(indexToFill !== -1){
            randomInput.value = wordToGuess[indexToFill].toUpperCase();
            randomInput.classList.add("in");
        }
    }
}

let l = true;
document.addEventListener("keydown",handleBackSpace);
function handleBackSpace(event){
    if(event.key === "Backspace"){
        const inputs = document.querySelectorAll("input:not([disabled])");
        const currentIndex = Array.from(inputs).indexOf(document.activeElement);
        if(currentIndex > 0){
            const currentInput = inputs[currentIndex];
            const prevInput = inputs[currentIndex - 1];
            if (currentIndex === 5 && l === true){
                currentInput.value ="";
                l = false;
            }else if (currentIndex - 1 <= 4){
                currentInput.value ="";
                prevInput.value = "";
                prevInput.focus();
                l = true;
            }
        }
    }
}

window.onload = function (){generateInput();};