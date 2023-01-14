import s from './Articles.module.css';
import style from '../TextIcon/TextIcon.module.css';

export function textOpacityEffectDomino() {
	let counter = 0;
	let counterDevLi = 0;

	const svgLi = document.querySelectorAll(
		`.${s.lang_list} li, .${s.tool_list} li, .${s.other_list} li`
	);
	const svgLiArr = Array.from(svgLi);
	const textSvgLi = document.querySelectorAll(`.${style.text}`);
	const textSvgDevLi = document.querySelectorAll(
		`.${s.developing_list} .${style.text}`
	);
	const $devLi = document.querySelectorAll(`.${s.developing_list} li`);
	const $devLiArr = Array.from($devLi);

	const styleCode = (el, index) => {
		el[index].style.opacity = 1;
		el[index].style.filter = 'blur(0)';
	};
	let inView = false;
	let inViewDevLi = false;
	// Code to move appear and dessappear the texts
	const observerDevLi = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting && !inViewDevLi) {
				inViewDevLi = true;
				const interval = setInterval(() => {
					$devLiArr.some((_, index) => {
						if (index === counterDevLi) {
							styleCode(textSvgDevLi, index);
							return '';
						} else if (counterDevLi === $devLiArr.length) {
							counterDevLi = 0;
							styleCode(textSvgDevLi, index);
							return '';
						} else {
							textSvgDevLi[index].style.opacity = 0;
							textSvgDevLi[index].style.filter = 'blur(4px)';
							return '';
						}
					});
					counterDevLi++;
				}, 1000);
			}
		});
	});

	const observer = new IntersectionObserver(entries => {
		entries.forEach(({ isIntersecting }) => {
			if (isIntersecting && !inView) {
				inView = true;
				setInterval(() => {
					svgLiArr.some((_, index) => {
						if (index === counter) {
							styleCode(textSvgLi, index);
							return '';
						} else if (counter === svgLi.length) {
							counter = 0;
							styleCode(textSvgLi, index);
							return '';
						} else {
							textSvgLi[index].style.opacity = 0;
							textSvgLi[index].style.filter = 'blur(4px)';
							return '';
						}
					});
					counter++;
				}, 1000);
			}
		});
	});
	observer.observe(svgLiArr[0]);
	observerDevLi.observe($devLi[0]);
}
