const btnDice = document.querySelector(".card .btn-dice")
const adviceId = document.querySelector(".card .advice-id")
const adviceText = document.querySelector(".card .advice-text")

function getAdvice() {
  adviceText.innerText = "Loading advice..."
  adviceId.innerText = "..."

  fetch("https://api.adviceslip.com/advice")
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Network response was not ok.")
      }
    })
    .then((data) => {
      const {
        slip: { id, advice },
      } = data

      adviceId.innerText = id
      adviceText.innerText = `"${advice}"`
    })
    .catch((error) => {
      console.error(`Erro: ${error}`)
    })
}

function applyDelay() {
  btnDice.disabled = true
  btnDice.classList.add("btnLoading")

  getAdvice()

  const timeDelay = 2000
  setTimeout(() => {
    btnDice.disabled = false
    btnDice.classList.remove("btnLoading")
  }, timeDelay)
}

window.addEventListener("load", applyDelay)
btnDice.addEventListener("click", applyDelay)
