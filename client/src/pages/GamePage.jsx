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

const GamePage = () => {
	const { gameId } = useParams();

	const fetchGame = async (gameId) => {
		try {
			const response = await axios.post(
				import.meta.env.VITE_SERVER_DOMAIN + "/get-game",
				{ titleId: gameId },
			);
			return response.data.game;
		} catch (err) {
			console.error(err);
		}
	};

	const [game, setGame] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadGame = async () => {
			const gameData = await fetchGame(gameId);
			if (gameData) {
				const ratedCount = gameData.activity.ratedByCount;
				if (ratedCount >= 1000 && ratedCount < 1000000) gameData.activity.ratedByCount = (ratedCount / 1000).toFixed(0).replace(/\.0$/, "") + "k";
				else if (ratedCount >= 1000000) gameData.activity.ratedByCount = (ratedCount / 1000000).toFixed(0).replace(/\.0$/, "") + "m";
				setGame(gameData);
			}
			setLoading(false); // Set loading to false after fetching
		};

		loadGame();
	}, [gameId]);

	return loading ? (
		<Loader />
	) : (
		<>
			<MainPreviewSingle type="game" media={game} />
			<FilmDetails type="game" media={game} />
      <FilmPhotos media={game} />
      <FilmVideos media={game} />
      {/* <FilmCast media={game} /> */}
      {/* <FilmRolesRanking media={game} /> */}
			<FilmDetailsExpanded type="game" media={game} />
			<Download />
      <Footer />
		</>
	);
};

export default GamePage;
