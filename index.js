// Necessary variable declarations
// Word-related
const wordInput = document.querySelector("#word-input");
const wordSubmit = document.querySelector("#submit-word");

const wordElements = [wordInput, wordSubmit];

// Answer-related
const answerDisplay = document.querySelector("#answer-display");
const charInput = document.querySelector("#char-input.text-input");
const submitBtn = document.querySelector("#submit.submit-button");
const wrongDisplay = document.querySelector("#wrong-counter");
const stageDisplay = document.querySelector("#stageImg");

const ansElements = [answerDisplay, charInput, submitBtn, wrongDisplay, stageDisplay];

let game = false;
let answerChar = "";
let wrongCount = 0;
let word = "";
let answer = [];

Ui(wordElements, ansElements);

submitBtn.addEventListener("click", () => {
    answerChar = GetAnswer(charInput, answerChar);
    wrongCount = CheckAnswer(word, answer, answerChar, wrongCount);
    UpdateDisplay(answer, answerDisplay, wrongCount, wrongDisplay, stageDisplay);
    Ui(wordElements, ansElements);
});

wordSubmit.addEventListener("click", () => {
    word = GetUserWord(wordInput);
    answer = GenerateAnswerArr(word);
    game = ChangeGameState(game);
    Ui(wordElements, ansElements);
    UpdateDisplay(answer, answerDisplay, wrongCount, wrongDisplay, stageDisplay);
});

// ==================================================================

function Ui(wordArr, ansArr) {
    if (!game) {
        for ( let i = 0; i < ansArr.length; i++) {
            if (wordArr[i] != undefined) {
                wordArr[i].style.display = "block";
            }
            ansArr[i].style.display = "none";
        }
    } else {
        for ( let i = 0; i < ansArr.length; i++) {
            if (wordArr[i] != undefined) {
                wordArr[i].style.display = "none";
            }
            ansArr[i].style.display = "block";
        }
    }
}

function ChangeGameState(state) {
    state = !state;
    return state;
}

function GetUserWord(wordInput) {
    let word = wordInput.value;
    word.toLowerCase();

    wordInput.value = "";

    return word;
}

function GenerateAnswerArr(userWord) {
    let answerArr = [];
    for (let i = 0; i < userWord.length; ++i) {
        answerArr.push("_")
    }
    return answerArr;
}

function UpdateDisplay(answerArr, textBox, wrongCount, wrongDisplay, stageDisplay) {
    textBox.innerHTML = answerArr.join(" ");
    wrongDisplay.innerHTML = wrongCount;
    switch (wrongCount) {
        case 0:
            stageDisplay.src = "./stages/stage1.png";
            break;
    
        case 1:
            stageDisplay.src = "./stages/stage2.png";
            break;
        
        case 2:
            stageDisplay.src = "./stages/stage3.png";
            break;
        
        case 3:
            stageDisplay.src = "./stages/stage4.png";
            break;
        
        case 4:
            stageDisplay.src = "./stages/stage5.png";
            break;

        case 5:
            stageDisplay.src = "./stages/stage6.png";
            break;

        case 6:
            stageDisplay.src = "./stages/stage7.png";
            break;
        
        default:
            break;
    }
}

function GetAnswer(charInput, answerChar) {
    answerChar = charInput.value;
    answerChar.toLowerCase();
    
    // Reset textbox value, and use answerChar[0] to get 1st character
    charInput.value = "";

    return answerChar[0];
}

function CheckAnswer(word, answerArr, answerChar, wrongCount) {
    let correct = false;

    for (let i = 0; i < word.length; ++i) {
        if (answerChar === word[i]) {
            answerArr[i] = answerChar;
            correct = true;
        }
    }

    if (!correct) {
        wrongCount++;
    }

    return wrongCount;
}