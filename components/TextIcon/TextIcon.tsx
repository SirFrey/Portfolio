import s from './TextIcon.module.css';

interface Props {
	text: string;
}
function TextIcon({ text }: Props) {
	return <span className={s.text}>{text}</span>;
}

export default TextIcon;
