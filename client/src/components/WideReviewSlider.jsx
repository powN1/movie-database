import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import deadpool from "../imgs/deadpool.jpg";
import mcu from "../imgs/mcu.jpg";
import rdj from "../imgs/rdj.jpg";
import batman from "../imgs/batman.jpg";
import giancarlo from "../imgs/giancarlo.jpg";
import dexter from "../imgs/dexter.jpg";
import hellboy from "../imgs/hellboy.jpg";
import penguin from "../imgs/penguin.jpg";
import reaper from "../imgs/reaper.jpg";
import Slider from "react-slick";
import MovieSlide from "../common/MovieSlide";

const WideReviewSlider = () => {
	const [currentMovieCategory, setCurrentMovieCategory] = useState("movies");

	// Slider settings
	const settings = {
		dots: false,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		autoplay: true,
		autoplaySpeed: 15000,
		pauseOnHover: true,
	};
	const categories = [
		{ title: "Movies" },
		{ title: "Series" },
		{ title: "Games" },
	];

	const movies = [
		{
			title: "I am legend 2",
			img: deadpool,
			ranking: 1,
			desc: "A world in which everyone escapes their fate by treachery and cunning",
			pegi: 16,
		},
		{
			title: "Awoken",
			img: mcu,
			ranking: 2,
			description:
				"A lonley wolf on a mission of vengeance. Will he complete his task or will he be neutralized?",
			pegi: 16,
		},
		{
			title: `Code of Evil`,
			img: rdj,
			ranking: 3,
			description:
				"A story about a little boy who had a big dream of becoming one of the greatest musicians of his generation. Countless hours spent practicing make him a formidable adversary to others.",
			pegi: 12,
		},
		{
			title: `Twisters`,
			img: batman,
			ranking: 4,
			description:
				"A lonley wolf on a mission of vengeance. Will he complete his task or will he be neutralized?",
			pegi: 18,
		},
		{
			title: `Black telephone`,
			img: giancarlo,
			ranking: 5,
			description:
				"A lonley wolf on a mission of vengeance. Will he complete his task or will he be neutralized?",
			pegi: 18,
		},
		{
			title: `Love Lies Bleeding`,
			img: reaper,
			ranking: 6,
			desc: "A world in which everyone escapes their fate by treachery and cunning",
			pegi: 12,
		},
		{
			title: `Dexter`,
			img: dexter,
			ranking: 7,
			desc: "A world in which everyone escapes their fate by treachery and cunning",
			pegi: 18,
		},
		{
			title: `Hellboy: Hell Unites`,
			img: hellboy,
			ranking: 8,
			description:
				"A lonley wolf on a mission of vengeance. Will he complete his task or will he be neutralized?",
			pegi: 12,
		},
		{
			title: `Batman: Arkham Vengence`,
			img: penguin,
			ranking: 9,
			description:
				"A lonley wolf on a mission of vengeance. Will he complete his task or will he be neutralized?",
			pegi: 16,
		},
		{
			title: `Ministry`,
			img: reaper,
			ranking: 10,
			pegi: 16,
		},
		{
			title: `Black organs`,
			img: reaper,
			pegi: 16,
		},
		{
			title: `Blackbird`,
			img: reaper,
			pegi: 16,
		},
		{
			title: `Out of this world`,
			img: reaper,
			pegi: 16,
		},
		{
			title: `Vicious cycle`,
			img: reaper,
			pegi: 16,
		},
		{
			title: `Perpetual burn`,
			img: reaper,
			pegi: 16,
		},
	];

	const handleShowUnderline = (e) => {
		const category = e.target.innerText.toLowerCase();
		console.log(e.target, category);

		if (category !== currentMovieCategory) {
			setCurrentMovieCategory(category);
		}
	};

	return (
		<div className={"flex flex-col py-10 gap-y-5 bg-transparent text-black"}>
			<h2
				className={
					"uppercase text-4xl font-bold text-center tracking-tighter font-sansNarrow"
				}
			>
				Trailers
			</h2>
			<ul
				className={
					"w-[55%] mx-auto list-none flex justify-center relative after:absolute after:content-[''] after:bottom-0 after:left-0 after:h-[1px] after:w-full after:-translate-y-[50%] after:bg-gray-300"
				}
			>
				{categories.map((category, i) => {
					return (
						<li key={i}>
							<Link
								path="/"
								className={
									"block px-5 py-2 relative duration-300 after:content-[''] after:z-10 after:absolute after:bottom-0 after:h-[3px] after:bg-yellow-400 after:duration-300 after:transition-[width_left] " +
									(currentMovieCategory === category.title.toLowerCase()
										? "after:w-[100%] after:left-0 "
										: "after:w-[0%] after:left-[50%] text-gray-400 hover:text-black")
								}
								onClick={handleShowUnderline}
							>
								{category.title}
							</Link>
						</li>
					);
				})}
			</ul>
			<div className="w-[95%] self-center">
				<Slider {...settings}>
					{movies.map((movie, i) => {
						return (
							<MovieSlide
								key={i}
								title={movie.title}
								img={movie.img}
								ranking={movie.ranking ? movie.ranking : null}
								description={movie.description}
								type="trailer"
								pegi={movie.pegi}
							/>
						);
					})}
				</Slider>
			</div>
			<Link
				path="/"
				className="self-center py-3 px-24 border border-gray-300 font-bold mt-8 hover:bg-black hover:text-white duration-500"
			>
				Check most popular movies
			</Link>
		</div>
	);
};

export default WideReviewSlider;
