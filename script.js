const text = document.getElementById("word")
const input = document.getElementById("guess")
const submit = document.getElementById("submit")
const lifes = document.getElementById("lifes")
const letterText = document.getElementById("letters")
const boneco = document.querySelector(".boneco").querySelectorAll(".hidden")
let lifeCount = 6
let letters = []
let wordHolder = []
let palavraValida = false
let palavraPraAdivinhar = null

submit.addEventListener("click", () => {
  let palavra = input.value.toLowerCase()
  let rightLetter = false
  palavra = palavra.trim().replace(/\\s+/g, '')

  if (!/^[a-zA-Z]+$/.test(palavra)) {
    alert("Digite apenas letras!")
    return
  }
  
  if (palavra.trim().split("").length == 1) {
    let PAcortada = palavraPraAdivinhar.split("")

    for (let i = 0; i < letters.length; i++) {
      if (palavra == letters[i]) {
        alert("Essa letra ja foi tente outra!")
        rightLetter = true //não necessariamente é certa mas ja foi
        break
      }
    }

    for (let i = 0; i < PAcortada.length; i++) {
      if (palavra == PAcortada[i]) {
        wordHolder[i] = palavra.trim()
        rightLetter = true
      }
    }

    if (!rightLetter) {
      letters.push(palavra)
      lifeCount -= 1
    }
  } else {
    if (palavra == palavraPraAdivinhar) {
      win()
      return
    } else {
      lifeCount -= 1
    }
  }

  if (lifeCount <= 0) {
    lose()
    return
  }

  montarPalavra(palavraPraAdivinhar)
})

function montarPalavra(word) {
  word = word.split("")
  if (wordHolder.length <= 0) {
    for (let i = 0; i < word.length; i++) {
      wordHolder[i] = "_"
    }
  }

  let vidaTexto = []
  for (let i = 0; i < lifeCount; i++) {
    vidaTexto[i] = "❤️"
  }
  if (5-lifeCount >= 0) {
    boneco[5-lifeCount].classList.remove("hidden")
  }
  
  text.innerHTML = wordHolder.join(" ")
  lifes.innerHTML = "Vidas: " + vidaTexto.join(" ")
  letterText.innerHTML = "Letras: " + letters.join(" ")

  if (wordHolder.join("") == palavraPraAdivinhar) {
    win()
  }
}

function win() {
  alert("Você venceu!")

  text.innerHTML = palavraPraAdivinhar
}

function lose () {
    if (confirm("Você perdeu! Mostrar palavra?")) {
      text.innerHTML = palavraPraAdivinhar
      console.log(palavraPraAdivinhar)
      return
    }

  if (confirm("Jogar novamente?")) {
      selecionarPalavra()
  }
}

function selecionarPalavra() {
  palavraValida = false
  lifeCount = 6
  letters = []
  wordHolder = []
  
  while (!palavraValida) {
    palavraPraAdivinhar = prompt("Digite uma palavra")
    palavraPraAdivinhar.toLowerCase()

    if (palavraValida !== null) {
          if (palavraPraAdivinhar.split("").length < 2) {
          alert("Digite uma palavra maior!")
        } else if (!/^[A-Za-z]+$/.test(palavraPraAdivinhar)) {
          alert("Digite uma palavra apenas com letras")
        } else {
          montarPalavra(palavraPraAdivinhar)
          palavraValida = true
        }
    } else {
      alert("Digite uma palavra")
    }
  }
}

selecionarPalavra()
document.getElementById("replay").addEventListener("click", selecionarPalavra)