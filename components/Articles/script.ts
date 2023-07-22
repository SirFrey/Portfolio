import style from '../TextIcon/TextIcon.module.css';
import s from './Articles.module.css';
let counter: number = 0;
let counterDevLi: number = 0;
let intervalView: NodeJS.Timer;
let intervalKnowledge: NodeJS.Timer;

const logicShowSpan = () => {
	for (const i in $devLiArr) {
		const index = parseInt(i);
		if (index === counterDevLi) {
			// If the index of the current iteration is equal to the counter, then set the opacity and blur of the text to 1 and 0 respectively
			styleCode(textSvgDevLi, index);
			continue;
		} else if (counterDevLi === $devLiArr.length) {
			// If the counter is equal to the length of the array, then restart the counter and the opacity and blur of the text to 1 and 0 respectively
			counterDevLi = 0;
			styleCode(textSvgDevLi, index);
			continue;
		} else {
			// If the index of the current iteration is not equal to the counter, then set the opacity and blur of the text to 0 and 4 respectively
			textSvgDevLi[index].style.opacity = '0';
			textSvgDevLi[index].style.filter = 'blur(4px)';
			continue;
		}
	}
	counterDevLi++;
};
const logicShowKnowlegdeSpan = () => {
	for (const i in svgLiArr) {
		const index = parseInt(i);
		if (index === counter) {
			styleCode(textSvgLi, index);
			continue;
		} else if (counter === svgLiArr.length) {
			counter = 0;
			styleCode(textSvgLi, index);
			continue;
		} else {
			textSvgLi[index].style.opacity = '0';
			textSvgLi[index].style.filter = 'blur(4px)';
			continue;
		}
	}
	counter++;
};
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
const styleCode = (el: NodeListOf<HTMLLIElement>, index: number) => {
	el[index].style.opacity = '1';
	el[index].style.filter = 'blur(0)';
};

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
$devLi.forEach((el: HTMLLIElement, key: number) => {
	el.addEventListener('mouseover', () => {
		const keyEl = key;
		clearInterval(intervalView);
		for (const i in $devLiArr) {
			const index = parseInt(i);
			if (counterDevLi !== index) {
				textSvgDevLi[index].style.opacity = '0';
				textSvgDevLi[index].style.filter = 'blur(4px)';
			}
		}
		textSvgDevLi[keyEl].style.opacity = '1';
		textSvgDevLi[keyEl].style.filter = 'blur(0)';
	});
	el.addEventListener('mouseout', () => {
		const keyEl = key;
		textSvgDevLi[keyEl].style.opacity = '0';
		textSvgDevLi[keyEl].style.filter = 'blur(4px)';
		intervalView = setInterval(logicShowSpan, 1000);
	});
});

svgLi.forEach((el: HTMLLIElement, key: number) => {
	el.addEventListener('mouseover', () => {
		const keyEl = key;
		clearInterval(intervalKnowledge);
		for (const i in svgLiArr) {
			const index = parseInt(i);
			if (counter !== index) {
				textSvgLi[index].style.opacity = '0';
				textSvgLi[index].style.filter = 'blur(4px)';
			}
		}
		textSvgLi[keyEl].style.opacity = '1';
		textSvgLi[keyEl].style.filter = 'blur(0)';
	});
	el.addEventListener('mouseout', () => {
		const keyEl = key;
		textSvgLi[keyEl].style.opacity = '0';
		textSvgLi[keyEl].style.filter = 'blur(4px)';
		intervalKnowledge = setInterval(logicShowKnowlegdeSpan, 1000);
	});
});
observer.observe(svgLiArr[0]);
observerDevLi.observe($devLi[0]);
