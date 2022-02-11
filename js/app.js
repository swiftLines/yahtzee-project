/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/



/*------------------------ Cached Element References ------------------------*/
const diceX = document.querySelectorAll('div')
const rollBtn = document.querySelector('button')


/*----------------------------- Event Listeners -----------------------------*/
rollBtn.addEventListener('click', handleClick)


/*-------------------------------- Functions --------------------------------*/

function handleClick(evt) {
  // let diceId = parseInt(evt.target.id)
  diceX.forEach((dice) => {
    dice.innerText = Math.floor(Math.random() * 5) + 1
  })

}