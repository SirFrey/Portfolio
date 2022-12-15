import s from './TextIcon.module.css';

function TextIcon({ text }) {
	return <span className={s.text}>{text}</span>;
}

export default TextIcon;
