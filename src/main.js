import Typed from 'typed.js';
import '../styles/normalize.css';
import '../styles/style.css';

const bar = document.querySelector('.bar');
const x = document.querySelector('.x');
const principal_nav = document.querySelector('.principal_nav');
const bg = document.querySelector('#bg');
const section = document.querySelector('section:first-child');
const nav_fixed = document.querySelector('.nav_fixed');

const showNavFixed = () => {
	nav_fixed.style.transform = 'translateY(-64px)translateY(64px)';
}
const unShowNavFixed = () => {
	nav_fixed.style.transform = 'translateY(-64px)translateY(-64.33px)';
}
const callback = (entries) => {
	entries.forEach(entry => {
		(entry.isIntersecting === false)
			? unShowNavFixed()
			: showNavFixed()
	})
}
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
	bg.style.display = 'inline'
	bar.style.visibility = 'hidden';
	bg.style.animation = 'show 0.6s forwards';
};
const unShowNav = () => {
	principal_nav.classList.replace('active', 'no_active');
	principal_nav.style.transform = 'translate(18.75rem)';
	bar.style.visibility = 'visible';
	bg.style.animation = 'unShow .3s both';
	document.body.style.overflow = 'visible';

	// bg.classList.toggle('bg_dark');
};

bar.addEventListener('click', showNav);
x.addEventListener('click', unShowNav);

bg.addEventListener('click', () => {
	principal_nav.classList.replace('active', 'no_active');
	principal_nav.style.transform = 'translate(18.75rem)';
	bg.style.animation = 'unShow .3s both';
	setTimeout(() => {
		bg.style.display = 'none'
	}, 300);
	bar.style.visibility = 'visible';
	document.body.style.overflow = 'visible';
});
