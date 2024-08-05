import MainNews from "../components/MainNews";
import LatestNews from "../components/LatestNews";
import WideMovieSlider from "../components/WideMovieSlider";
import Reviews from "../components/Reviews";
import WideReviewSlider from "../components/WideReviewSlider";
import Ranking from "../components/Ranking";
import Games from "../components/Games";

const HomePage = () => {
	return (
		<>
			<section className="bg-black w-[55vw] mx-auto">
				<MainNews />
				<LatestNews />
			</section>
			<WideMovieSlider />
			<section className="w-[55vw] mx-auto">
        <Reviews />
      </section>
			<WideReviewSlider />
			<section className="w-[55vw] mx-auto">
        <Ranking />
  <Games/>      
      </section>
		</>
	);
};

export default HomePage;
