import { useEffect } from 'react';
import handlerEventMouse from './script';
function hasTouch() {
	return (
		'ontouchstart' in window ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0
	);
}
const Cursor = () => {
	useEffect(() => {
		const circles = document.querySelectorAll(`.circle`);
		if (hasTouch()) {
			circles.forEach(circle => {
				circle.style.display = 'none';
			});
		}
		circles.forEach(circle => {
			circle.x = 0;
			circle.y = 0;
		});
		const coords = { x: 0, y: 0 };
		window.addEventListener('mousemove', e => {
			coords.x = e.clientX;
			coords.y = e.clientY;
		});
		window.addEventListener('mouseout', e => {
			circles.forEach(circle => {
				circle.style.opacity = 0;
			});
		});
		window.addEventListener('mouseover', () => {
			circles.forEach(circle => {
				circle.style.opacity = 1;
			});
		});
		const animateCircles = () => {
			let x = coords.x;
			let y = coords.y;

			circles.forEach((circle, index) => {
				circle.style.left = `${x - 12}px`;
				circle.style.top = `${y - 12}px`;
				circle.x = x;
				circle.y = y;

				circle.style.scale = (circles.length - index) / circles.length;
				const nextCircle = circles[index + 1] || circles[0];
				x += (nextCircle.x - x) * 0.2;
				y += (nextCircle.y - y) * 0.2;
			});
			requestAnimationFrame(animateCircles);
		};
		animateCircles();
		handlerEventMouse();
	}, []);
	return (
		<>
			<div className={'cursor'}>
				<div className={'circle'}></div>
				<div className={'circle'}></div>
				<div className={'circle'}></div>
				<div className={'circle'}></div>
				<div className={'circle'}></div>
				<div className={'circle'}></div>
				<div className={'circle'}></div>
				<div className={'circle'}></div>
				<div className={'circle'}></div>
				<div className={'circle'}></div>
				<div className={'circle'}></div>
				<div className={'circle'}></div>
				<div className={'circle'}></div>
			</div>
		</>
	);
};
export default Cursor;
