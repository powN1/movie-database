import { Link } from "react-router-dom";
import GameSlide from "../common/GameSlide";
import Slider from "react-slick";
import { useContext } from "react";
import { MediaQueriesContext } from "../App";
import { dummyMovies } from "../common/dummyDataMovies";

const Ranking = () => {
	const { mobileView, tabletView } = useContext(MediaQueriesContext);
	// Slider settings
	const settings = {
		dots: true,
		arrows: mobileView || tabletView ? false : true,
		infinite: true,
		speed: 500,
		slidesToShow: mobileView ? 1 : 3,
		slidesToScroll: mobileView ? 1 : 3,
	};


	return (
    <div className="bg-white">
		<div className="lg:w-[55%] mx-auto flex flex-col py-10 gap-y-5 bg-transparent text-black">
			<h2 className="uppercase text-4xl font-bold text-center tracking-tighter font-sansNarrow">
				Games
			</h2>
			<Link to="" className="relative h-[45vh] group overflow-hidden">
				<img
					src={dummyMovies[2].img}
					alt=""
					className="h-full w-full object-cover group-hover:scale-110 duration-700"
				/>
				<h2 className="absolute left-0 bottom-[12%] text-white text-5xl max-lg:text-3xl font-extrabold uppercase w-full text-center group-hover:text-yellow-400 duration-700 tracking-wide">
					MCU adaptation in the world of games!
				</h2>
			</Link>
			<div className="w-[95%] self-center mt-[-13%] md:mt-[-6%] lg:mt-[-5%]">
				<Slider {...settings}>
					{dummyMovies.slice(1).map((movie, i) => {
						return (
							<GameSlide
								key={i + 1}
								title={movie.title}
								img={movie.img}
								comments={movie.comments}
							/>
						);
					})}
				</Slider>
			</div>
			<Link
				path="/"
				className="self-center py-3 px-24 border border-gray-300 font-bold mt-8 hover:bg-black hover:text-white duration-500"
			>
				See all news
			</Link>
		</div>
</div>
	);
};

export default Ranking;
