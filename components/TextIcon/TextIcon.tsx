import s from './TextIcon.module.css'

interface Props {
	text: string
	className?: string
}
function TextIcon({ text, className }: Props) {
	return <span className={`${s.text} ${className}`}>{text}</span>
}

export default TextIcon
