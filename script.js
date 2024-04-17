
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

function playGame() {
    let computerSelection,
        playerSelection,
        computerPoints = 0,
        playerPoints = 0,
        numberOfRounds = 0,
        roundOutcome = null,
        keepGoing = true;
    numberOfRounds = getNumberOfRounds();

    while (keepGoing && ((playerPoints + computerPoints) < numberOfRounds)) {        // ** Most likely too many parenthesis, but i have excel nightmares about missing some important ones **
        playerSelection = getPlayerChoice();
        if (playerSelection === "exit") {
            keepGoing = false;
            console.log(`You exited the game you played ${playerPoints + computerPoints} rounds, you won ${playerPoints} of thoses and the computer won ${computerPoints}.`);
            continue

        } else if (!playerSelection) {
            continue
        } else {
            computerSelection = getComputerChoice();
            roundOutcome = playRound(playerSelection, computerSelection);
            if (roundOutcome === 1) {
                console.log(`Score : \n\t${++playerPoints} for you \n\t${computerPoints} for the computer`);        // ** This line is a big confusing to read, bc you see a console.log so
                roundOutcome = null;                                                                                // it's not important but inside it there is an increment, maybe not the
            } else if (roundOutcome === -1) {                                                                        // best for readability, splitting the two would be better for future me **
                console.log(`Score : \n\t${playerPoints} for you \n\t${++computerPoints} for the computer`);
                roundOutcome = null;
            } else if (roundOutcome === 0) {
                console.log(`Score : \n\t${playerPoints} for you \n\t${computerPoints} for the computer`);
                roundOutcome = null;
            } else {
                console.log(`Unexpected result, round canceled \n\troundOutcome : ${roundOutcome}`);
            }
        }
    }
    if (numberOfRounds === -1) {
        console.log("You exited the game without playing a round");
    } else {
        console.log(`You played ${playerPoints + computerPoints} rounds, you won ${playerPoints} of thoses and lost ${computerPoints}. \n\n\tEnd of Game`);
    }
}




