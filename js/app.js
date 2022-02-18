/*-------------------------------- Constants --------------------------------*/
// Have each player object's key's values add up to the score that correlates to that player
// Take the value of that player's score and us DOM Manipulation to render each player's score

// Tackle your CSS. Just make sure to center everything, change the background color and the font as well. That should be MVP.
  //maybe also have the round count in here so if player has done 
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
  aces: 0,
  twos: 0,
  threes: 0,
  fours: 0,
  fives: 0,
  sixes: 0,
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
//call init()
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

  //initialize whose turn it is to 1 (player 'one')
  // turn = 1

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
console.log('back in render()')
  if (rollCount >= 3 && turn === -1 && roundCount === 13) {
    console.log('end the game')
    endGame()
    
  } else if (rollCount >= 3 && turn === -1) {
    turn *= -1
    picks = []
    choices.innerText = ''
    chooseDice.innerText = ''
    rollCount = 0
    roundCount++
    console.log('this is round count', roundCount)
    boardDice = []
  } else if (rollCount >= 3) {
    turn *= -1
    picks = []
    choices.innerText = ''
    chooseDice.innerText = ''
    rollCount = 0
    boardDice = []
  }
  
  console.log('This is turn', turn)
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
  //***** Maybe render if (picks.length > 0) instead of handling in diceRoll

}

//rolls dice
function diceRoll() { //REMOVE evt if dont use 

  let diceValue 
  
  rollCount++
  console.log(rollCount)
// **** Add another global array to keep track of dice values on board
  if (rollCount >= 3) {
    endTurn()
    //Maybe put below statements into endTurn()
    // rollTotal = []
    // picks = []
    // choices.innerText = ''
    // chooseDice.innerText = ''
    // render()
  } else {
    //Keep selected dice removed from play 
    if (picks.length > 0) {
      console.log('selected dice in picks[]', picks)
      console.log('pickCount', pickCount)
      for (let dice of diceX) {
        if (pickCount === picks.length) {
          // dice.innerText = ''
          console.log('picks[]', picks)
          console.log('pickCount', pickCount)
          console.log('dice element', dice)
          break
        } else {
          diceValue = Math.floor(Math.random() * 5) + 1
          dice.innerText = diceValue;
          pickCount++
          console.log('picks[]', picks)
          console.log('pickCount', pickCount)
          console.log('dice element', dice)
          console.log('dice number', diceValue)
          
        }
      }
    } else {
      diceX.forEach((dice) => {
        diceValue = Math.floor(Math.random() * 6) + 1
        dice.innerText = diceValue;
        //Fill array with dice on board ***** May not need boardDice[]
        boardDice.push(diceValue)
      })
      //console.log(boardDice)
    }
  }

  //track roll amount
  
  // //***NEED to total all dice values for only a single roll 
  // //(maybe do towards qualifying combos later....)
  // let total = rollTotal.reduce((sum, cur) => {
  //   return sum + cur
  // }, 0)
  // diceTotal.innerText = total;

  // selectDice()

  //reset picks []
}//end diceRoll()

//allow player to select dice values they want to keep for their combo
function selectDice(evt) {  
  let choice = parseInt(evt.target.innerText)
  //***** only allow 5 values in pics[]
  // if (pickLimit < 5)  
  picks.push(choice)
  //have choices display all at once

  //sum up value of dice selected
  //***** maybe do not have this but can be used as a feature to give 
  //      running total towards a suggested category player is going for 
  let total = picks.reduce((sum, cur) => {
    return sum + cur
  }, 0)
  chooseDice.innerText = total;

  //Remove selected dice from play
  evt.target.innerText = ''

//place in html elements so that you can click to place 
//back into dice cup
// ***** Maybe create a function for creating new divs
   let newDiv = document.createElement('div')
   newDiv.addEventListener('click', putDiceBackInPlay)
   newDiv.innerText = choice
   choices.appendChild(newDiv)

// ***** Dont forget to remove dice value from select total if feature
//        is included

//  ***** need button or way to end turn if player chooses to not use
//        all rolls

// document.addEventListener("click", evt => {
//   if (evt.target.matches("div")) {
//     console.log("hi")
//   }
// })
// pickdDice
// for (let pick of pickdDice) {
//   pick.innerText = choice
//   break
// }
// pickdDice.forEach((pick) => {
//     pick.innerText = choice
//     console
// })

//NEED a total towards specific combos

}

