import s from './SliderCard.module.css'
const Card = ({ children }) => {
	return (
		<div>
			<div className={`${s.card}`}>{children}</div>
		</div>
	)
}

export default Card
