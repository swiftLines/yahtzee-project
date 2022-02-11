/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/
const rollTotal = []


/*------------------------ Cached Element References ------------------------*/
const diceX = document.querySelectorAll('div')
const rollBtn = document.querySelector('button')
let diceTotal = document.querySelector('#total')

/*----------------------------- Event Listeners -----------------------------*/
rollBtn.addEventListener('click', diceRoll)


/*-------------------------------- Functions --------------------------------*/

function init() {
  // for (let i = 0; i < 5; i++) {
  //   rollTotal[i] = null;
  // }
}

function diceRoll(evt) {
  // let diceId = parseInt(evt.target.id)
  diceX.forEach((dice) => {
    let diceValue = Math.floor(Math.random() * 5) + 1
    dice.innerText = diceValue;
    rollTotal.push(diceValue)
  })
  
  let total = rollTotal.reduce((sum, cur) => {
    return sum + cur
  }, 0)
  diceTotal.innerText = total;
}