import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import MainPreviewSingle from "../components/MainPreviewSingle";
import FilmDetails from "../common/FilmDetails";
import FilmPhotos from "../common/FilmPhotos";
import FilmVideos from "../common/FilmVideos";
import FilmCast from "../common/FilmCast";
import FilmRolesRanking from "../common/FilmRolesRanking";
import FilmDetailsExpanded from "../common/FilmDetailsExpanded";
import Footer from "../components/Footer";
import Download from "../components/Download";
import FilmReviews from "../common/FilmReviews";

const MoviePage = () => {
	const { movieId } = useParams();

	const fetchMovie = async (movieId) => {
		try {
			const movieRes = await axios.post( import.meta.env.VITE_SERVER_DOMAIN + "/api/get-movie", { titleId: movieId });
      const movie_id = movieRes.data.movie._id;
			const reviews = await axios.post( import.meta.env.VITE_SERVER_DOMAIN + "/api/get-reviews-media", { count: 1, referredMediaId: movie_id });
      movieRes.data.movie.reviews = reviews.data.reviews;
			return movieRes.data.movie;
		} catch (err) {
			console.error(err);
		}
	};

	const [movie, setMovie] = useState({});
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		const loadMovie = async () => {
			const movieData = await fetchMovie(movieId);
			if (movieData) {
				const ratedCount = movieData.activity.ratedByCount;
				if (ratedCount >= 1000 && ratedCount < 1000000)
					movieData.activity.ratedByCount = (ratedCount / 1000).toFixed(0).replace(/\.0$/, "") + "k";
				else if (ratedCount >= 1000000)
					movieData.activity.ratedByCount = (ratedCount / 1000000).toFixed(0).replace(/\.0$/, "") + "m";
				setMovie(movieData);
			}
			setLoading(false); // Set loading to false after fetching
		};

		loadMovie();
	}, [movieId]);

	return loading ? (
		<Loader />
	) : (
		<>
			<MainPreviewSingle type="movie" media={movie} />
			<FilmDetails type="movie" media={movie} />
      <FilmReviews media={movie} />
      <FilmPhotos media={movie} />
      <FilmVideos media={movie} />
      <FilmCast media={movie} />
      <FilmRolesRanking media={movie} />
			<FilmDetailsExpanded type="movie" media={movie} />
			<Download />
      <Footer />
		</>
	);
};

export default MoviePage;
