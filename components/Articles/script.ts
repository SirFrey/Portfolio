import style from '../TextIcon/TextIcon.module.css';
import s from './Articles.module.css';

let counter: number = 0;
let counterDevLi: number = 0;
let intervalView: NodeJS.Timer;
let intervalKnowledge: NodeJS.Timer;
let isDevelopingToggle = true;
let isKnowlegdeToggle = true;
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
const logicShowKnowlegdeSpan = () => {
	svgLiArr.some((_, index) => {
		if (index === counter) {
			styleCode(textSvgLi, index);
			return '';
		} else if (counter === svgLiArr.length) {
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
};
const containerIconsKnowledgeSVGs = document.querySelector(
	`.${s.knowledgeContainer}`
) as HTMLDivElement;

const containerIconsDevelopingSVGs = document.querySelector(
	`.${s.developingContainer}`
) as HTMLUListElement;

const svgLi: NodeListOf<HTMLLIElement> = document.querySelectorAll(
	`.${s.knowledgeContainer} li`
);
const svgLiArr: Array<HTMLLIElement> = Array.from(svgLi);
const textSvgLi: NodeListOf<HTMLLIElement> = document.querySelectorAll(
	`.${s.knowledgeContainer} .${style.text}`
);
const textSvgDevLi: NodeListOf<HTMLLIElement> = document.querySelectorAll(
	`.${s.developing_list} .${style.text}`
);

const $devLi: NodeListOf<HTMLLIElement> = document.querySelectorAll(
	`.${s.developing_list} li`
);
const $devLiArr: Array<HTMLLIElement> = Array.from($devLi);
console.log(svgLi.length);
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
	'g',
	'circle',
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
const observer = new IntersectionObserver(entries => {
	entries.forEach(({ isIntersecting }) => {
		if (isIntersecting && !inView) {
			inView = true;
			intervalKnowledge = setInterval(logicShowKnowlegdeSpan, 1000);
		}
	});
});
containerIconsDevelopingSVGs.addEventListener('mousemove', e => {
	const target = e.target as HTMLElement;
	console.log(target.nodeName);
	if (svgElementsDev.includes(target.nodeName) && isDevelopingToggle) {
		isDevelopingToggle = false;
		clearInterval(intervalView);
		$devLiArr.some((_, index: number) => {
			if (counterDevLi !== index) {
				textSvgDevLi[index].style.opacity = '0';
				textSvgDevLi[index].style.filter = 'blur(4px)';
				return '';
			}
			return '';
		});
	} else if (!svgElementsDev.includes(target.nodeName) && !isDevelopingToggle) {
		isDevelopingToggle = true;
		intervalView = setInterval(logicShowSpan, 1000);
	}
});

containerIconsKnowledgeSVGs.addEventListener('mousemove', e => {
	const target = e.target as HTMLElement;
	console.log(target.nodeName);
	if (svgElementsDev.includes(target.nodeName) && isKnowlegdeToggle) {
		isKnowlegdeToggle = false;
		clearInterval(intervalKnowledge);
		$devLiArr.some((_, index: number) => {
			if (counter !== index) {
				textSvgLi[index].style.opacity = '0';
				textSvgLi[index].style.filter = 'blur(4px)';
				return '';
			}
			return '';
		});
	} else if (!svgElementsDev.includes(target.nodeName) && !isKnowlegdeToggle) {
		isKnowlegdeToggle = true;
		intervalView = setInterval(logicShowKnowlegdeSpan, 1000);
	}
});
observer.observe(svgLiArr[0]);
observerDevLi.observe($devLi[0]);
