// Header and Navigation

const burger_nav = document.querySelector('.header .nav-list-container .burger');
const nav_list_container = document.querySelector('.header .nav-list-container');

burger_nav.addEventListener('click', () => {
    burger_nav.classList.toggle('active');
    nav_list_container.classList.toggle('more');
    const expanded = burger_nav.getAttribute('aria-expanded') === 'true';
    burger_nav.setAttribute('aria-expanded', !expanded);
});