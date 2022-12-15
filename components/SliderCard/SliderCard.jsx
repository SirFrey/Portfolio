import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import s from './SliderCard.module.css';
import Slider from 'react-slick/lib/slider';

const SliderCard = () => {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		adaptiveHeight: true,
		autoplay: true,
		className: s.slider,
	};
	return (
		<>
			<Slider {...settings}>
				<div>
					<h3>Por publicar...</h3>
				</div>
				<div>
					<h3>Por publicar...</h3>
				</div>
			</Slider>
		</>
	);
};

export default SliderCard;
