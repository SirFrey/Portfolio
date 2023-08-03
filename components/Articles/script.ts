import s from './Articles.module.css';
let counter: number = 0;
let counterDevLi: number = 0;
let intervalDev: NodeJS.Timer;
let intervalKnowledge: NodeJS.Timer;

interface PropsFnShowSpan {
	element: Array<HTMLElement>;
	counterEl: number;
}

const logicShowSpanP = ({ element, counterEl }: PropsFnShowSpan) => {
	for (const i in element) {
		const index = parseInt(i);

		if (index === counterEl) {
			element[index].classList.add(s.textSpanIcons);
			continue;
		} else if (counterEl === element.length) {
			counterEl = 0;
			element[index].classList.add(s.textSpanIcons);
			continue;
		} else {
			element[index].classList.remove(s.textSpanIcons);
		}
	}
	counterEl++;
	return counterEl;
};
const svgLi: NodeListOf<HTMLLIElement> = document.querySelectorAll(
	`.${s.knowledgeContainer} li`
);
const svgLiArr: Array<HTMLLIElement> = Array.from(svgLi);

const $devLi: NodeListOf<HTMLLIElement> = document.querySelectorAll(
	`.${s.developing_list} li`
);
const $devLiArr: Array<HTMLLIElement> = Array.from($devLi);

const showDevSpan = () => {
	counterDevLi = logicShowSpanP({
		counterEl: counterDevLi,
		element: $devLiArr,
	});
};
const showKnowledgeSpan = () => {
	counter = logicShowSpanP({
		counterEl: counter,
		element: svgLiArr,
	});
};

// Code to move appear and dessappear the texts
const observerDevLi = new IntersectionObserver(entries => {
	entries.forEach(({ isIntersecting }) => {
		// If the element is intersecting and the inViewDevLi is false, then set the inViewDevLi to true and start the interval to move the text
		if (isIntersecting) {
			intervalDev = setInterval(showDevSpan, 1000);
			observerDevLi.unobserve($devLiArr[0]);
		}
	});
});

const observer = new IntersectionObserver(entries => {
	entries.forEach(({ isIntersecting }) => {
		if (isIntersecting) {
			intervalKnowledge = setInterval(showKnowledgeSpan, 1000);
			observer.unobserve(svgLiArr[0]);
		}
	});
});

$devLi.forEach((el: HTMLLIElement, key: number) => {
	el.addEventListener('mouseover', () => {
		const keyEl = key;
		clearInterval(intervalDev);
		for (const i in $devLiArr) {
			const index = parseInt(i);
			if (counterDevLi !== index) {
				$devLiArr[index].classList.remove(s.textSpanIcons);
			}
		}
		$devLiArr[keyEl].classList.add(s.textSpanIcons);
	});
	el.addEventListener('mouseout', () => {
		const keyEl = key;
		$devLiArr[keyEl].classList.add(s.textSpanIcons);
		counterDevLi = key + 1;
		counterDevLi = logicShowSpanP({
			counterEl: counterDevLi,
			element: $devLiArr,
		});
		intervalDev = setInterval(showDevSpan, 1000);
	});
});

svgLi.forEach((el: HTMLLIElement, key: number) => {
	el.addEventListener('mouseover', () => {
		const keyEl = key;
		clearInterval(intervalKnowledge);
		for (const i in svgLiArr) {
			const index = parseInt(i);
			if (counter !== index) {
				svgLiArr[index].classList.remove(s.textSpanIcons);
			}
		}
		svgLiArr[keyEl].classList.add(s.textSpanIcons);
	});
	el.addEventListener('mouseout', () => {
		const keyEl = key;
		counter = key + 1;
		counter = logicShowSpanP({
			counterEl: counter,
			element: svgLiArr,
		});
		svgLi[keyEl].classList.remove(s.textSpanIcons);
		intervalKnowledge = setInterval(showKnowledgeSpan, 1000);
	});
});
observer.observe(svgLiArr[0]);
observerDevLi.observe($devLi[0]);
