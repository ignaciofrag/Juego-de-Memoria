const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const counterElement = document.getElementById('counter');

const cards = [
    'A', 'A', 'B', 'B', 
    'C', 'C', 'D', 'D', 
    'E', 'E', 'F', 'F', 
    'G', 'G', 'H', 'H'
];

let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(cards);
    gameBoard.innerHTML = '';
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = card;
        cardElement.innerHTML = `<span>${card}</span>`;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
    showCardsTemporarily();
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.card === card2.dataset.card) {
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === cards.length) {
            setTimeout(() => alert('¡Has ganado!'), 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function showCardsTemporarily() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => card.classList.add('flipped'));

    let counter = 3;
    counterElement.textContent = counter;

    const countdown = setInterval(() => {
        counter--;
        if (counter >= 0) {
            counterElement.textContent = counter;
        }

        if (counter < 0) {
            clearInterval(countdown);
            allCards.forEach(card => card.classList.remove('flipped'));
            counterElement.textContent = '';
        }
    }, 1000);
}

resetButton.addEventListener('click', createBoard);

createBoard();
