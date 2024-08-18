import Slider from "react-slick";
import ReviewSlide from "../common/ReviewSlide";
import { useContext } from "react";
import { MediaQueriesContext } from "../App";
import { dummyDataMovies } from "../common/dummyDataMovies";

const Reviews = () => {
	const { mobileView, tabletView } = useContext(MediaQueriesContext);

	const settings = {
		dots: true,
    arrows: mobileView || tabletView ? false : true,
		infinite: true,
		speed: 500,
		slidesToShow: mobileView ? 1 : tabletView ? 2 : 3,
		slidesToScroll: mobileView ? 1 : tabletView ? 2 : 3,
		initialSlide: 0,
	};
	return (
		<div className="bg-white">
			<div className="lg:w-[55vw] mx-auto flex flex-col py-6 gap-y-5">
				<h2 className="uppercase text-4xl font-bold text-center tracking-tighter font-sansNarrow text-black">
					Critic's reviews
				</h2>
				<div className="w-[95%] self-center">
					<Slider {...settings}>
						{dummyDataMovies.map((review, i) => {
							let {
								author: { personal_info },
							} = review;
							return (
								<ReviewSlide
									key={i}
									title={review.title}
									category={review.category}
									img={review.img}
									author={personal_info}
									rating={review.rating}
									description={review.description}
									likes={review.likes}
									type="horizontal"
								/>
							);
						})}
					</Slider>
				</div>
			</div>
		</div>
	);
};

export default Reviews;
