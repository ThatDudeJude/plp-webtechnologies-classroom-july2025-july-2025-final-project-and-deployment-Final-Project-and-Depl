// Flex Cards

// Obtain all project-cards and update them when one is clicked
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(projectCard => {
    projectCard.addEventListener('click', e => toggleFlexCard(projectCard));    
    projectCard.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === '') {
            e.preventDefault();
            toggleFlexCard(projectCard);
        }
    });    
});

// A function that makes sure the current card is open and other cards are closed with aria-expanded false
function toggleFlexCard(card) {
    let currentOpenCard = document.querySelector('.project-card.open');
    if (currentOpenCard !== card) {
        currentOpenCard.classList.remove('open');
        currentOpenCard.setAttribute('aria-expanded', 'false');
        card.classList.add('open');
        card.setAttribute('aria-expanded', 'true');
    }
}
