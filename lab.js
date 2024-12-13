  // Массив карт с изображениями и значениями
  const cards = [
    { src: 'images/6 (+).jpg', alt: '6', value: 6 },
    { src: 'images/7 (+).jpg', alt: '7', value: 7 },
    { src: 'images/8 (+).jpg', alt: '8', value: 8 },
    { src: 'images/9 (+).jpg', alt: '9', value: 9 },
    { src: 'images/10 (+).jpg', alt: '10', value: 10 },
    { src: 'images/J(+).jpg', alt: 'J', value: 2 },
    { src: 'images/Q(+).jpg', alt: 'Q', value: 3 },
    { src: 'images/K(+).jpg', alt: 'K', value: 4 },
    { src: 'images/A (+).jpg', alt: 'A', value: 11 },
];
let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;

const playerScoreDisplay = document.getElementById('player-score');
const dealerScoreDisplay = document.getElementById('dealer-score');
const playerCardsDisplay = document.getElementById('player-cards');
const dealerCardsDisplay = document.getElementById('dealer-cards');
const outcomeDisplay = document.getElementById('outcome');
const newGameBtn = document.getElementById('new-game');
const drawCardBtn = document.getElementById('draw-card');
const holdBtn = document.getElementById('hold');

function getRandomCard() {
    return cards[Math.floor(Math.random() * cards.length)];
}

function updateDisplay() {
    playerScoreDisplay.textContent = `Ваш рахунок: ${playerScore}`;
    dealerScoreDisplay.textContent = `Рахунок опонента: ${dealerScore}`;

    playerCardsDisplay.innerHTML = '';
    dealerCardsDisplay.innerHTML = '';

    playerCards.forEach(card => {
        const imgElement = document.createElement('img');
        imgElement.src = card.src; 
        imgElement.alt = card.alt; 
        imgElement.className = 'card-img';
        playerCardsDisplay.appendChild(imgElement);
    });

    dealerCards.forEach(card => {
        const imgElement = document.createElement('img');
        imgElement.src = card.src;
        imgElement.alt = card.alt;
        imgElement.className = 'card-img';
        dealerCardsDisplay.appendChild(imgElement);
    });
}

function resetGame() {
    playerCards = [];
    dealerCards = [];
    playerScore = 0;
    dealerScore = 0;
    outcomeDisplay.textContent = '';
    drawCardBtn.disabled = false;
    holdBtn.disabled = false;
    updateDisplay();
}

function endGame(message) {
    outcomeDisplay.textContent = message;
    drawCardBtn.disabled = true;
    holdBtn.disabled = true;
}

function dealerTurn() {
    while (dealerScore < 17) {
        const card = getRandomCard();
        dealerCards.push(card);
        dealerScore += card.value;
    }
    updateDisplay();

    if (dealerScore > 21 || playerScore > dealerScore) {
        endGame('Ви здобули перемогу!');
    } else if (dealerScore === playerScore) {
        endGame('Нічия!');
    } else {
        endGame('Опонент виграв!');
    }
}

drawCardBtn.addEventListener('click', () => {
    const card = getRandomCard();
    playerCards.push(card);
    playerScore += card.value;
    updateDisplay();

    if (playerScore > 21) {
        endGame('Перебір карток! Перемога зараховується опоненту!');
    }
});

holdBtn.addEventListener('click', () => {
    drawCardBtn.disabled = true;
    dealerTurn();
});

newGameBtn.addEventListener('click', () => {
    resetGame();
});