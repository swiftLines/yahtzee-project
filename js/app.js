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

//rolls dice
function diceRoll(evt) {
// let diceId = parseInt(evt.target.id)
  if (rollCount === 3) {
    return
  } else {
    diceX.forEach((dice) => {
      let diceValue = Math.floor(Math.random() * 5) + 1
      dice.innerText = diceValue;
      //could just replace some code in here with reduce for dry code
      rollTotal.push(diceValue)
    })
  }
  //To get pick from rollTotal into pick[] can use div.value/target

  //track roll amount
  rollCount++
  
  //total all dice values for a single roll
  let total = rollTotal.reduce((sum, cur) => {
    return sum + cur
  }, 0)
  diceTotal.innerText = total;

  // selectDice()

  //reset picks []
}

//allow player to select dice values they want to keep for their combo
function selectDice(evt) {

  let choice = parseInt(evt.target.innerText)
  picks.push(choice)
  for (let i = 0; i < picks.length; i++) {
    choices.innerText = picks[i]
    //STILL NEED to have choices display all at once. picks[] may be clearing when new pick is selected
    //ALSO SHOULD ONLY be able to pick a dice once!!
  }
  console.log(picks)
  //total dice selected
  let total = selectTotal.reduce((sum, cur) => {
    return sum + cur
  }, 0)
  chooseDice.innerText = total;
  console.log(total)

//NEED a total towards specific combos

//display dice selected separately

//player needs to be able to put back dice also and be able to reroll that dice 

// stop or remove the dice from picks[] after 3 rolls
}