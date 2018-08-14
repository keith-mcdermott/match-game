/*
 * Create a list that holds all of your cards
 */
 // Creat array containing cards
let card = document.getElementsByClassName('card');
let cards = Array.from(card);
// console.log(cards);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

// Toggle open and show classes in response to click and add "avoid-click" class that uses CSS to prevent double-clicking and matching a single card
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
      cardList[0].classList.remove("show", "open", "avoid-clicks");
      cardList[1].classList.remove("show", "open", "avoid-clicks");
      allowClick();
      clearLists();
    } else {
        setTimeout(function(){
          cardList[0].classList.remove("show", "open", "avoid-clicks");
          cardList[1].classList.remove("show", "open", "avoid-clicks");
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

// move counter
var moves=0;
var totalMoves=document.getElementById('moves');
function moveCounter(){
  moves++;
  starRating();
//account for "Move" vs "Moves"
  if (moves===1){
    totalMoves.innerHTML = moves + " Move";
  } else {
    totalMoves.innerHTML = moves + " Moves";
  };
}

let rating=document.getElementsByClassName('fa fa-star');
let stars = Array.from(rating);

// Reduce star rating based on number of moves
function starRating(){
  if (moves > 12) {
    stars[0].style.visibility = "collapse";
  };
  if (moves > 24){
    stars[1].style.visibility = "collapse";
  };
}

// Reset game after clicking icon
var resetClass = document.getElementsByClassName('restart');
var restart=resetClass.item(0);
restart.onclick = function (){
  window.location.reload();
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
