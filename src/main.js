import Typed from 'typed.js';
import '../styles/normalize.css';
import '../styles/style.css';

/** @type {HTMLDivElement} **/
const bar = document.querySelector('.bar');

/** @type {HTMLDivElement} **/
const x = document.querySelector('.x');

/** @type {HTMLDivElement} **/
const principal_nav = document.querySelector('.principal_nav');

/** @type {HTMLDivElement} **/
const bg = document.querySelector('#bg');

/** @type {HTMLDivElement} **/
const section = document.querySelector('section:first-child');

/** @type {HTMLDivElement} **/
const navFixed = document.querySelector('.nav_fixed');

const showNavFixed = () => {
	navFixed.style.transform = 'translateY(-64px)translateY(64px)';
};
const unShowNavFixed = () => {
	navFixed.style.transform = 'translateY(-64px)translateY(-64.33px)';
};

let scrollval = 0;
const scrollEvent = () => {
	if (scrollval > window.scrollY) {
		showNavFixed();
	} else {
		unShowNavFixed();
	}
	scrollval = window.scrollY;
};

const callback = (entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting === false) {
			window.addEventListener('scroll', scrollEvent);
		} else {
			window.removeEventListener('scroll', scrollEvent);
		}
		entry.isIntersecting === false ? unShowNavFixed() : showNavFixed();
	});
};

const observer = new IntersectionObserver(callback);
observer.observe(section);

const options = {
	strings: ['Moises Castellanos'],
	typeSpeed: 50,
	backSpeed: 50,
	loop: true,
	startDelay: 1000,
	backDelay: 1000,
};

new Typed('.tag_title', options);

// Styles to show and unshow NavBar

const showNav = () => {
	principal_nav.classList.replace('no_active', 'active');
	principal_nav.style.transform = 'translate(-18.75rem)';
	bg.style.display = 'inline';
	bar.style.visibility = 'hidden';
	bg.style.animation = 'show 0.6s forwards';
};
const unShowNav = () => {
	principal_nav.classList.replace('active', 'no_active');
	principal_nav.style.transform = 'translate(18.75rem)';
	bar.style.visibility = 'visible';
	bg.style.animation = 'unShow .6s both';
	document.body.style.overflow = 'visible';
};

bar.addEventListener('click', showNav);
x.addEventListener('click', unShowNav);

bg.addEventListener('click', () => {
	principal_nav.classList.replace('active', 'no_active');
	principal_nav.style.transform = 'translate(18.75rem)';
	bg.style.animation = 'unShow .6s both';
	setTimeout(() => {
		bg.style.display = 'none';
	}, 300);
	bar.style.visibility = 'visible';
	document.body.style.overflow = 'visible';
});
