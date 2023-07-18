interface Props {
	isBlock: boolean;
}
const blockScroll = ({ isBlock }: Props) => {
	if (isBlock) {
		document.body.style.cssText = `overflow-Y: hidden;`;
	}
};

const unblockScroll = () => {
	document.body.style.cssText = `overflow-Y: scroll;`;
};

export { blockScroll, unblockScroll };
