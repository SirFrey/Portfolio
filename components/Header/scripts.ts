interface Props {
	isBlock: boolean;
}
const blockScroll = ({ isBlock }: Props) => {
	const mainPage = document.querySelector('main') as HTMLDivElement;

	if (isBlock) {
		mainPage.style.cssText = `overflow-Y: hidden;`;
	}
};

const unblockScroll = () => {
	const mainPage = document.querySelector('main') as HTMLDivElement;

	mainPage.style.cssText = `overflow-Y: auto;`;
};

export { blockScroll, unblockScroll };
