
function getComputerChoice() {
    let computerChoice;
    let result;
    computerChoice = Math.floor(Math.random() * 3 + 1);
    switch (computerChoice) {
        case 1:
            result = "Rock";
            break;
        case 2:
            result = "Paper";
            break;
        case 3:
            result = "Scissors";
            break;
    }

    return result
}

function getPlayerChoice() {
    let playerChoice;
    playerChoice = prompt("Pick between : Rock, Paper, Scissors");
    playerChoice = isValidAnswer(playerChoice);
    if (playerChoice === "exit") {
        console.log("You canceled the game");
    } else if (playerChoice === null) {
        console.log("You didn't provide a valid answer, round canceled");
    }
    return playerChoice;
}

function isValidAnswer(answer) {
    let result;
    if (!answer) {                                // *** This is to catch when you press enter without typing anything or press escape ***
        return "exit";
    } else if (typeof (answer) === "string") {         // *** I shouldn't have to to this because i get my input from a prompt, ***
        answer = answer.toLowerCase();              // *** but just to be safe bc i don't try and catch errors, and it might change in the future ***
    }
    if (answer === "rock" || answer === "paper" || answer === "scissors") {
        result = answer.charAt(0).toUpperCase() + answer.substring(1);
    } else {
        result = null;
    }
    return result;
}

function playRound(playerSelection, computerSelection) {
    let result;
    if (!playerSelection || !computerSelection) {
        console.log(`One of these two variable was not suitable 
        \n\tplayerSelection : ${playerSelection} 
        \n\tcomputerSelection : ${computerSelection}`)
        result = -10;
        return result;

    }
    if (playerSelection === computerSelection) {
        console.log(`Tie, you both chose ${computerSelection}, round canceled`);
        result = 0;
        return result;                              // ** To not need to check the other possibilities, even if i have the same return at the end of the large IF **                
    } else if (playerSelection === "Rock") {
        if (computerSelection === "Paper") {
            console.log(`You Lost, computer chose ${computerSelection} and it beats your ${playerSelection}.`);
            result = -1;
        } else {
            console.log(`You Won, computer chose ${computerSelection} your ${playerSelection} beats it.`);
            result = 1;
        }
    } else if (playerSelection === "Paper") {
        if (computerSelection === "Scissors") {
            console.log(`You Lost, computer chose ${computerSelection} and it beats your ${playerSelection}.`);
            result = -1;
        } else {
            console.log(`You Won, computer chose ${computerSelection} your ${playerSelection} beats it.`);
            result = 1;
        }
    } else if (playerSelection === "Scissors") {
        if (computerSelection === "Rock") {
            console.log(`You Lost, computer chose ${computerSelection} and it beats your ${playerSelection}.`);
            result = -1;
        } else {
            console.log(`You Won, computer chose ${computerSelection} your ${playerSelection} beats it.`);
            result = 1;
        }
    }
    return result;
}


function getNumberOfRounds() {
    let input;
    let result;
    let keepGoing = true;

    while (keepGoing) {
        input = prompt("How many rounds would you like to play ? 1 up to 5", "3");
        if (!input) {
            result = -1;
            keepGoing = false;
            continue
        } else if (1 <= +input && +input <= 5) {
            result = +input;
            keepGoing = false;
            continue
        } else {
            console.log("This is not a number from 1 up to 5");
            continue
        }
    }
    return result;
}


const selection = document.querySelector(".selection");
const result = document.querySelector("#result");
const elementPlayerScore = document.querySelector("#playerscore");
const elementComputerScore = document.querySelector("#computerscore");
let playerScore = 0;
let computerScore = 0;
let numberOfRounds = 5;
let doWeReset = 0;

const updateResult = (roundOutcome) => {
    if (typeof roundOutcome === "number") {
        switch (roundOutcome) {
            case -1:
                result.textContent = `You lost the round`;
                if ((playerScore + computerScore) === numberOfRounds && computerScore > playerScore) result.textContent += " : Computer won the game";
                if ((playerScore + computerScore) === numberOfRounds && computerScore < playerScore) result.textContent += " : You won the game";
                break;

            case 0:
                result.textContent = `Tie for the round`;
                break;

            case 1:
                result.textContent = `You won the round`;
                if ((playerScore + computerScore) === numberOfRounds && computerScore > playerScore) result.textContent += " : Computer won the game";
                if ((playerScore + computerScore) === numberOfRounds && computerScore < playerScore) result.textContent += " : You won the game";
                break;

            default:
                result.textContent = `Something unexpected happend in updateResult()`;
                break;
        }
    } else if (typeof roundOutcome === "string") {
        result.textContent = roundOutcome;
    }
}
const updateScore = (roundOutcome) => {
    switch (roundOutcome) {
        case -1:
            elementComputerScore.textContent = ++computerScore;
            break;
        case 0:
            break;
        case 1:
            elementPlayerScore.textContent = ++playerScore;
            break;
        case "reset":
            elementComputerScore.textContent = computerScore = 0;
            elementPlayerScore.textContent = playerScore = 0;
            updateResult("New game, same rules")
            break;
        default:
            updateResult("Something unexpected happend in updateScore()")
    }
}

selection.addEventListener("click", (event) => {
    if ((playerScore + computerScore) < numberOfRounds) {
        event.stopPropagation();
        let playerChoice = isValidAnswer(event.target.attributes["data-selection"].value);
        let computerChoice = getComputerChoice();
        let roundOutcome = playRound(playerChoice, computerChoice);
        updateScore(roundOutcome);
        updateResult(roundOutcome);
    } else if (doWeReset) {
        updateScore("reset");
        doWeReset = 0;
    } else {
        updateResult("Click on a choice again to reset the game");
        doWeReset = 1;
    }
})

