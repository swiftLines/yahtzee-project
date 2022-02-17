/*-------------------------------- Constants --------------------------------*/


/*-------------------------------- Variables --------------------------------*/
let rollTotal=[], selectTotal=[], rollCount, picks=[], turn, pickCount, 
putBackCount, boardDice=[]
//may not need rollTotal as global variable

/*------------------------ Cached Element References ------------------------*/
const diceX = document.querySelectorAll('#roll')
const rollBtn = document.querySelector('button')
let diceTotal = document.querySelector('#total')
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

upperSec.forEach((cat) => {
  cat.addEventListener('click', applyScoreToCard)
})

lowerSec.forEach((cat) => {
  cat.addEventListener('click', applyScoreToCard)
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
  turn = 1

  //initialize counter for number of dice selected
  pickCount = 1

  render()
}

function render() {

//Render a message reflecting the current game state:
  let message

  if (rollCount === 3) {
    turn *= -1
    rollCount = 0
  }

  if (turn === 1) {
    message = `player one's roll`
  } else {
    message = `player two's roll`
  }
  
  messageEl.innerText = `${message}`

  //***** Maybe render if (picks.length > 0) instead of handling in diceRoll

}

//rolls dice
function diceRoll(evt) { //REMOVE evt if dont use 

  let diceValue 
// **** Add another global array to keep track of dice values on board
  if (rollCount === 3) {
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
      for (let dice of diceX) {
        if (pickCount === picks.length) {
          // dice.innerText = ''
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
      // maybe use buit-in method for dry code
        rollTotal.push(diceValue) 
        //Fill array with dice on board ***** May not need boardDice[]
        boardDice.push(diceValue)
      })
      //console.log(boardDice)
    }
  }

  //track roll amount
  rollCount++
  
  //***NEED to total all dice values for only a single roll 
  //(maybe do towards qualifying combos later....)
  let total = rollTotal.reduce((sum, cur) => {
    return sum + cur
  }, 0)
  diceTotal.innerText = total;

  // selectDice()

  //reset picks []
}

