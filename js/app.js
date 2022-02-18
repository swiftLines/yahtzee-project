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
  let diceValue 
  rollCount++
  if (rollCount >= 3) {
    endTurn()
  } else {
    //Keep selected dice removed from play 
    if (picks.length > 0) {
      for (let dice of diceX) {
        if (pickCount === picks.length) {
          break
        } else {
          diceValue = Math.floor(Math.random() * 5) + 1
          dice.innerText = diceValue;
          pickCount++
        }
      }
    } else {
      diceX.forEach((dice) => {
        diceValue = Math.floor(Math.random() * 6) + 1
        dice.innerText = diceValue;
        //Fill array with dice on board
        boardDice.push(diceValue)
      })
      
    }
  }

}//end diceRoll()

//allow player to select dice values they want to keep for their combo
function selectDice(evt) {  
  let choice = parseInt(evt.target.innerText)
  
  picks.push(choice)

  let total = picks.reduce((sum, cur) => {
    return sum + cur
  }, 0)
  chooseDice.innerText = total;

  //Remove selected dice from play
  evt.target.innerText = ''

   let newDiv = document.createElement('div')
   newDiv.addEventListener('click', putDiceBackInPlay)
   newDiv.innerText = choice
   choices.appendChild(newDiv)

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
  let pOneUpperSum = 0
  let pOneUpperArr = Object.keys(playerOne)
  for(let i = 0;i < 6; i++){
    pOneUpperSum += playerOne[pOneUpperArr[i]]
   }
   
   if(pOneUpperSum >= 63) {
    pOneUpperSum += 35
  }
//Player 2
   let pTwoUpperSum = 0
  let pTwoUpperArr = Object.keys(playerTwo)
  for(let i = 0;i < 6; i++){
    pTwoUpperSum += playerTwo[pTwoUpperArr[i]]
   }

   if(pTwoUpperSum >= 63) {
    pTwoUpperSum += 35
  }

//GET TOTAL FOR LOWER SECTION //for each player
  let pOneLowerSum = 0
  let pOneLowerArr = Object.keys(playerOne)
  for(let i = 9;i < 16; i++){
    pOneLowerSum += playerOne[pOneLowerArr[i]]
  }
  console.log(pOneLowerSum)

  let pTwoLowerSum = 0
  let pTwoLowerArr = Object.keys(playerTwo)
  for(let i = 9;i < 16; i++){
    pTwoLowerSum += playerTwo[pTwoLowerArr[i]]
  }
  console.log(pTwoLowerSum)
//ADD UPPER AND LOWER SECTION TO GET GRAND TOTAL //for each player

let pOneTotal = pOneUpperSum + pOneLowerSum
console.log(pOneTotal)

let pTwoTotal = pTwoUpperSum + pTwoLowerSum
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
catNum = parseInt(evt.target.id)

  if (catNum === 1 || catNum === 2 || catNum === 3 
      || catNum === 4 || catNum === 5 || catNum === 6){
  
  let sum 
  let eligibleNums = picks.filter(num => num === catNum)
  
  sum = eligibleNums.reduce((prev, cur) => prev + cur, 0)

  if(turn === -1) {
    playerOne.catNum = sum
    playOneCurTotal += sum
    
  } else if (turn === 1) {
    playerTwo.catNum = sum
    playTwoCurTotal += sum
    
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
        sum = picks.reduce((prev, cur) => prev + cur, 0)

        if(turn === -1) {
          playerOne.threeOfAKind = sum
          playOneCurTotal += sum
          
        } else if (turn === 1) {
          playerTwo.threeOfAKind = sum
          playTwoCurTotal += sum
          
        }                          
                                  
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
        sum = picks.reduce((prev, cur) => prev + cur, 0)
  
        if(turn === -1) {
          playerOne.fourOfAKind = sum
          playOneCurTotal += sum
          
        } else if (turn === 1) {
          playerTwo.fourOfAKind = sum
          playTwoCurTotal += sum
        
        }
    
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

        if(turn === -1) {
          playerOne.fullHouse = 25
          playOneCurTotal += 25
         
        } else if (turn === 1) {
          playerTwo.fullHouse = 25
          playTwoCurTotal += 25
          
        }
  
      } 
      break;
    case 10://Small Straight
      if ((picks.includes(1) && picks.includes(2) && picks.includes(3) && picks.includes(4))
          || (picks.includes(2) && picks.includes(3) && picks.includes(4) 
          && picks.includes(5)) || (picks.includes(3) && picks.includes(4) && picks.includes(5) 
          && picks.includes(6))) {
        
        if(turn === -1) {
          playerOne.lowStraight = 30
          playOneCurTotal += 30
         
        } else if (turn === 1) {
          playerTwo.lowStraight = 30
          playTwoCurTotal += 30
          
        }
      } 
    
      break;
    case 11://Large Straight
        if ((picks.includes(1) && picks.includes(2) && picks.includes(3) && picks.includes(4) 
              && picks.includes(5)) || (picks.includes(2) && picks.includes(3) && picks.includes(4) && picks.includes(5) 
              && picks.includes(6))) {
          
          if(turn === -1) {
            playerOne.highStraight = 40
            playOneCurTotal += 40
        
          } else if (turn === 1) {
            playerTwo.highStraight = 40
            playTwoCurTotal += 40
        
        } 
      }
      break;
  
    case 12://XXXXXXYAHTZEE
      if(picks.every((num, i, picks) => num === picks[0])){
        
        if(turn === -1) {
          playerOne.yahtzee = 50
          playOneCurTotal += 50
          diceTotal.innerText = playOneCurTotal
          
        } else if (turn === 1) {
          playerTwo.yahtzee = 50
          playTwoCurTotal += 50
          
        }
      
      }
  
      break;
    case 13: //XXXXXXXCHANCE
      sum = picks.reduce((prev, cur) => prev + cur, 0)
      
      if(turn === -1) {
        playerOne.chance = sum
        playOneCurTotal = +sum
      } else if (turn === 1) {
        playerTwo.chance = sum
        playTwoCurTotal = +sum
      }
      break;
  
  }//end switch         

  render()
//}//end else
}//end function




