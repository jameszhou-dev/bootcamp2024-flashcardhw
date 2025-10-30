const flashcards = [
    { term: "HTML", definition: "HyperText Markup Language" },
    { term: "CSS", definition: "Cascading Style Sheets" },
    { term: "JavaScript", definition: "Programming language of the web" }
];

let currentIndex = 0;
let showingTerm = true;

function displayCard() {
    const cardContent = document.getElementById('card-content');
    if (!cardContent) return;
    if (!flashcards.length) {
        cardContent.textContent = 'No flashcards available.';
        return;
    }
    const card = flashcards[currentIndex];
    cardContent.textContent = showingTerm ? card.term : card.definition;
}


function init() {
    const flashcardEl = document.getElementById('flashcard');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const addBtn = document.getElementById('add-card-btn');
    const newTermInput = document.getElementById('new-term');
    const newDefInput = document.getElementById('new-definition');

    if (flashcardEl) {
        flashcardEl.addEventListener('click', () => {
            showingTerm = !showingTerm;
            displayCard();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (flashcards.length === 0) return;
            currentIndex = (currentIndex - 1 + flashcards.length) % flashcards.length;
            showingTerm = true;
            displayCard();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (flashcards.length === 0) return;
            currentIndex = (currentIndex + 1) % flashcards.length;
            showingTerm = true;
            displayCard();
        });
    }

    if (addBtn && newTermInput && newDefInput) {
        addBtn.addEventListener('click', () => {
            const term = newTermInput.value.trim();
            const definition = newDefInput.value.trim();
            if (!term || !definition) {
                alert('Please enter both a term and a definition.');
                return;
            }
            flashcards.push({ term, definition });
            currentIndex = flashcards.length - 1;
            showingTerm = true;
            newTermInput.value = '';
            newDefInput.value = '';
            newTermInput.focus();
            displayCard();
        });

        [newTermInput, newDefInput].forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') addBtn.click();
            });
        });
    }
    displayCard();
}

window.onload = init;