//allow player to select dice values they want to keep for their combo
function selectDice(evt) { 
  //***** only allow 5 values in pics[] 
  let choice = parseInt(evt.target.innerText)
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
  // 2) MAYBE DO LATER FEATURE MAY NOT BE NECESSARY! compare picks[] 
  //    (or may need a new data structure) to categories
  //    so that player can be aware of categories qualified for compare
  //      ***** may need to put picks array into specific order to compare
  //            in certain situations or may always want put them in
  //            sequence from lowest to highest
  //      
  // 3) allow player to apply their picks to a category 
  //      ***** display all categories as scorecard (start with creating HTML elements)
  //      ***** allow player to click on a category element to apply picks
  //      ***** ensure player can use any round towards any category
  //            wether it qualifies for points or not, but only can select
  //            category once other than yahtzee. Ensure bonus yahtzee cannot
  //            be selected if an official scoring yahtzee has not been satisfied
  // applyScoreToCard()
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

  //**>if evt comes from upperSec
  
  let catNum = 6  //parseInt(evt.target.id)
  let sum 
  
  //****> if(!picks.includes(catNum))
  //****>   sum === 0
  //****>   else  execute below statements 
  let eligibleNums = picks.filter(num => num === catNum)
  sum = eligibleNums.reduce((prev, cur) => prev + cur, 0)
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
let values  //clear values after switch statement
let valueKeys
catNum = 6
picks = [5,3,4,2,3]
  //*******Add code to arrange values in sequence from lowest to highest!!!!
          //for sequence maybe have set arrays to match to and if one of the
          // arrays match then give the score for the straight
          // ALSO can have an array 1 - 5 and if number in picks array has 
          // array[i] then place it in an array by pushing i, then score
  //COULD DO CONDITIONAL THAT CONSIDERS DICE VALUE RATHER THAN EVENT
  //ALSO COULD BE A GOOD PLACE FOR A SWITCH STATEMENT!!! DONT FORGET TO USE BREAK
  //??Do I really need to keep track of card and player obj or can
            //??I just get values from card to do end of game totals?
  //**> else evt comes from lower section 
  switch (catNum) {
  //****> if evt comes from id#6
    case 6://3 of a kind
      console.log('in 3 of kind')
      //******> if picks[] has less than 3 of a kind add score of 0 to card and player
      //******> else total all numbers and add score of 0 to card and player
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
        //element.innertext = sum  //OR MAYBE I could somehow read all category
                                  //scores from object and place in card
        //player.category = sum
        console.log('got 3')
      } else {
        //element.innertext = 0
        //player.category = 0
      }
      break;
  //****> else if evt comes from id#7
    case 7://Four of a Kind
  //******> if picks[] has less than 4 of a kind add score of 0 to card and player
  //******> else total all numbers and add score of 0 to card and player
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
        //player.category = sum
        console.log('got 4s')
      } else {
        //element.innertext = 0
        //player.category = 0
        console.log('sorry')
      }
      break;
  //****> else if evt comes from id#8
    case 8://FULLHOUSE
    console.log('in fullhous')
  //******> if picks[] does not have a pair and a 3 of kind add score of 0 to card and player
  //******> else add score of 25 to card and player
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
  //check if values has a pair and 3 of a kind by either:
      if(valueKeys.length === 2 && (values[valueKeys[0]] === 2 
          || values[valueKeys[0]] === 3)) { 
        //element.innertext = 25
        //player.category = 25
        console.log("house is full")
      } else {
        //element.innertext = 0
        //player.category = 0
      }
      //clear values... Maybe after switch statement
      break;
  //****> else if evt comes from id#9
    case 9://Small Straight
  //******> if picks[] does not contain a sequence of four numbers set score to 0
  //******> else set scores to 30 on card and player obj
      if (picks.includes(1) && picks.includes(2) && picks.includes(3) && picks.includes(4)) {
        //element.innertext = 30
        //player.category = 30
      } else if (picks.includes(2) && picks.includes(3) && picks.includes(4) 
                  && picks.includes(5)) {
        //element.innertext = 30
        //player.category = 30
      } else if (picks.includes(3) && picks.includes(4) && picks.includes(5) 
                  && picks.includes(6)){
        //element.innertext = 30
        //player.category = 30
      } else {
        //element.innertext = 0
        //player.category = 0
      }
      break;
  //****> else if evt comes from id#10
    case 10://Large Straight
      console.log('in large straight')
  //******> if picks[] does not contain a sequence of 5 numbers set score to 0
  //******> else set scores to 40 on card and player obj
        if (picks.includes(1) && picks.includes(2) && picks.includes(3) && picks.includes(4) 
              && picks.includes(5)) {
          //element.innertext = 40
        //player.category = 40
        } else if (picks.includes(2) && picks.includes(3) && picks.includes(4) && picks.includes(5) 
        && picks.includes(6)) {
          //element.innertext = 40
        //player.category = 40
        } else {
          //element.innertext = 0
        //player.category = 0
        }
      break;
  //****> else if evt comes from id#11
    case 11://XXXXXXYAHTZEE
  //******> if picks[] does not contain all same numbers set score to 0
      if(picks.every((num, i, picks) => num === picks[0])){
        //element.innertext = 50
        //player.category = 50
      } else {
        //element.innertext = 0
        //player.category = 0
      }
  //******> else set scores to 50 and (unhide an element for Bonus Yahtzee)possible bonus feature
      break;
  //****> else if evt comes from id#12
    case 12: //XXXXXXXCHANCE
  //******>Sum up all dice and set scores to sum
      sum = picks.reduce((prev, cur) => prev + cur, 0)
      //element.innertext = sum
      //player.category = sum
      break;
  //****> else if evt comes from id#13 after unhidden
    case 13://possible bonus feature
  //******> Add score of 100
  }//end switch         


  //handle totals and added bonuses from sections MAYBE in another funtion
}

function endGame(){
  //if any category does not have a score add zero or maybe can use a
  // method to only add categories with a number value

  //consider if qualified for upper bonus and add to upper total if it is

  //ensure lower section is total

  //add upper and lower to get grand total

  //determine and display the winner maybe in render()

  //confetti!!!
}

//BONUS FEATURE
function comparePicks() {
  //maybe compare picks[] with each array in a category object of arrays 
  
}