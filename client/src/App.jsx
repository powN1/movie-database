import "./App.css";
import { Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import SeriesPage from "./pages/SeriesPage";
import GamesPage from "./pages/GamesPage";
import RankingPage from "./pages/RankingPage";
import MyFilmwebPage from "./pages/MyFilmwebPage";
import { lookInSession } from "./common/session";
import axios from "axios";
import CreateArticlePage from "./pages/CreateArticlePage";
import Loader from "./components/Loader";

export const UserContext = createContext({});
export const MediaQueriesContext = createContext({});
export const DataContext = createContext({});

function App() {
	const [mobileView, setMobileView] = useState(false);
	const [tabletView, setTabletView] = useState(false);
	const [userAuth, setUserAuth] = useState({});

	const [movies, setMovies] = useState([]);
	const [popularMovies, setPopularMovies] = useState([]);
	const [topRatedMovies, setTopRatedMovies] = useState([]);
	const [upcomingMovies, setUpcomingMovies] = useState([]);

	const [series, setSeries] = useState([]);
	const [popularSeries, setPopularSeries] = useState([]);
	const [topRatedSeries, setTopRatedSeries] = useState([]);
	const [upcomingSeries, setUpcomingSeries] = useState([]);

	const [animes, setAnimes] = useState([]);
	const [popularAnimes, setPopularAnimes] = useState([]);
	const [topRatedAnimes, setTopRatedAnimes] = useState([]);
	const [upcomingAnimes, setUpcomingAnimes] = useState([]);

	const [articles, setArticles] = useState([]);
	const [randomArticles, setRandomArticles] = useState([]);
	const [latestArticles, setLatestArticles] = useState([]);
	const [latestMovieArticles, setLatestMovieArticles] = useState([]);
	const [latestSeriesArticles, setLatestSeriesArticles] = useState([]);
	const [latestGamesArticles, setLatestGamesArticles] = useState([]);

	const [actors, setActors] = useState([]);
	const [reviews, setReviews] = useState([]);
	const [latestReviews, setLatestReviews] = useState([]);

	const [loading, setLoading] = useState(true);

	const checkDevice = () => {
		if (window.innerWidth < 768) {
			if (tabletView === true) {
				setTabletView(false);
			}
			if (mobileView === false) {
				setMobileView(true);
			}
		} else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
			if (mobileView === true) {
				setMobileView(false);
			}
			if (tabletView === false) {
				setTabletView(true);
			}
		} else if (window.innerWidth >= 1024) {
			if (mobileView === true) {
				setMobileView(false);
			}
			if (tabletView === true) {
				setTabletView(false);
			}
		}
	};

	// NOTE: Random articles
	// NOTE: Latest articles
	// NOTE: Most popular articles
	// NOTE: Most popular movies, series, games
	// NOTE: Latest reviews
	// NOTE: Upcoming movies, series, games
	// NOTE: Top rated movies, series and upcoming
	// NOTE: Latest game articles

	const fetchMovies = async () => await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-movies");
	const fetchPopularMovies = async () => await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-movies", { type: "popular", count: 20 });
	const fetchTopRatedMovies = async () => await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-movies", { type: "topRated", count: 10 });
	const fetchUpcomingMovies = async () => await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-movies", { type: "upcoming", count: 10 });

	const fetchPopularSeries = async () => await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-series", { type: "popular", count: 20 });
	const fetchTopRatedSeries = async () => await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-series", { type: "topRated", count: 10 });
	const fetchUpcomingSeries = async () => await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-series", { type: "upcoming", count: 10 });

	const fetchAnimes = async () => await axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/get-animes");
	const fetchPopularAnimes = async () => await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-movies");
	const fetchTopRatedAnimes = async () => await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-movies");
	const fetchUpcomingAnimes = async () => await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-movies");

	const fetchRandomArticles = async () => await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-articles", { random: true, count: 10 });
	const fetchLatestArticles = async () => await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-articles", { type: "latest", count: 20 });
	const fetchLatestMoviesArticles = async () => await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-articles", { type: "latest", category: "movies", count: 10 });
	const fetchLatestSeriesArticles = async () => await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-articles", { type: "latest", category: "series", count: 10 });
	const fetchLatestGamesArticles = async () => await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-articles", { type: "latest", category: "games", count: 10 });

	const fetchReviews = async () => await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-movies");
	const fetchActors = async () => await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/get-actors");

	useEffect(() => {
		checkDevice();
		window.addEventListener("resize", checkDevice);

		return () => {
			window.removeEventListener("resize", checkDevice);
		};
	}, [mobileView, tabletView]);

	useEffect(() => {
		let userInSession = lookInSession("user");
		userInSession
			? setUserAuth(JSON.parse(userInSession))
			: setUserAuth({ access_token: null });

		// Use Promise.all to wait for all fetches to complete
		Promise.all([
      fetchPopularMovies(),
			fetchTopRatedMovies(),
			fetchUpcomingMovies(),
      fetchPopularSeries(),
			fetchTopRatedSeries(),
			fetchUpcomingSeries(),
      fetchRandomArticles(),
      fetchLatestArticles(),
      fetchLatestMoviesArticles(),
      fetchLatestSeriesArticles(),
      fetchLatestGamesArticles(),
			fetchReviews(),
			fetchActors(),
		])
			.then(
				([
          popularMoviesResponse,
          topRatedMoviesResponse,
          upcomingMoviesResponse,
          
          popularSeriesResponse,
          topRatedSeriesResponse,
          upcomingSeriesResponse,

          randomArticlesResponse,
          latestArticlesResponse,
          latestMoviesArticlesResponse,
          latestSeriesArticlesResponse,
          latestGamesArticlesResponse,

          reviewsResponse,
          actorsResponse,
				]) => {
					setPopularMovies(popularMoviesResponse.data.movies);
					setTopRatedMovies(topRatedMoviesResponse.data.movies);
					setUpcomingMovies(upcomingMoviesResponse.data.movies);

					setPopularSeries(popularSeriesResponse.data.series);
					setTopRatedSeries(topRatedSeriesResponse.data.series);
					setUpcomingSeries(upcomingSeriesResponse.data.series);
    
					setRandomArticles(randomArticlesResponse.data.articles);
          setLatestArticles(latestArticlesResponse.data.articles)
          setLatestMovieArticles(latestMoviesArticlesResponse.data.articles)
          setLatestSeriesArticles(latestSeriesArticlesResponse.data.articles)
          setLatestGamesArticles(latestGamesArticlesResponse.data.articles)

					setReviews(reviewsResponse.data.movies);
					setActors(actorsResponse.data.actors);
					setLoading(false);
				},
			)
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}, []);

  const dataContextObj = {
    popularMovies, setPopularMovies,
    topRatedMovies, setTopRatedMovies,
    upcomingMovies, setUpcomingMovies,
    series, setSeries,
    popularSeries, setPopularSeries,
    topRatedSeries, setTopRatedSeries,
    upcomingSeries, setUpcomingSeries,
    animes, setAnimes,
    popularAnimes, setPopularAnimes,
    topRatedAnimes, setTopRatedAnimes,
    upcomingAnimes, setUpcomingAnimes,
    articles, setArticles,
    randomArticles, setRandomArticles,
    latestArticles, setLatestArticles,
    latestMovieArticles, setLatestMovieArticles,
    latestSeriesArticles, setLatestSeriesArticles,
    latestGamesArticles, setLatestGamesArticles,
    actors, setActors,
    reviews, setReviews,
  }

	return loading ? (
		<Loader />
	) : (
		<MediaQueriesContext.Provider value={{ mobileView, tabletView }}>
			<UserContext.Provider value={{ userAuth, setUserAuth }}>
				<DataContext.Provider
					value={dataContextObj}
				>
					<Routes>
						<Route path="/" element={<Navbar />}>
							<Route index element={<HomePage />} />
							<Route path="/movies" element={<MoviesPage />} />
							<Route path="/series" element={<SeriesPage />} />
							<Route path="/games" element={<GamesPage />} />
							<Route path="/ranking" element={<RankingPage />} />
							<Route path="/my" element={<MyFilmwebPage />} />
							<Route path="/create-article" element={<CreateArticlePage />} />
						</Route>
					</Routes>
				</DataContext.Provider>
			</UserContext.Provider>
		</MediaQueriesContext.Provider>
	);
}

export default App;
