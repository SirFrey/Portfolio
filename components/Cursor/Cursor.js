import { useEffect } from 'react';
import s from './Cursor.module.css';

function hasTouch() {
	return (
		'ontouchstart' in window || // html5 browsers
		navigator.maxTouchPoints > 0 || // future IE
		navigator.msMaxTouchPoints > 0
	); // current IE10
}
const eventHandler = evt => {
	if (evt) {
		return 'touchmove';
	} else {
		return 'mousemove';
	}
};
const Cursor = () => {
	useEffect(() => {
		const circles = document.querySelectorAll(`.${s.circle}`);
		console.log(circles);
		circles.forEach((circle, index) => {
			circle.x = 0;
			circle.y = 0;
		});
		const coords = { x: 0, y: 0 };
		window.addEventListener(eventHandler(hasTouch()), e => {
			const touch =
				(e.touches && e.touches[0]) ||
				(e.pointerType && e.pointerType === 'touch' && e);
			const clientX = (touch || e).clientX;
			const clientY = (touch || e).clientY;
			coords.x = clientX;
			coords.y = clientY;
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
				x += (nextCircle.x - x) * 0.1;
				y += (nextCircle.y - y) * 0.1;
			});
			requestAnimationFrame(animateCircles);
		};
		animateCircles();
	}, []);
	return (
		<>
			<div className={s.cursor}>
				<div className={s.circle}></div>
				<div className={s.circle}></div>
				<div className={s.circle}></div>
				<div className={s.circle}></div>
				<div className={s.circle}></div>
				<div className={s.circle}></div>
				<div className={s.circle}></div>
				<div className={s.circle}></div>
				<div className={s.circle}></div>
				<div className={s.circle}></div>
				<div className={s.circle}></div>
				<div className={s.circle}></div>
				<div className={s.circle}></div>
			</div>
		</>
	);
};
export default Cursor;
