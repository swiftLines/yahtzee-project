/*-------------------------------- Constants --------------------------------*/
  playerOne = {
  //upper section
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  initialUpperTotal: 0,
  bonus: 0,
  upperTotal: 0,
  //lower section
  threeOfAKind: 0,
  fourOfAKind: 0,
  fullHouse: 0,
  lowStraight: 0,
  highStraight: 0,
  yahtzee: 0,
  chance: 0,
  lowerTotal: 0,
  grandTotal: 0,
  //bonus
  yahtzeeBonus: 0,
  currentTotal: 0
  }

  playerTwo = {
    //upper section
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  initialUpperTotal: 0,
  bonus: 0,
  upperTotal: 0,
  //lower section
  threeOfAKind: 0,
  fourOfAKind: 0,
  fullHouse: 0,
  lowStraight: 0,
  highStraight: 0,
  yahtzee: 0,
  chance: 0,
  lowerTotal: 0,
  grandTotal: 0,
  //bonus
  yahtzeeBonus: 0,
  currentTotal: 0
    }


/*-------------------------------- Variables --------------------------------*/
let rollTotal=[], selectTotal=[], rollCount, picks=[], turn, pickCount, 
putBackCount, boardDice=[], pickLimit, message, roundCount, playOneCurTotal,
playTwoCurTotal
let winner = false
//may not need rollTotal as global variable

/*------------------------ Cached Element References ------------------------*/
const diceX = document.querySelectorAll('#roll')
const rollBtn = document.querySelector('button')
let curTotal = document.querySelector('#total')
let chooseDice = document.querySelector('#select')
let choices = document.querySelector('#choices')
let messageEl = document.querySelector('#message')
const pickdDice = document.querySelectorAll('.pick')
const upperSec = document.querySelectorAll('.upper')
const lowerSec = document.querySelectorAll('.lower')

/*----------------------------- Event Listeners -----------------------------*/

rollBtn.addEventListener('click', diceRoll)

diceX.forEach((dice) => {
  dice.addEventListener('click', selectDice)
})

pickdDice.forEach((pick) => {
  pick.addEventListener('click', putDiceBackInPlay)
})


/*-------------------------------- Functions --------------------------------*/
init()

//initialize state variables
function init() {
  //initialize array to store dice values player that player chooses for 
  //single turn
  for (let i = 0; i < 5; i++) {
    rollTotal[i] = null
  }

  //initialize role counter
  rollCount = 0

  //initialize counter for number of dice selected
  pickCount = 1

  playOneCurTotal = 0
  playTwoCurTotal = 0

  messageEl.innerText= `Click Here to Play Yahtzee!`
  messageEl.addEventListener('click', () => {
    turn = 1
    roundCount = 1
    render()
  })
  
}

function render() {
//Render a message reflecting the current game state:
  if (rollCount >= 3 && turn === -1 && roundCount === 13) {
    endGame()
    
  } else if (rollCount >= 3 && turn === -1) {
    turn *= -1
    picks = []
    choices.innerText = ''
    chooseDice.innerText = ''
    rollCount = 0
    roundCount++
    boardDice = []
  } else if (rollCount >= 3) {
    turn *= -1
    picks = []
    choices.innerText = ''
    chooseDice.innerText = ''
    rollCount = 0
    boardDice = []
  }
  
  if (turn === -1) {
    message = `player two's roll`
  } else if (turn === 1) {
    message = `player one's roll`
  }

  if (turn === -1) {
    curTotal.innerText = playOneCurTotal
  } else if (turn === 1) {
    curTotal.innerText = `${playTwoCurTotal}`
  }
  
  if(!winner){
  messageEl.innerText = `${message}, round${roundCount}`
  }

}

