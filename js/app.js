/*-------------------------------- Constants --------------------------------*/


/*-------------------------------- Variables --------------------------------*/
let rollTotal=[], selectTotal=[], rollCount


/*------------------------ Cached Element References ------------------------*/
const diceX = document.querySelectorAll('div')
const rollBtn = document.querySelector('button')
let diceTotal = document.querySelector('#total')
let chooseDice = document.querySelector('#select')

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

//rolls dice
function diceRoll(evt) {
// let diceId = parseInt(evt.target.id)
  if (rollCount === 3) {
    return
  } else {
    diceX.forEach((dice) => {
      let diceValue = Math.floor(Math.random() * 5) + 1
      dice.innerText = diceValue;
      rollTotal.push(diceValue)
    })
  }
  //track roll amount
  rollCount++
  
  //total all dice values for a single roll
  let total = rollTotal.reduce((sum, cur) => {
    return sum + cur
  }, 0)
  diceTotal.innerText = total;

  selectDice()
}

//allow player to select dice values they want to keep for their combo
function selectDice() {
  //total dice selected
  let total = selectTotal.reduce((sum, cur) => {
    return sum + cur
  }, 0)
  chooseDice.innerText = total;
  //display dice selected separately

  // stop or remove the dice that was selected
}