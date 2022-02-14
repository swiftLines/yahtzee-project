/*-------------------------------- Constants --------------------------------*/


/*-------------------------------- Variables --------------------------------*/
let rollTotal=[], selectTotal=[], rollCount, picks=[], turn, pickCount, 
putBackCount
//may not need rollTotal as global variable

/*------------------------ Cached Element References ------------------------*/
const diceX = document.querySelectorAll('#roll')
const rollBtn = document.querySelector('button')
let diceTotal = document.querySelector('#total')
let chooseDice = document.querySelector('#select')
let choices = document.querySelector('#choices')
let messageEl = document.querySelector('#message')
const pickdDice = document.querySelectorAll('.pick')

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
//***** NEED TO handle end turn events in this function or call to an endTurn() 
  if (rollCount === 3) {
    rollTotal = []
    picks = []
    choices.innerText = ''
    chooseDice.innerText = ''
    render()
  } else {
    //Keep selected dice removed from play 
    //***** STILL need to have correct number of dice removed for third roll...
    // MAYBE add to render... OR put with 
    if (picks.length > 0) {
      for (let dice of diceX) {
        if (pickCount === picks.length) {
          // dice.innerText = ''
          break
        } else {
          diceValue = Math.floor(Math.random() * 5) + 1
          dice.innerText = diceValue;
          pickCount++
          console.log(pickCount)
        }
      }
    } else {
      diceX.forEach((dice) => {
        diceValue = Math.floor(Math.random() * 6) + 1
        dice.innerText = diceValue;
      //maybe could just replace some code in here with reduce or another built in
      // method for dry code
        rollTotal.push(diceValue) 
        
      })
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
  //NEED to be able to click under Your Picks to be able to reroll a dice/ 
  //put back / allow access to with diceX 
  //if evt.target.id has been selected previously MAYBE.....
  let choice = parseInt(evt.target.innerText)
  picks.push(choice)
  //have choices display all at once
// ******* CAN REMOVE BELOW AFTER code to fill html elements below
  //choices.innerText = picks
  console.log(picks)
  //sum up value of dice selected
  let total = picks.reduce((sum, cur) => {
    return sum + cur
  }, 0)
  chooseDice.innerText = total;

  //Remove selected dice from play
  evt.target.innerText = ''

//***** Will need to place in html elements so that you can click to place 
//back into dice cup
   let newDiv = document.createElement('div')
   newDiv.addEventListener('click', putDiceBackInPlay)
   newDiv.innerText = choice
   choices.appendChild(newDiv)
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