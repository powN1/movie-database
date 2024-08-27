import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import SpecificFilterModal from "../common/SpecificFilterModal";
import { MediaQueriesContext } from "../App";

const categories = [
	"movies",
	"series",
	"animes",
	"movie roles",
	"serie roles",
	"anime roles",
	"actors",
	"games",
];

const subCategories = ["top 500", "new"];

const filters = [
	{
		title: "genre",
		elements: [
			"action",
			"adventure",
			"animation",
			"Adult animation",
			"anime",
			"biography",
			"comedy",
			"crime",
			"documentary",
			"drama",
			"family",
			"fantasy",
			"game show",
			"history",
			"horror",
			"lifestyle",
			"music",
			"musical",
			"mystery",
			"reality tv",
			"romance",
			"sci-fi",
			"seasonal",
			"sport",
			"thriller",
			"western",
		],
	},
	{
		title: "country",
		elements: [
			"Australia",
			"Austria",
			"Belgium",
			"Brazil",
			"Canada",
			"China",
			"Czech Republic",
			"Denmark",
			"Finland",
			"France",
			"Germany",
			"Hungary",
			"India",
			"Iran",
			"Italy",
			"Japan",
			"Mexico",
			"Netherlands",
			"Norway",
			"Poland",
			"Romania",
			"Russia",
			"South Korea",
			"Spain",
			"Sweden",
			"Switzerland",
			"Turkey",
			"United Kingdom",
			"United States",
		],
	},
	{ title: "years", elements: [] },
];

for (let year = new Date().getFullYear(); year >= 1839; year--) {
	filters[2].elements.push(`${year}`);
}

