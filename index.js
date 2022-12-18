let deckId, initialdeck, winnerCard, score1=0, score2=0 , player = 0;
const cards = document.getElementById("cards");
const cardsleft = document.getElementById("cards-left");
const winCard = document.getElementById("declare-winner")
let deckArray = [];
let winnerArray = []
const declareWinner = (winner) => {
      const Deck = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
     winner[0] = Deck.indexOf(winner[0])
     winner[1] = Deck.indexOf(winner[1])
   //  return winner[0] > winner[1] ? "Player 1 Won"   :  winner[0] < winner[1] ? "Player 2 Won" : "It's is Tie, Try again"
   if(winner[0] > winner[1])
   {
       score1 +=1
       return "Computer won"
   } else if(winner[0] < winner[1]) {
        score2 += 1
        return "You won"
   } else {
       return "It's is Tie, Try again"
   }
}
async function newDeck() {
   await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
           deckId = data.deck_id
           initialdeck = data.remaining
        })
                    cardsleft.style.color = "#fff"
                    cardsleft.style.top = "10px"
                    cardsleft.style.fontSize = "initial"
                    cardsleft.innerHTML = `Remaining Cards:- ${initialdeck}`
        console.log("Deck loaded with ID :- ", deckId)
        
        document.getElementById("new-deck").disabled = false
        score1=0, score2=0
     }

        const drawCards =   () => {
           if(deckId === undefined)
           {
               alert("Get new Deck of cards first")
           } else
           {
         fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2&remaining=true`)
           .then(response => response.json())
           .then(data => {
               cardsleft.innerHTML =`Remaining Cards :- ${data.remaining}`
               cardsleft.style.visibility = "visible"
               if(data.remaining === 0)  {
               document.getElementById("new-deck").disabled = true           
               cardsleft.style.top = "25px"
               cardsleft.style.fontSize = "1rem"
               cardsleft.style.color = "red"
               winCard.innerHTML = score1 > score2 ? "Computer won the game" : "You won the game"
               cardsleft.innerHTML =`Remaining Cards :- ${data.remaining}`
               return;
            } 
               deckArray =  data.cards.map((card) => {
                        player += 1
                        winnerArray.push(card.value)
                        return `<div class="card">
                               <span class="player" id="player${player}" style="color: #fff; padding: 10px 0;">
                               Player - ${player}</span>
                             <img class ="card-image" id="card-image" src="${card.image}"
                          </div>`
               });
                 cards.innerHTML = deckArray 
                  player = 0;
                  setTimeout(() => {
                   winnerCard = declareWinner(winnerArray)
                   winnerArray = []
                   document.getElementById("player1").innerHTML = `Computer score: ${score1}`
                   document.getElementById("player2").innerHTML = `Your score :    ${score2}`
                  // winCard.innerHTML = winnerCard
                   winCard.style.visibility = "visible"
                   cards.insertBefore(winCard, cards.children[0])
                     winnerCard = ''
               }, 0)
                document.querySelectorAll(".card-slot").forEach((cardlot) => {
                cardlot.style.visibility = "hidden"
                 })
               
               
               })
           }
}

document.getElementById("shuffle").addEventListener("click", newDeck)
document.getElementById("new-deck").addEventListener("click", drawCards)
