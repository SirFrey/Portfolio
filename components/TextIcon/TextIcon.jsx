import s from './TextIcon.module.css';

// eslint-disable-next-line react/prop-types
function TextIcon({ text }) {
	return <span className={s.text}>{text}</span>;
}

export default TextIcon;
