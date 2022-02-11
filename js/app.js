/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/



/*------------------------ Cached Element References ------------------------*/
const dice = document.querySelectorAll('div')
const rollBtn = document.querySelector('button')


/*----------------------------- Event Listeners -----------------------------*/
rollBtn.addEventListener('click', handleClick)


/*-------------------------------- Functions --------------------------------*/

function handleClick(evt) {
  let diceId = parseInt(evt.target.id)
  diceId.innerText = Math.floor(Math.random() * 5);
}