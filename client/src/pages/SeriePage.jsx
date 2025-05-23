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

const SeriePage = () => {
	const { serieId } = useParams();

	const fetchSerie = async (serieId) => {
		try {
			const serieRes = await axios.post( import.meta.env.VITE_SERVER_DOMAIN + "/api/get-serie", { titleId: serieId },);
      const serie_id = serieRes.data.serie._id;
			const reviews = await axios.post( import.meta.env.VITE_SERVER_DOMAIN + "/api/get-reviews-media", { count: 1, referredMediaId: serie_id });
      serieRes.data.serie.reviews = reviews.data.reviews;
			return serieRes.data.serie;
		} catch (err) {
			console.error(err);
		}
	};

	const [serie, setSerie] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadSerie = async () => {
			const serieData = await fetchSerie(serieId);
			if (serieData) {
				const ratedCount = serieData.activity.ratedByCount;
				if (ratedCount >= 1000 && ratedCount < 1000000) serieData.activity.ratedByCount = (ratedCount / 1000).toFixed(0).replace(/\.0$/, "") + "k";
				else if (ratedCount >= 1000000) serieData.activity.ratedByCount = (ratedCount / 1000000).toFixed(0).replace(/\.0$/, "") + "m";
				setSerie(serieData);
			}
			setLoading(false); // Set loading to false after fetching
		};

		loadSerie();
	}, [serieId]);

	return loading ? (
		<Loader />
	) : (
		<>
			<MainPreviewSingle type="serie" media={serie} />
			<FilmDetails type="serie" media={serie} />
      <FilmReviews media={serie} />
      <FilmPhotos media={serie} />
      <FilmVideos media={serie} />
      <FilmCast media={serie} />
      <FilmRolesRanking media={serie} />
			<FilmDetailsExpanded type="serie" media={serie} />
			<Download />
      <Footer />
		</>
	);
};

export default SeriePage;
