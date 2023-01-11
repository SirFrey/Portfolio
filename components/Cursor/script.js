const handlerEventMouse = () => {
	const circles = document.querySelectorAll('.circle');
	// const firstCircle = circles[0];

	window.addEventListener('click', () => {
		// firstCircle.style.
	});
	document.querySelectorAll('button, a, i, li > svg').forEach(elm => {
		elm.addEventListener('mouseover', () => {
			circles.forEach(circle => {
				circle.style.backgroundColor = '#48e';
			});
		});
		elm.addEventListener('mouseout', () => {
			circles.forEach(circle => {
				circle.style.background = 'var(--principalColor)';
			});
		});
	});
};

export default handlerEventMouse;
