const blockScroll = ({ isBlock }) => {
	if (isBlock) {
		document.body.style.cssText = `overflow-Y: hidden;`;
	}
};

const unblockScroll = ({ element }) => {
	document.body.style.cssText = `overflow-Y: scroll;`;
};

export { unblockScroll, blockScroll };
