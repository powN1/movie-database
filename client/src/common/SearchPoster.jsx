import { Link } from "react-router-dom";

const SearchPoster = ({ title, img, year = null, type }) => {
	const renderSearchPoster = () => {
		switch (type) {
			case "poster":
				return (
					<Link className="w-full relative group">
						<div className="h-[220px] border border-gray-400 overflow-hidden">
							<img
								src={img}
								alt={title}
								className="h-full w-full object-cover group-hover:scale-110 duration-700"
							/>
						</div>
					</Link>
				);

			case "searchResult":
				return (
					<Link className="w-full flex flex-col gap-y-1 relative group">
						<div className="h-[220px] border border-gray-400 overflow-hidden">
							<img
								src={img}
								alt={title}
								className="h-full object-cover group-hover:scale-110 duration-700"
							/>
						</div>
						<p className="text-center">{title}</p>
						<span className="text-center text-xs">
							{year}
						</span>
					</Link>
				);

			default:
				return <article></article>;
		}
	};

	return renderSearchPoster();
};

export default SearchPoster;
