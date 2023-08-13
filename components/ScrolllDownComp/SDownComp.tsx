import s from './SDownStyles.module.css';

function SDownComp() {
	return (
		<a href='#Portfolio' className={s.anchor}>
			<div className={s.mouseScroll}>
				<div className={s.mouse}>
					<div className={s.mouseIn}></div>
				</div>
				<div>
					<span className={s.downArrow1}></span>
					<span className={s.downArrow2}></span>
					<span className={s.downArrow3}></span>
				</div>
			</div>
		</a>
	);
}

export default SDownComp;
