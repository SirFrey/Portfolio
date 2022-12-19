import { useEffect } from 'react';
import s from './Cursor.module.css';
// const colors = [
// 	'#495c83',
// 	'#43567c',
// 	'#3e4f75',
// 	'#38496e',
// 	'#324367',
// 	'#2d3c60',
// 	'#273659',
// 	'#223052',
// 	'#1c2b4b',
// 	'#172545',
// 	'#111f3e',
// 	'#0b1a38',
// ];
const Cursor = () => {
	useEffect(() => {
		const circles = document.querySelectorAll(`.${s.circle}`);
		console.log(circles);
		circles.forEach((circle, index) => {
			circle.x = 0;
			circle.y = 0;
			// circle.style.backgroundColor = colors[index % colors.length];
		});
		const coords = { x: 0, y: 0 };
		window.addEventListener('mousemove', e => {
			coords.x = e.clientX;
			coords.y = e.clientY;
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
				x += (nextCircle.x - x) * 0.3;
				y += (nextCircle.y - y) * 0.3;
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
