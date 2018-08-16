/*
 * Create a list that holds all of your cards
 */
 // Array containing cards
let card = document.getElementsByClassName('card');
let cards = Array.from(card);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };
    return array;
}

// Shuffle the cards array
const readyCards = shuffle(cards);

// Create HTML for each card in deck class
// Loop through node list containing shuffled cards and append HTML of randomized deck
for (let i=0; i<cards.length; i++){
         Array.prototype.forEach.call(readyCards, function(x){
         document.querySelector(".deck").appendChild(x);
      });
}

// Add event listener
for (var i = 0; i < cards.length; i++){
   cards[i].addEventListener("click", showCard);
}

// Variable cardList holds the cards being matched, cardType holds card <i> classes which are used for matching
var cardType=[];
var cardList=[];
var cardCounter=[];

// Toggle open and show classes in response to click
// Add "avoid-click" class that uses CSS to prevent double-clicking and matching a single card
function showCard(){
     this.classList.toggle("open");
     this.classList.toggle("show");
     this.classList.toggle("avoid-clicks");
     cardType.push(this.firstElementChild.className);
     cardList.push(this);
     compareCards();
};

// Compare cards and style with CSS
function compareCards(){
  var len = cardList.length;
  if (len === 2){
    preventClick();
    moveCounter();
    if (cardType[0] === cardType[1]){
      cardList[0].classList.add("match");
      cardList[1].classList.add("match");
      cardList[0].classList.remove("show", "open");
      cardList[1].classList.remove("show", "open");
      allowClick();
      clearLists();
      cardCounter.push(cardList[0]);
      cardCounter.push(cardList[1]);
      gameEnd();
    } else {
      cardList[0].classList.add("no-match");
      cardList[1].classList.add("no-match");
        setTimeout(function(){
          cardList[0].classList.remove("show", "open", "avoid-clicks", "no-match");
          cardList[1].classList.remove("show", "open", "avoid-clicks", "no-match");
          allowClick();
          clearLists();
        }, 1000);
      };
    };
}

function clearLists(){
  cardList = [];
  cardType = [];
}

// prevent clicking on more than two cards before cards are compared
function preventClick(){
    Array.prototype.filter.call(cards, function(card){
    card.classList.add('avoid-clicks');
    });
}

// allow card clicks to resume after cards are compared
function allowClick(){
    Array.prototype.filter.call(cards, function(card){
    card.classList.remove('avoid-clicks');
    });
}

// Move counter
var moves=0;
var totalMoves=document.getElementById('moves');
function moveCounter(){
  moves++;
  starRating();
//Account for "Move" vs "Moves"
  if (moves===1){
    totalMoves.innerHTML = moves + " Move";
  } else {
    totalMoves.innerHTML = moves + " Moves";
  };
}

let rating=document.getElementsByClassName('fa fa-star');
let stars = Array.from(rating);
// Array used to count how many final stars are left at the end of the game
let finalStarRating = Array.from(rating);


// Reduce star rating based on number of moves
function starRating(){
  if (moves > 12) {
    stars[0].style.visibility = "collapse";
  };
  if (moves > 24){
    stars[1].style.visibility = "collapse";
  };
  if (moves==12 || moves==24){
    finalStarRating.pop();
  }
}


// Reset game after clicking icon
var resetClass = document.getElementsByClassName('restart');
var restart=resetClass.item(0);
restart.onclick = function (){
  window.location.reload();
}

// Display modal
var modal = document.getElementById('myModal');
var finalScore=document.getElementById('final-score');
function gameEnd(){
  setTimeout(function(){
    if (cardCounter.length==16){
    modal.style.display = "block";
    finalScore.innerHTML = "With " + moves + " Moves and "+finalStarRating.length+" Stars" ;
    }
  }, 700);
}

// Play again button on modal
var replayBtn = document.getElementById('play-again-btn');
  replayBtn.onclick = function (){
  window.location.reload();
}