//rolls dice
function diceRoll() {
  if (rollCount >= 3) {
    endTurn();
    return;
  }

  rollCount++;

  diceX.forEach((dice, index) => {
    if (!picks.includes(index)) { // Only roll unkept dice
      let diceValue = Math.floor(Math.random() * 6) + 1;
      dice.innerText = diceValue;
      boardDice[index] = diceValue;
    }
  });
  // let diceValue; 
  // rollCount++;

  // if (rollCount >= 3) {
  //   endTurn();
  //   // return; // Stop further execution
  // } else {
  //   // Keep selected dice removed from play 
  //   if (picks.length > 0) {
  //     for (let dice of diceX) {
  //       if (pickCount === picks.length) {
  //         break
  //       } else {
  //         diceValue = Math.floor(Math.random() * 5) + 1
  //         dice.innerText = diceValue;
  //         pickCount++
  //       }
  //     }
  //   } else {
  //     diceX.forEach((dice, index) => {
  //       diceValue = Math.floor(Math.random() * 6) + 1
  //       dice.innerText = diceValue;
  //       // Fill array with dice on board
  //       boardDice.push(diceValue)
  //     })
  //   }  
  // }
}//end diceRoll()

//allow player to select dice values they want to keep for their combo
function selectDice(evt) {  
  let choice = parseInt(evt.target.innerText)
  // Get index of selected die
  let index = Array.from(diceX).indexOf(evt.target);

  if (index === -1 || isNaN(choice)) return; // Prevent errors

  if (!picks.includes(index)) {
    picks.push(index); // Store the index, not the value
  }

  let total = picks.reduce((score, idx) => score + parseInt(diceX[idx].innerText), 0);
  chooseDice.innerText = total;

  // Visually mark kept dice (instead of deleting the value)
  evt.target.classList.add("kept");

  // Add selected dice to `#choices` (picked dice display)
  let newDiv = document.createElement('div');
  newDiv.addEventListener('click', putDiceBackInPlay);
  newDiv.innerText = choice;
  choices.appendChild(newDiv);
  // newDiv.classList.add("kept-dice");

  // picks.push(choice)

  // let total = picks.reduce((score, cur) => {
  //   return score + cur
  // }, 0)
  // chooseDice.innerText = total;

  // //Remove selected dice from play
  // evt.target.innerText = ''

  // let newDiv = document.createElement('div')
  // newDiv.addEventListener('click', putDiceBackInPlay)
  // newDiv.innerText = choice
  // choices.appendChild(newDiv)

}

function putDiceBackInPlay(evt) {
  let choice = parseInt(evt.target.innerText)
  let element = picks.indexOf(choice)
  picks.splice(element, 1)
  evt.target.innerText = ''
  pickCount--
}

function endTurn() {
  
  let leftOverDice

  for (let dice of diceX) {
    leftOverDice = parseInt(dice.innerText)
    if (isNaN(leftOverDice)) {
      break
    } else {
      picks.push(leftOverDice)
    }
  }
  //Display message to select a category
  
  messageEl.innerText = `Click a Category to Apply Score`
  
  upperSec.forEach((cat) => {
    cat.addEventListener('click', applyScoreToCard)
  })
  
  lowerSec.forEach((cat) => {
    cat.addEventListener('click', applyScoreToCard)
  })
  
}

function endGame(){
// GET TOTAL FOR UPPER SECTION //for each player
  let pOneUpperscore = 0
  let pOneUpperArr = Object.keys(playerOne)
  for(let i = 0;i < 6; i++){
    pOneUpperscore += playerOne[pOneUpperArr[i]]
  }

  if(pOneUpperscore >= 63) {
    pOneUpperscore += 35
  }
//Player 2
  let pTwoUpperscore = 0
  let pTwoUpperArr = Object.keys(playerTwo)
  for(let i = 0;i < 6; i++){
    pTwoUpperscore += playerTwo[pTwoUpperArr[i]]
  }

  if(pTwoUpperscore >= 63) {
    pTwoUpperscore += 35
  }

//GET TOTAL FOR LOWER SECTION //for each player
  let pOneLowerscore = 0
  let pOneLowerArr = Object.keys(playerOne)
  for(let i = 9;i < 16; i++){
    pOneLowerscore += playerOne[pOneLowerArr[i]]
  }
  console.log(pOneLowerscore)

  let pTwoLowerscore = 0
  let pTwoLowerArr = Object.keys(playerTwo)
  for(let i = 9;i < 16; i++){
    pTwoLowerscore += playerTwo[pTwoLowerArr[i]]
  }
  console.log(pTwoLowerscore)
//ADD UPPER AND LOWER SECTION TO GET GRAND TOTAL //for each player

let pOneTotal = pOneUpperscore + pOneLowerscore
console.log(pOneTotal)

let pTwoTotal = pTwoUpperscore + pTwoLowerscore
console.log(pTwoTotal)

//DETERMINE WINNER
  // + compare playerOne total and playerTwo total
  if (pOneTotal > pTwoTotal) {
    winner = true
    messageEl.innerText = `Player One Wins!` 
  } 
  if (pOneTotal < pTwoTotal) {
    winner = true
    messageEl.innerText = `Player Two Wins!`
  } 
  if (pOneTotal === pTwoTotal){
    winner = null
    messageEl.innerText = `Tie...`
  }

}

