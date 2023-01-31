import { useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import s from './SliderCard.module.css';
import Slider from 'react-slick/lib/slider';
import { Octokit } from 'octokit';

const octokit = new Octokit({
	auth: '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',
});

const SliderCard = () => {
	// const [repos, setRepos] = useState();
	const fetchRepos = async () => {
		const res = await octokit.request('GET /users/sirfrey/repos', {});
		console.log(res);
	};
	useEffect(() => {
		fetchRepos();
	});
	const settings = {
		dots: true,
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
					<div className={s.card}>
						<h3>Por publicar...</h3>
					</div>
				</div>
				<div>
					<div className={s.card}>
						<h3>Por publicar...</h3>
					</div>
				</div>
			</Slider>
		</>
	);
};

export default SliderCard;
