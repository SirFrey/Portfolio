import s from './Articles.module.css';
import style from '../TextIcon/TextIcon.module.css';

export function textOpacityEffectDomino() {
	let counter = 0;
	const svgLi = document.querySelectorAll(
		`.${s.lang_list} li, .${s.tool_list} li, .${s.other_list} li`
	);
	const svgLiArr = Array.from(svgLi);
	console.log(svgLiArr);
	const textSvgLi = document.querySelectorAll(`.${style.text}`);

	setInterval(() => {
		// eslint-disable-next-line array-callback-return
		svgLiArr.some((_, index) => {
			if (index === counter) {
				textSvgLi[index].style.opacity = 1;
				textSvgLi[index].style.filter = 'blur(0)';
				return index === counter;
			} else if (counter === svgLi.length) {
				counter = 0;
				textSvgLi[index].style.opacity = 1;
				textSvgLi[index].style.filter = 'blur(0)';
			} else {
				textSvgLi[index].style.opacity = 0;
				textSvgLi[index].style.filter = 'blur(4px)';
			}
		});
		counter++;
	}, 1000);
}