function putDiceBackInPlay(evt) {
  console.log('hi')
  let choice = parseInt(evt.target.innerText)

  //remove from picks array with built in method
  let element = picks.indexOf(choice)
  picks.splice(element, 1)
  //choices.innerText = picks
  evt.target.innerText = ''
  pickCount--
}

function endTurn() {
  // 1) RESOLVED! need to push any additional dice values on board to picks[]
  let leftOverDice

  for (let dice of diceX) {
    leftOverDice = parseInt(dice.innerText)
    if (isNaN(leftOverDice)) {
      break
    } else {
      picks.push(leftOverDice)
    }
  }
  console.log('in end turn')
  console.log(picks)
  //Display message to select a category
  
  messageEl.innerText = `Click a Category to Apply Score`
  
  // 3) allow player to apply their picks to a category 
  //      ***** display all categories as scorecard (start with creating HTML elements)
  //      ***** allow player to click on a category element to apply picks
  //      ***** ensure player can use any round towards any category
  //            wether it qualifies for points or not, but only can select
  //            category once other than yahtzee. 
  upperSec.forEach((cat) => {
    cat.addEventListener('click', applyScoreToCard)
  })
  
  lowerSec.forEach((cat) => {
    cat.addEventListener('click', applyScoreToCard)
  })
  // 4) save category score in player object
  // 5) clear appropriate variables and data structures to prepare for next 
  //    turn/round after certain conditions such as score has been set in 
  //    player scorecard/player object

  //MAYBE handle some of the below statements in init()
  // rollTotal = []
  // picks = []
  // choices.innerText = ''
  // chooseDice.innerText = ''
  // render()
}

function endGame(){
// GET TOTAL FOR UPPER SECTION //for each player
 
  // + sum up categories in upper section from score card/player object
  let pOneUpperSum = 0
  let pOneUpperArr = Object.keys(playerOne)
  for(let i = 0;i < 6; i++){
    pOneUpperSum += playerOne[pOneUpperArr[i]]
   }
   
   if(pOneUpperSum >= 63) {
    pOneUpperSum += 35
  }
  console.log(pOneUpperSum) 
//Player 2
   let pTwoUpperSum = 0
  let pTwoUpperArr = Object.keys(playerTwo)
  for(let i = 0;i < 6; i++){
    pTwoUpperSum += playerTwo[pTwoUpperArr[i]]
   }

   if(pTwoUpperSum >= 63) {
    pTwoUpperSum += 35
  }
  console.log(pTwoUpperSum) 
// + consider if sum of upper section qualifies (63+) for bonus 
    // - add 35 to upper total if qualifies
  

//GET TOTAL FOR LOWER SECTION //for each player
  // + summarize categories in lower section and add to lower section total
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
  // set grand total to sum of upper section total and lower section total


let pOneTotal = pOneUpperSum + pOneLowerSum
console.log(pOneTotal)

let pTwoTotal = pTwoUpperSum + pTwoLowerSum
console.log(pTwoTotal)

//DETERMINE WINNER
  // + compare playerOne total and playerTwo total
  if (pOneTotal > pTwoTotal) {
    winner = true
    messageEl.innerText = `Player One Wins!` 
    console.log("player 1 wins")
  } 
  if (pOneTotal < pTwoTotal) {
    winner = true
    messageEl.innerText = `Player Two Wins!`
    console.log("player 2 wins")
  } 
  if (pOneTotal === pTwoTotal){
    winner = null
    messageEl.innerText = `Tie...`
  }


//Display Replay Button and message 

  //return
}

