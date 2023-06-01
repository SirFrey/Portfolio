import s from './Articles.module.css';
import style from '../TextIcon/TextIcon.module.css';

export function textOpacityEffectDomino() {
	let counter: number = 0;
	let counterDevLi: number = 0;
	let intervalView: NodeJS.Timer;
	let isDevelopingToggle = true;
	const logicShowSpan = () => {
		$devLiArr.some((_, index) => {
			if (index === counterDevLi) {
				// If the index of the current iteration is equal to the counter, then set the opacity and blur of the text to 1 and 0 respectively
				styleCode(textSvgDevLi, index);
				return '';
			} else if (counterDevLi === $devLiArr.length) {
				// If the counter is equal to the length of the array, then restart the counter and the opacity and blur of the text to 1 and 0 respectively
				counterDevLi = 0;
				styleCode(textSvgDevLi, index);
				return '';
			} else {
				// If the index of the current iteration is not equal to the counter, then set the opacity and blur of the text to 0 and 4 respectively
				textSvgDevLi[index].style.opacity = '0';
				textSvgDevLi[index].style.filter = 'blur(4px)';
				return '';
			}
		});
		counterDevLi++;
	};
	const containerIconsKnowledgeSVGs = document.querySelector(
		`.${s.knowledgeContainer}`
	) as HTMLDivElement;

	const containerIconsDevelopingSVGs = document.querySelector(
		`.${s.developingContainer}`
	) as HTMLUListElement;
	console.log(containerIconsDevelopingSVGs);
	const svgLi: NodeListOf<HTMLLIElement> = document.querySelectorAll(
		`.${s.lang_list} li, .${s.tool_list} li, .${s.other_list} li`
	);
	const svgLiArr: Array<HTMLLIElement> = Array.from(svgLi);
	const textSvgLi: NodeListOf<HTMLLIElement> = document.querySelectorAll(
		`.${style.text}`
	);
	const textSvgDevLi: NodeListOf<HTMLLIElement> = document.querySelectorAll(
		`.${s.developing_list} .${style.text}`
	);
	const $devLi: NodeListOf<HTMLLIElement> = document.querySelectorAll(
		`.${s.developing_list} li`
	);
	const $devLiArr: Array<HTMLLIElement> = Array.from($devLi);

	const styleCode = (el: NodeListOf<HTMLLIElement>, index: number) => {
		el[index].style.opacity = '1';
		el[index].style.filter = 'blur(0)';
	};

	const svgElementsDev: Array<string> = [
		'svg',
		'path',
		'line',
		'polygon',
		'ellipse',
	];

	let inView = false;
	let inViewDevLi = false;

	// Code to move appear and dessappear the texts
	const observerDevLi = new IntersectionObserver(entries => {
		entries.forEach((entry: IntersectionObserverEntry) => {
			// If the element is intersecting and the inViewDevLi is false, then set the inViewDevLi to true and start the interval to move the text
			if (entry.isIntersecting && !inViewDevLi) {
				inViewDevLi = true;
				intervalView = setInterval(logicShowSpan, 1000);
			}
		});
	});
	containerIconsDevelopingSVGs.addEventListener('mousemove', e => {
		const target = e.target as HTMLElement;
		if (svgElementsDev.includes(target.nodeName) && isDevelopingToggle) {
			isDevelopingToggle = false;
			clearInterval(intervalView);
			$devLiArr.some((_, index: number) => {
				if (counterDevLi !== index) {
					textSvgDevLi[index].style.opacity = '0';
					textSvgDevLi[index].style.filter = 'blur(4px)';
					return '';
				}
			});
		} else if (
			!svgElementsDev.includes(target.nodeName) &&
			!isDevelopingToggle
		) {
			isDevelopingToggle = true;
			intervalView = setInterval(logicShowSpan, 1000);
		}
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
							textSvgLi[index].style.opacity = '0';
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
