import { Link, Outlet } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import filmwebLogo from "../imgs/filmweb-logo.svg";
import filmwebLogoSmall from "../imgs/filmweb-logo-small.png";
import { navbarItems } from "./navbarItems";
import { useEffect, useRef, useState } from "react";
import deadpool from "../imgs/deadpool.jpg";
import mcu from "../imgs/mcu.jpg";
import rdj from "../imgs/rdj.jpg";
import batman from "../imgs/batman.jpg";
import giancarlo from "../imgs/giancarlo.jpg";
import dexter from "../imgs/dexter.jpg";
import SearchPoster from "../common/SearchPoster";

const Navbar = () => {
	const movies = [
		{
			title: "I am legend 2",
			img: deadpool,
			year: 2012,
		},
		{
			title: "Awoken",
			img: mcu,
			year: 2001,
		},
		{
			title: `Code of Evil`,
			img: rdj,
			year: 1995,
		},
		{
			title: `Twisters`,
			img: batman,
			year: 1982,
		},
		{
			title: `Black telephone`,
			img: giancarlo,
			year: 2022,
		},
		{
			title: `Dexter`,
			img: dexter,
			year: 1999,
		},
	];

	const [navbarSize, setNavbarSize] = useState("big");
	const [searchModalVisible, setSearchModalVisible] = useState(false);

	let ref = useRef();
	const handleDropdown = () => {
		console.log(ref.current);
		ref.current.classList.toggle("hidden");
	};

	const resizeNavbar = () => {
		if (window.scrollY >= 250) {
			if (navbarSize !== "small") {
				setNavbarSize("small");
			}
		} else if (window.scrollY < 100) {
			if (navbarSize !== "big") {
				setNavbarSize("big");
			}
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", resizeNavbar);
		if (searchModalVisible) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "visible";
		}
	}, [navbarSize, searchModalVisible]);

	return (
		<>
			<nav className="sticky top-0 z-20 font-lato bg-black flex flex-col justify-between items-center gap-y-3 text-white">
				<div
					className={
						"flex items-center gap-y-2 w-[55%] " +
						(navbarSize === "small"
							? "gap-x-2"
							: "flex-wrap justify-evenly gap-x-4 pt-3")
					}
				>
					<Link
						to="/"
						className={
							navbarSize === "small" ? "h-[25px] -order-2" : "h-[40px]"
						}
					>
						<img
							src={navbarSize === "small" ? filmwebLogoSmall : filmwebLogo}
							alt="website logo"
							className="h-full w-full object-cover block mx-auto select-none"
						/>
					</Link>
					{/* Search input */}
					<div
						className={
							"relative text-black text-sm " +
							(navbarSize === "small"
								? "self-stretch w-[40px] cursor-pointer group"
								: "self-stretch grow")
						}
						onClick={() => {
							setSearchModalVisible(true);
						}}
					>
						<input
							type="text"
							className={
								"h-full " +
								(navbarSize === "small" ? "w-0" : "w-full input-box")
							}
							placeholder="Look for movies, series, animations..."
						/>
						<FaMagnifyingGlass
							className={
								"absolute left-3 top-1/2 translate-y-[-50%] text-lg " +
								(navbarSize === "small"
									? "text-white opacity-75"
									: "text-yellow-400 opacity-50 ")
							}
						/>
					</div>
					{/* Sign in google button */}
					<button
						className={
							"py-2 px-7 flex justify-center items-center gap-x-3 rounded bg-white text-black font-medium " +
							(navbarSize === "small" ? "" : "self-stretch")
						}
					>
						<FaGoogle className="text-yellow-400 text-lg" />
						Sign in through google
					</button>
					{/* Sign in button */}
					<button
						className={
							"flex justify-center items-center gap-x-2 px-3 h-full hover:text-yellow-400 duration-200 " +
							(navbarSize === "small" ? "flex-col" : "")
						}
					>
						<CiUser
							className={navbarSize === "small" ? "text-xl" : "text-2xl"}
						/>
						<p className={navbarSize === "small" ? "text-xs" : ""}>Sign in</p>
					</button>

					{/* Menu categories */}
					<ul
						className={
							"list-none " +
							(navbarSize === "small" ? "-order-1 grow" : "w-full")
						}
					>
						{navbarItems.map((item, itemIndex) => {
							return (
								<li
									key={itemIndex}
									className="relative float-left group hover:text-yellow-500 duration-200 hover:before:content-[''] hover:before:absolute hover:before:bottom-0 hover:before:left-0 hover:before:bg-yellow-500 hover:before:w-full hover:before:h-[4px]"
								>
									<Link
										to={item.path}
										className={
											"relative block " +
											(navbarSize === "small"
												? "text-xs py-5 px-2"
												: "py-3 px-5")
										}
									>
										{item.title.toUpperCase()}
									</Link>
									{item.submenu ? (
										<ul className="absolute left-0 list-none group-hover:block hidden z-10">
											{item.submenu.map((submenu, submenuIndex) => (
												<li
													key={submenuIndex}
													className="bg-neutral-200 text-black text-nowrap first:pt-3 last:pb-3"
												>
													<Link className="block py-2 px-7 uppercase font-medium hover:text-yellow-500">
														{submenu.title}
													</Link>
												</li>
											))}
										</ul>
									) : null}
								</li>
							);
						})}
					</ul>
				</div>
			</nav>
			{searchModalVisible ? (
				<div className="w-screen h-screen fixed top-0 left-0 bg-white z-30 flex justify-center">
					<div className="w-[55%] flex flex-col py-8 gap-y-8">
						{/* Search */}
						<div className="flex gap-x-4">
							<div className="relative flex justify-between w-full">
								<input
									type="text"
									className="input-box grow border border-gray-400 rounded-md focus:border-yellow-400 duration-300 focus:[box-shadow:_2px_2px_6px_rgb(250_204_21/_15%)]"
									placeholder="Search..."
								/>
								<FaMagnifyingGlass className="absolute left-3 top-1/2 translate-y-[-50%] text-lg text-yellow-400" />
							</div>
							<button
								className="py-3 px-6 rounded-sm text-black font-bold hover:bg-slate-50 duration-300"
								onClick={() => setSearchModalVisible(false)}
							>
								Cancel
							</button>
						</div>

						<div className="flex gap-x-5">
							<div className="grow flex flex-col gap-y-4">
								<div className="flex justify-between items-end">
									<p className="text-xl uppercase tracking-tighter">Best movies</p>
									<Link to="/" className="text-sm text-yellow-800">See all</Link>
								</div>
								<div className="flex gap-x-5">
									{/* SLIDES */}
									{movies.slice(3).map((poster, i) => (
										<SearchPoster
											key={i}
											title={poster.title}
											img={poster.img}
											type="poster"
										/>
									))}
								</div>
							</div>

							<div className="grow flex flex-col gap-y-4">
								<div className="flex justify-between items-end">
									<p className="text-xl uppercase tracking-tighter">Best series</p>
									<Link to="/" className="text-sm text-yellow-800">See all</Link>
								</div>
								<div className="flex gap-x-5">
									{/* SLIDES */}
									{movies.slice(3).map((poster, i) => (
										<SearchPoster
											key={i}
											title={poster.title}
											img={poster.img}
                      year="2022"
											type="searchResult"
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}
			<Outlet />
		</>
	);
};

export default Navbar;
