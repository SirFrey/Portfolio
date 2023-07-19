import { gsap } from 'gsap';

const $bigBall = document.querySelector('.cursor__ball--big') as HTMLDivElement;
const $smallBall = document.querySelector(
	'.cursor__ball--small'
) as HTMLDivElement;
const $hoverables = document.querySelectorAll('.hoverable');

// Listeners
document.body.addEventListener('mousemove', onMouseMove);
for (let i = 0; i < $hoverables.length; i++) {
	$hoverables[i].addEventListener('mouseenter', onMouseHover);
	$hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

function onMouseMove(e: MouseEvent) {
	gsap.to($bigBall, {
		duration: 0.4,
		x: e.clientX - 15,
		y: e.clientY - 15,
	});
	gsap.to($smallBall, {
		duration: 0.1,
		x: e.clientX - 5,
		y: e.clientY - 7,
	});
}
window.addEventListener('mouseout', () => {
	$bigBall.style.opacity = '0';
	$smallBall.style.opacity = '0';
});
window.addEventListener('mouseover', () => {
	$bigBall.style.opacity = '1';
	$smallBall.style.opacity = '1';
});
// Hover an element
function onMouseHover() {
	gsap.to($bigBall, {
		duration: 0.3,
		scale: 4,
	});
}
function onMouseHoverOut() {
	gsap.to($bigBall, {
		duration: 0.3,
		scale: 1,
	});
}
