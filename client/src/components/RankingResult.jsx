import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const RankingResult = (props) => {
  const { index, type, img, title, titleId, year, genre, rating, ratedByCount } = props;
  return (
    <div className={"w-full flex gap-x-4 py-2 px-3 md:px-0 " + (index % 2 === 1 ? "bg-gray-200/25" : "")}>
      <div className="hidden lg:flex justify-center items-center text-xl pl-4 w-[5%]">{index + 1}</div>
      <Link
        to={`/${type}/${titleId}`}
        className="relative min-w-[100px] w-[100px] min-h-[150px] max-h-[150px] md:min-w-[90px] md:w-[90px] md:min-h-[125px] border border-gray-300 cursor-pointer"
      >
        <img src={img} alt="" className="h-full w-full object-cover" />
        <div className="md:hidden absolute bottom-0 left-0 h-[40px] w-[40px] bg-gray-100 border border-gray-300 flex justify-center items-center font-bold">
          {index + 1}
        </div>
      </Link>
      <div className="w-full flex flex-col gap-y-3 justify-between py-1">
        <div className="w-full flex flex-col lg:flex-row lg:items-start justify-between basis-1/2 gap-y-3">
          <div className="text-xl flex flex-col">
            <Link to={`/${type}/${titleId}`}>{title}</Link>
            <span className="text-sm">{year}</span>
          </div>

          {rating &&
            (<div className="flex flex-col justift-center md:items-end gap-x-2 lg:pr-4">
              <div className="flex items-center gap-x-1">
                <FaStar className="text-yellow-400 text-xl" />
                <span className="text-xl">{rating}</span>
              </div>
              <div className="flex gap-x-1 text-gray-400 text-xs leading-3">
                <span>{ratedByCount}</span>
                <span>ratings</span>
              </div>
            </div>)}
        </div>
        <div>
          <span className="text-gray-400">Genre</span>{" "}
          <Link className="capitalize">{genre.slice(0, 2).join(", ")}</Link>
        </div>
      </div>
    </div>
  );
};

export default RankingResult;
