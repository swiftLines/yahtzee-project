/*-------------------------------- Constants --------------------------------*/


/*-------------------------------- Variables --------------------------------*/
let rollTotal=[], selectTotal=[], rollCount, picks=[]


/*------------------------ Cached Element References ------------------------*/
const diceX = document.querySelectorAll('div')
const rollBtn = document.querySelector('button')
let diceTotal = document.querySelector('#total')
let chooseDice = document.querySelector('#select')
let choices = document.querySelector('#choices')

/*----------------------------- Event Listeners -----------------------------*/
rollBtn.addEventListener('click', diceRoll)
diceX.forEach((dice) => {
  dice.addEventListener('click', selectDice)
})



/*-------------------------------- Functions --------------------------------*/
//call init()
init()

//initialize state variables
function init() {
  //initialize array to store dice values player that player chooses for single turn
  for (let i = 0; i < 5; i++) {
    rollTotal[i] = null
  }
  //initialize role counter
  rollCount = 0
}

function render() {

}

//rolls dice
function diceRoll(evt) { //evt needed??

  if (rollCount === 3) {
    return
  } else {
    diceX.forEach((dice) => {
      let diceValue = Math.floor(Math.random() * 5) + 1
      dice.innerText = diceValue;
      //could just replace some code in here with reduce or another built in method for dry code
      rollTotal.push(diceValue)
    })
  }

  //track roll amount
  rollCount++
  
  //***NEED to total all dice values for only a single roll
  let total = rollTotal.reduce((sum, cur) => {
    return sum + cur
  }, 0)
  diceTotal.innerText = total;

  // selectDice()

  //reset picks []
}

//allow player to select dice values they want to keep for their combo
function selectDice(evt) { 
  //NEED to be able to click under Your Picks to be able to reroll a dice/ put back / allow access to with diceX 

  //if evt.target.id has been selected previously MAYBE.....
  let choice = parseInt(evt.target.innerText)
  picks.push(choice)
  //have choices display all at once
  choices.innerText = picks

  //sum up value of dice selected
  let total = picks.reduce((sum, cur) => {
    return sum + cur
  }, 0)
  chooseDice.innerText = total;

  //XXXXXXXX Remove selected dice from play
  evt.target.innerText = ''

//NEED a total towards specific combos

//******stop or remove the dice from picks[] after 3 rolls
}

function putDiceBackIntoPlay() {
//NEED to be able to click under Your Picks to be able to reroll a dice/ put back / allow access to with diceX 

// ????? THIS MAY BE WHEN I NEED TO START CREATING THE PLAYER OBJECT BECAUSE OF EVENT HANDLING ??????

//MAYBE NOT YET... MAKE CHOICES A LIST IN HTML AN CAN addEventListener
}