function applyScoreToCard(evt) {

let valueKeys
let catNum = parseInt(evt.target.id)

  if (catNum >= 1 && catNum <= 6){
  
    let score 
    let eligibleNums = picks.filter(num => num === catNum)
  
    score = eligibleNums.reduce((prev, cur) => prev + cur, 0)

    if(turn === -1) {
      playerOne.catNum = score
      playOneCurTotal += score
      
    } else if (turn === 1) {
      playerTwo.catNum = score
      playTwoCurTotal += score
      
    } 

    render()
} 

  switch (catNum) {
    case 7://3 of a kind
      values = picks.reduce((obj, dice) => {
        if (obj[dice]) {
            obj[dice]++
        }else {
          obj[dice] = 1
        }
        return obj
      }, {})
      
      valueKeys = Object.keys(values)
      if(valueKeys.length <= 3 && (values[valueKeys[0]] >= 3 
        || values[valueKeys[1]] >= 3 || values[valueKeys[2]] >= 3)) { 
        score = picks.reduce((prev, cur) => prev + cur, 0)
      }
      break;
    case 8://Four of a Kind
      console.log('in 4 of kind')
      values = picks.reduce((obj, dice) => {
        if (obj[dice]) {
          obj[dice]++
        } else {
          obj[dice] = 1
        }
        return obj
      }, {})
      valueKeys = Object.keys(values)
      if(valueKeys.length <= 2 && (values[valueKeys[0]] >= 4 
        || values[valueKeys[1]] >= 4)) { 
          score = picks.reduce((prev, cur) => prev + cur, 0)
      } 
      break;
    case 9://FULLHOUSE
      values = picks.reduce((obj, dice) => {
        if (obj[dice]) {
          obj[dice]++
        } else {
          obj[dice] = 1
        }
        return obj
      }, {})
      valueKeys = Object.keys(values)
      if(valueKeys.length === 2 && (values[valueKeys[0]] === 2 
          || values[valueKeys[0]] === 3)) { 
          score = 25;  
      } 
      break;
    case 10://Small Straight
      if ((picks.includes(1) && picks.includes(2) && picks.includes(3) && picks.includes(4))
          || (picks.includes(2) && picks.includes(3) && picks.includes(4) 
          && picks.includes(5)) || (picks.includes(3) && picks.includes(4) && picks.includes(5) 
          && picks.includes(6))) {
            score = 30;  
      } 
    
      break;
    case 11://Large Straight
        if ((picks.includes(1) && picks.includes(2) && picks.includes(3) && picks.includes(4) 
              && picks.includes(5)) || (picks.includes(2) && picks.includes(3) && picks.includes(4) && picks.includes(5) 
              && picks.includes(6))) {
                score = 40;
        }
        break;
    case 12://XXXXXXYAHTZEE
      if(picks.every((num, i, picks) => num === picks[0])){
          score = 50;
      
      }
  
      break;
    case 13: //XXXXXXXCHANCE
      score = picks.reduce((prev, cur) => prev + cur, 0)
      break;
  }//end switch         
  
  // Update the player's score
  if(turn === -1) {
    playerOne.chance = score
    playOneCurTotal = +score
  } else if (turn === 1) {
    playerTwo.chance = score
    playTwoCurTotal = +score
  }

  // Find the corresponding score display span
  let scoreDisplay = document.getElementById(`score-${catNum}`);

  // Update the score inside the span
  if (scoreDisplay) {
    scoreDisplay.innerText = score;
  }

  render()
//}//end else
}//end function