// ****** MAKE it to where this function can only be called after third roll
//by placing it previously on the call stack
function applyScoreToCard(evt) {
  console.log('in applyScoreToCard')
  //temporarily use reduce to sum all dice in picks[]
  //***** Could have a funtion to handle total
  // let total = picks.reduce((sum, cur) => {
  //   return sum + cur
  // }, 0)
  // chooseDice.innerText = total;

  // //apply total to selected element
  
  // //if evt is from upper section 
  // let id = parseInt(evt.target.id)
  // console.log(id)
  // // for (let i = 0; i < upperSec.length; i++) {
  // //   console.log(total)
  // //   if (i === id) {
  //    let newDiv = document.createElement('div')
  //   //  newDiv.addEventListener('click', putDiceBackInPlay)
  //    newDiv.innerText = total
  //    console.log(newDiv)
  //    upperSec[id].appendChild(newDiv)
  //   // }
  // }

  //if evt is from lower section

  //come up with score based off category player selected
 //  ***************************
  //if a category from upper section was selected
  //sum up all of players dice that match the number for that category
  // let catNum = parseInt(evt.target.id)
  let values  //clear values after switch statement
let valueKeys
catNum = parseInt(evt.target.id)
//picks = [5,5,5,5,2]
  //**>if evt comes from upperSec
  if (catNum === 1 || catNum === 2 || catNum === 3 
      || catNum === 4 || catNum === 5 || catNum === 6){
  
  let sum 
  console.log("in upper section")
  //****> if(!picks.includes(catNum))
  //****>   sum === 0
  //****>   else  execute below statements 
  let eligibleNums = picks.filter(num => num === catNum)
  console.log('filtering numbers', eligibleNums)
  sum = eligibleNums.reduce((prev, cur) => prev + cur, 0)
  console.log('sum of selected', sum)

  if(turn === -1) {
    playerOne.catNum = sum
    playOneCurTotal += sum
    console.log('set an upper score')
  } else if (turn === 1) {
    playerTwo.catNum = sum
    playTwoCurTotal += sum
    console.log('set an upper score')
  } 

  //element.innertext = sum
  //player.category = sum //have if stay with 2 player and object is needed
  // console.log(sum)

  // let value
  // let sum = 0
  // for (let i = 0; i < arr.length; i++) {
  //   for (let j = 0; j < arr.length; j++) {
  //     if (arr[i] === arr[j] && i !== j) {
  //       sum += arr[i]
  //       value = arr[i]
  //     }
  //   }
  // }
  // sum /= 2
// let values  //clear values after switch statement
// let valueKeys
// catNum = 12
// picks = [5,5,5,5,2]
  //*******Add code to arrange values in sequence from lowest to highest!!!!
          //for sequence maybe have set arrays to match to and if one of the
          // arrays match then give the score for the straight
          // ALSO can have an array 1 - 5 and if number in picks array has 
          // array[i] then place it in an array by pushing i, then score
  //COULD DO CONDITIONAL THAT CONSIDERS DICE VALUE RATHER THAN EVENT
  //ALSO COULD BE A GOOD PLACE FOR A SWITCH STATEMENT!!! DONT FORGET TO USE BREAK
  //??Do I really need to keep track of card and player obj or can
            //??I just get values from card to do end of game totals?
  render()
} // else{

  switch (catNum) {
    case 7://3 of a kind
      console.log('in 3 of kind')
      values = picks.reduce((obj, dice) => {
        if (obj[dice]) {
            obj[dice]++
        }else {
          obj[dice] = 1
        }
        return obj
      }, {})
      console.log(values)
      valueKeys = Object.keys(values)
      if(valueKeys.length <= 3 && (values[valueKeys[0]] >= 3 
        || values[valueKeys[1]] >= 3 || values[valueKeys[2]] >= 3)) { 
        sum = picks.reduce((prev, cur) => prev + cur, 0)
        //element.innertext = sum  //OR MAYBE I could somehow read all category//scores from object and place in card
        if(turn === -1) {
          playerOne.threeOfAKind = sum
          playOneCurTotal += sum
          console.log('player one 3 kind' + sum)
          console.log(playerOne.threeOfAKind)
        } else if (turn === 1) {
          playerTwo.threeOfAKind = sum
          playTwoCurTotal += sum
          console.log('player two 3 kind' + sum)
          console.log(playerTwo.threeOfAKind)
        }                          
                                  
      // } else {
      //   if(turn === -1) {
      //     playerOne.threeOfAKind = 0
      //     console.log('player one 3 kind' + 0)
      //     console.log(playerOne.threeOfAKind)
      //   } else if (turn === 1) {
      //     playerTwo.threeOfAKind = 0
      //     console.log('player two 3 kind' + 0)
      //     console.log(playerTwo.threeOfAKind)
      //   }
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
      console.log(values)
      valueKeys = Object.keys(values)
      if(valueKeys.length <= 2 && (values[valueKeys[0]] >= 4 
        || values[valueKeys[1]] >= 4)) { 
        sum = picks.reduce((prev, cur) => prev + cur, 0)
        //element.innertext = sum
        if(turn === -1) {
          playerOne.fourOfAKind = sum
          playOneCurTotal += sum
          console.log('player one 4 kind' + sum)
          console.log(playerOne.fourOfAKind)
        } else if (turn === 1) {
          playerTwo.fourOfAKind = sum
          playTwoCurTotal += sum
          console.log('player two 4 kind' + sum)
          console.log(playerTwo.fourOfAKind)
        }
    
      } //else {
      // //   //element.innertext = 0
      // //   if(turn === -1) {
      // //     playerOne.fourOfAKind = 0
      // //     console.log('player one 4 kind' + 0)
      // //     console.log(playerOne.fourOfAKind)
      // //   } else if (turn === 1) {
      // //     playerTwo.fourOfAKind = 0
      // //     console.log('player two 4 kind' + 0)
      // //     console.log(playerTwo.fourOfAKind)
      // //   }
      // }
      break;
    case 9://FULLHOUSE
    console.log('in fullhous')
      values = picks.reduce((obj, dice) => {
        if (obj[dice]) {
          obj[dice]++
        } else {
          obj[dice] = 1
        }
        console.log(obj)
        return obj
      }, {})
      valueKeys = Object.keys(values)
      if(valueKeys.length === 2 && (values[valueKeys[0]] === 2 
          || values[valueKeys[0]] === 3)) { 
        //element.innertext = 25
        if(turn === -1) {
          playerOne.fullHouse = 25
          playOneCurTotal += 25
          console.log('player one fullhouse' + 25)
          console.log(playerOne.fullHouse)
        } else if (turn === 1) {
          playerTwo.fullHouse = 25
          playTwoCurTotal += 25
          console.log('player two fullhouse' + 25)
          console.log(playerTwo.fullHouse)
        }
  
      } //else {
      //   //element.innertext = 0
      //   if(turn === -1) {
      //     playerOne.fullHouse = 0
      //     console.log('player one fullhouse' + 0)
      //     console.log(playerOne.fullHouse)
      //   } else if (turn === 1) {
      //     playerTwo.fullHouse = 0
      //     console.log('player two fullhouse' + 0)
      //     console.log(playerTwo.fullHouse)
      //   }
      //}   
      break;
    case 10://Small Straight
      if ((picks.includes(1) && picks.includes(2) && picks.includes(3) && picks.includes(4))
          || (picks.includes(2) && picks.includes(3) && picks.includes(4) 
          && picks.includes(5)) || (picks.includes(3) && picks.includes(4) && picks.includes(5) 
          && picks.includes(6))) {
        //element.innertext = 30
        if(turn === -1) {
          playerOne.lowStraight = 30
          playOneCurTotal += 30
          console.log('player one S straight' + 30)
          console.log(playerOne.lowStraight)
        } else if (turn === 1) {
          playerTwo.lowStraight = 30
          playTwoCurTotal += 30
          console.log('player two S straight' + 30)
          console.log(playerTwo.lowStraight)
        }
      // } else if (picks.includes(2) && picks.includes(3) && picks.includes(4) 
      //             && picks.includes(5)) {
      //   //element.innertext = 30
      //   //player.category = 30
      //   console.log('Small Straight')
      // } else if (picks.includes(3) && picks.includes(4) && picks.includes(5) 
      //             && picks.includes(6)){
      //   //element.innertext = 30
      //   //player.category = 30
      //   console.log('Small Straight')
      } //else {
        //element.innertext = 0
      //   if(turn === -1) {
      //     playerOne.lowStraight = 0
      //     console.log('player one S straight' + 0)
      //     console.log(playerOne.lowStraight)
      //   } else if (turn === 1) {
      //     playerTwo.lowStraight = 0
      //     console.log('player two S straight' + 0)
      //     console.log(playerTwo.lowStraight)
      //   }
      // }
    
      break;
    case 11://Large Straight
      console.log('in large straight')
        if ((picks.includes(1) && picks.includes(2) && picks.includes(3) && picks.includes(4) 
              && picks.includes(5)) || (picks.includes(2) && picks.includes(3) && picks.includes(4) && picks.includes(5) 
              && picks.includes(6))) {
          //element.innertext = 40
          if(turn === -1) {
            playerOne.highStraight = 40
            playOneCurTotal += 40
            console.log('player one L straight' + 40)
            console.log(playerOne.highStraight)
          } else if (turn === 1) {
            playerTwo.highStraight = 40
            playTwoCurTotal += 40
            console.log('player two L straight' + 40)
            console.log(playerTwo.highStraight)
            console.log('large straight')
        // } else if (picks.includes(2) && picks.includes(3) && picks.includes(4) && picks.includes(5) 
        // && picks.includes(6)) {
        //   //element.innertext = 40
        //   if(turn === 1) {
        //   playerOne.highStraight = 40
        //   console.log('player one L straight' + 40)
        //   console.log(playerOne.highStraight)
        // } else if (turn === 1) {
        //   playerTwo.highStraight = 40
        //   console.log('player two L straight' + 40)
        //   console.log(playerTwo.highStraight)
        //   console.log('large straight')
        } //else {
        //   //element.innertext = 0
        //   if(turn === -1) {
        //     playerOne.highStraight = 0
        //     console.log('player one L straight')
        //     console.log(playerOne.highStraight)
        //   } else if (turn === 1) {
        //     playerTwo.highStraight = 0
        //     console.log('player two L straight' + 0)
        //     console.log(playerTwo.highStraight)
        //   }
        // }
      }
      break;
  //****> else if evt comes from id#11
    case 12://XXXXXXYAHTZEE
      if(picks.every((num, i, picks) => num === picks[0])){
        //element.innertext = 50
        if(turn === -1) {
          playerOne.yahtzee = 50
          playOneCurTotal += 50
          diceTotal.innerText = playOneCurTotal
          console.log('player one yahtzee' + 50)
          console.log(playerOne.yahtzee)
        } else if (turn === 1) {
          playerTwo.yahtzee = 50
          playTwoCurTotal += 50
          console.log('player two yahtzee' + 50)
          console.log(playerTwo.yahtzee)
        }
        console.log('yahtzee')
      // } else {
      //   //element.innertext = 0
      //   if(turn === -1) {
      //     playerOne.yahtzee = 0
      //     console.log('player one L straight')
      //     console.log(playerOne.highStraight)
      //   } else if (turn === 1) {
      //     playerTwo.yahtzee = 0
      //     console.log('player two L straight' + 0)
      //     console.log(playerTwo.highStraight)
      //   }
      }
  //******> else set scores to 50 and (unhide an element for
  // Bonus Yahtzee)possible bonus feature
      break;
    case 13: //XXXXXXXCHANCE
      sum = picks.reduce((prev, cur) => prev + cur, 0)
      //element.innertext = sum
      if(turn === -1) {
        playerOne.chance = sum
        playOneCurTotal = +sum
        console.log('player one chance' + sum)
        console.log(playerOne.chance)
      } else if (turn === 1) {
        playerTwo.chance = sum
        playTwoCurTotal = +sum
        console.log('player two chance' + sum)
        console.log(playerTwo.chance)
      }
      break;
  // //****> else if evt comes from id#13 after unhidden
  //   case 13://possible bonus feature
  // //******> Add score of 100
  }//end switch         
  // console.log(player[playerOne[chance]])

  //clear values... Maybe after switch statement
  //handle totals and added bonuses from sections MAYBE in another funtion
  console.log('end of scoring')
  render()
//}//end else
}//end function