const RankingFilter = () => {
	const [currentCategory, setCurrentCategory] = useState("movies");
	const [currentSubCategory, setCurrentSubCategory] = useState("top 500");

	const [filterModalVisible, setFilterModalVisible] = useState(false);

	const [currentGenre, setCurrentGenre] = useState(null);
	const [currentCountry, setCurrentCountry] = useState(null);
	const [currentYear, setCurrentYear] = useState(null);

	const [genreModalVisible, setGenreModalVisible] = useState(false);
	const [countryModalVisible, setCountryModalVisible] = useState(false);
	const [yearModalVisible, setYearModalVisible] = useState(false);

	const { mobileView } = useContext(MediaQueriesContext);

	const filtersToShow = mobileView ? undefined : 14;

	const modalFunctionMap = {
		genre: genreModalVisible,
		country: countryModalVisible,
		years: yearModalVisible,
	};
	const setModalFunctionMap = {
		genre: setGenreModalVisible,
		country: setCountryModalVisible,
		years: setYearModalVisible,
	};
	const filterFunctionMap = {
		genre: currentGenre,
		country: currentCountry,
		years: currentYear,
	};
	const setFilterFunctionMap = {
		genre: setCurrentGenre,
		country: setCurrentCountry,
		years: setCurrentYear,
	};

	const disableAllModals = () => {
		setFilterModalVisible(false);
		setGenreModalVisible(false);
		setCountryModalVisible(false);
		setYearModalVisible(false);
	};
	const clearAllFilters = () => {
		setCurrentGenre(null);
		setCurrentCountry(null);
		setCurrentYear(null);
	};

	const handleShowUnderline = (e) => {
		const category = e.target.innerText.toLowerCase();

		if (category !== currentCategory && categories.includes(category)) {
			setCurrentCategory(category);
		} else if (
			category !== currentSubCategory &&
			subCategories.includes(category)
		) {
			setCurrentSubCategory(category);
		}
	};

	const handleFilters = (e) => {
		const category = e.target.innerText.toLowerCase();
		console.log(category);

		if (
			filters[0].elements
				.map((element) => element.toLowerCase())
				.includes(category)
		) {
			if (category === currentGenre) {
				setCurrentGenre(null);
			} else {
				setCurrentGenre(category);
			}
		} else if (
			filters[1].elements
				.map((element) => element.toLowerCase())
				.includes(category)
		) {
			if (category === currentCountry) {
				setCurrentCountry(null);
			} else {
				setCurrentCountry(category);
			}
		} else if (
			filters[2].elements
				.map((element) => element.toLowerCase())
				.includes(category)
		) {
			if (category === currentYear) {
				setCurrentYear(null);
			} else {
				setCurrentYear(category);
			}
		}
	};

	return (
		<div>
			<div className="w-full lg:w-[55%] mx-auto flex flex-col gap-y-2 py-10">
				<h2 className="uppercase text-4xl font-bold text-center tracking-tighter font-sansNarrow text-white">
					Ranking
				</h2>

				<ul
					className={
						"list-none flex overflow-x-auto relative after:absolute after:content-[''] after:bottom-0 after:left-0 after:h-[1px] after:w-full after:-translate-y-[50%] after:bg-gray-300/50 text-white"
					}
				>
					{categories.map((category, i) => {
						return (
							<li key={i}>
								<Link
									path="/"
									className={
										"block px-5 py-3 relative text-[18px] duration-300 capitalize after:content-[''] after:z-10 after:absolute after:bottom-0 after:h-[3px] after:bg-yellow-400 after:duration-300 after:transition-[width_left] whitespace-nowrap " +
										(currentCategory === category.toLowerCase()
											? "after:w-[100%] after:left-0 "
											: "after:w-[0%] after:left-[50%] text-gray-400 hover:text-white")
									}
									onClick={handleShowUnderline}
								>
									{category}
								</Link>
							</li>
						);
					})}
				</ul>

				<div className="flex items-center gap-x-2 px-3 lg:px-0">
					{subCategories.map((subCategory, i) => {
						return (
							<Link
								key={i}
								path="/"
								className={
									"block px-3 py-2 rounded-sm capitalize relative duration-300 after:content-[''] after:z-10  " +
									(currentSubCategory === subCategory.toLowerCase()
										? "bg-yellow-400"
										: "text-white")
								}
								onClick={handleShowUnderline}
							>
								{subCategory}
							</Link>
						);
					})}
					<div
						className="flex items-center gap-x-2 ml-auto p-2 md:px-3 lg:py-1 lg:px-8 border border-gray-400/50 rounded-sm text-white cursor-pointer hover:border-gray-400 duration-300"
						onClick={() => setFilterModalVisible(true)}
					>
						<IoFilter />
						<p className="hidden md:block">Filters</p>
					</div>
				</div>
			</div>

			{/* NOTE: MODAL HERE */}
      
      <div className={"inset-0 bg-black z-30 duration-100 ease-in-out " + (filterModalVisible ? "fixed bg-opacity-80 backdrop-blur-sm " : "invisible bg-opacity-0")}></div>
			<div
				className={
					"w-screen md:w-[70%] lg:w-[30%] h-screen flex flex-col fixed top-0 right-0 bg-white z-30 duration-100 east-in-out " +
					(filterModalVisible ? "translate-x-0" : "translate-x-[100%]")
				}
			>
				<div className="relative flex justify-center items-center text-black py-3 border-b border-gray-400/50">
					<h2 className="text-2xl font-sansNarrow uppercase">Filters</h2>
					<IoMdClose
						className="absolute top-0 right-2 md:right-7 translate-y-[50%] text-3xl cursor-pointer"
						onClick={() => disableAllModals()}
					/>
				</div>
				{filters.map((filter, i) => (
					<div className="flex flex-col gap-y-2 px-4 md:px-10 py-2" key={i}>
						<p className="capitalize">{filter.title}</p>
						<div className="flex overflow-x-scroll md:overflow-x-visible md:flex-wrap gap-2">
							{filter.elements.slice(0, filtersToShow).map((element, i) => (
								<button
									className={
										"py-1 px-3 text-gray-600 whitespace-nowrap capitalize lg:duration-300 " +
										(currentGenre === element.toLowerCase() ||
										currentCountry === element.toLowerCase() ||
										currentYear === element.toLowerCase()
											? "bg-yellow-400"
											: "bg-gray-400/20 lg:hover:bg-gray-400/40")
									}
									key={i}
									onClick={handleFilters}
								>
									{element}
								</button>
							))}
						</div>
						<button
							className="self-start py-1 pr-3 text-gray-400 font-bold cursor-pointer text-sm hover:text-black duration-300"
							onClick={() => {
								setModalFunctionMap[filter.title]((prevVal) => !prevVal);
							}}
						>
							Show all...
						</button>
						<span className="w-full h-[1px] border-b border-gray-400/50"></span>
					</div>
				))}

				<div className="flex justify-between mt-auto pb-4 px-3">
					<button
						className="py-3 w-1/3 text-gray-400 font-bold"
						onClick={() => {
							clearAllFilters();
							disableAllModals();
						}}
					>
						Clear all
					</button>
					<button
						className={
							"py-3 w-1/3 " +
							(currentGenre || currentCountry || currentYear
								? "bg-yellow-400 font-bold text-black"
								: "text-gray-400 ")
						}
					>
						Show results
					</button>
				</div>
			</div>

			{/* NOTE: MODAL FILTERS */}
			{filters.map((filter, i) => (
				<SpecificFilterModal
					key={i}
					title={filter.title}
					children={filter.elements}
					currentFilter={filterFunctionMap[filter.title]}
					setCurrentFilter={setFilterFunctionMap[filter.title]}
					handleFilter={handleFilters}
					modalVisible={modalFunctionMap[filter.title]}
					setModalVisible={setModalFunctionMap[filter.title]}
					disableAllModals={disableAllModals}
				/>
			))}
		</div>
	);
};

export default RankingFilter;