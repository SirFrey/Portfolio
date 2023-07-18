// TODO: upgrade to latest eslint tooling

import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Card from './Card.tsx';
import s from './SliderCard.module.css';
// Arrow button within the slider
interface Props {
	onClick?: () => void;
}
const NextArrow = ({ onClick }: Props) => {
	return (
		<button className={`${s.arrow} ${s.left}`} onClick={onClick}>
			<svg width='30px' height='80px' viewBox='0 0 50 80' xmlSpace='preserve'>
				<polyline
					fill='none'
					stroke='#FFFFFF'
					strokeWidth='1'
					strokeLinecap='round'
					strokeLinejoin='round'
					points='
	45.63,75.8 0.375,38.087 45.63,0.375 '
				/>
			</svg>
		</button>
	);
};
const PrevArrow = ({ onClick }: Props) => {
	return (
		<button className={`${s.arrow} ${s.right}`} onClick={onClick}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				xmlnsXlink='http://www.w3.org/1999/xlink'
				width='30px'
				height='80px'
				viewBox='0 0 50 80'
				xmlSpace='preserve'
			>
				<polyline
					fill='none'
					stroke='#FFFFFF'
					strokeWidth='1'
					strokeLinecap='round'
					strokeLinejoin='round'
					points='
	0.375,0.375 45.63,38.087 0.375,75.8 '
				/>
			</svg>
		</button>
	);
};

const SliderCard = () => {
	const settings = {
		dots: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
		autoplay: true,
		className: s.slider,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
	};
	return (
		<>
			<Slider {...settings}>
				<Card>
					<h3>Lorem, ipsum dolor.</h3>
				</Card>
				<Card>
					<h3>Lorem, ipsum dolor.</h3>
				</Card>
			</Slider>
		</>
	);
};

export default SliderCard;
