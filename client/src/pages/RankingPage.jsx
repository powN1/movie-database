import { createContext, useContext, useEffect, useState } from "react";
import Download from "../components/Download";
import Footer from "../components/Footer";
import RankingFilter from "../components/RankingFilter";
import RankingResults from "../components/RankingResults";
import axios from "axios";
import { DataContext, UserContext } from "../App";

export const RankingContext = createContext({});

const RankingPage = () => {
	const {
		userAuth: { access_token },
	} = useContext(UserContext);
	const {
		latestMovies,
		topRatedMovies,
		topRatedSeries,
		latestSeries,
		topRatedGames,
		movieTopRatedMaleRoles,
		movieTopRatedFemaleRoles,
		serieTopRatedMaleRoles,
		serieTopRatedFemaleRoles,
		actorsTopRated,
	} = useContext(DataContext);
	const [currentCategory, setCurrentCategory] = useState("movies");
	const [currentSubCategory, setCurrentSubCategory] = useState("top 500");
	const [localCurrentCategory, setLocalCurrentCategory] = useState([]);

	const [currentGenre, setCurrentGenre] = useState(null);
	const [currentCountry, setCurrentCountry] = useState(null);
	const [currentYear, setCurrentYear] = useState(null);

	const [mediaToShow, setMediaToShow] = useState([]);

	const handleMediaFilterSearch = async (
		genre = null,
		country = null,
		year = null,
	) => {
		let urlPath;
		if (currentCategory.toLowerCase() === "movies")
			urlPath = "/get-movies-by-filters";
		else if (currentCategory.toLowerCase() === "series")
			urlPath = "/get-series-by-filters";
		else if (currentCategory.toLowerCase() === "games")
			urlPath = "/get-games-by-filters";

		try {
			const response = await axios.post(
				import.meta.env.VITE_SERVER_DOMAIN + urlPath,
				{ count: 100, genre, country, year },
				{ headers: { Authorization: `${access_token}` } },
			);
			console.log(response.data);
			if (response.data) {
				if (response.data.movies) setMediaToShow(response.data.movies);
        else if (response.data.series) setMediaToShow(response.data.series);
        else if (response.data.games) setMediaToShow(response.data.games);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		setCurrentGenre(null);
		setCurrentCountry(null);
		setCurrentYear(null);
		// Show specific media given specific category that user chose
		if (currentCategory.toLowerCase() === "movies") {
			setLocalCurrentCategory("movies");
			if (currentSubCategory === "top 500") {
				setMediaToShow(topRatedMovies);
			} else if (currentSubCategory === "new") {
				setMediaToShow(latestMovies);
			}
		} else if (currentCategory.toLowerCase() === "series") {
			setLocalCurrentCategory("series");
			if (currentSubCategory === "top 500") {
				setMediaToShow(topRatedSeries);
			} else if (currentSubCategory === "new") {
				setMediaToShow(latestSeries);
			}
		} else if (currentCategory.toLowerCase() === "games") {
			setLocalCurrentCategory("games");
			setMediaToShow(topRatedGames);
		} else if (currentCategory.toLowerCase() === "movie roles") {
			setLocalCurrentCategory("movie roles");
			if (currentSubCategory === "male") {
				setMediaToShow(movieTopRatedMaleRoles);
			} else if (currentSubCategory === "female") {
				setMediaToShow(movieTopRatedFemaleRoles);
			}
		} else if (currentCategory.toLowerCase() === "serie roles") {
			setLocalCurrentCategory("serie roles");
			if (currentSubCategory === "male") {
				setMediaToShow(serieTopRatedMaleRoles);
			} else if (currentSubCategory === "female") {
				setMediaToShow(serieTopRatedFemaleRoles);
			}
		} else if (currentCategory.toLowerCase() === "actors") {
			setLocalCurrentCategory("actors");
			setMediaToShow(actorsTopRated);
		}
	}, [currentCategory, currentSubCategory]);

	return (
		<>
			<RankingContext.Provider
				value={{
					currentCategory,
					setCurrentCategory,
					currentSubCategory,
					setCurrentSubCategory,
					currentGenre,
					setCurrentGenre,
					currentCountry,
					setCurrentCountry,
					currentYear,
					setCurrentYear,
					mediaToShow,
					localCurrentCategory,
					handleMediaFilterSearch,
				}}
			>
				<RankingFilter />
				<RankingResults />
				<Download />
				<Footer />
			</RankingContext.Provider>
		</>
	);
};

export default RankingPage;
