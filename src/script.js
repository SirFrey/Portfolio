import Typed from '../node_modules/typed.js/src/typed.js';

var options = {
	strings: ['Moises Castellanos'],
	typeSpeed: 50,
	backSpeed: 50,
	loop: true,
	startDelay: 1000,
	backDelay: 1000,
};

new Typed('.tag_title', options);

const $ = (element) => document.querySelector(element);

const bar = $('.bar');
const x = $('.x');
const principal_nav = $('.principal_nav');
const bg = $('#bg');

// Styles to show and unshow NavBar

const showNav = () => {
	principal_nav.classList.replace('no_active', 'active');
	principal_nav.style.transform = 'translate(-18.75rem)';
	bg.classList.toggle('bg_dark');
};
const unShowNav = () => {
	principal_nav.classList.replace('active', 'no_active');
	principal_nav.style.transform = 'translate(18.75rem)';
	bg.classList.toggle('bg_dark');
};

bar.addEventListener('click', showNav);
x.addEventListener('click', unShowNav);

bg.addEventListener('click', () => {
	principal_nav.style.transform = 'translate(18.75em)';
	bg.classList.toggle('bg_dark');
});
