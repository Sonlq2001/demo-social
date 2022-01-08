import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/actions/authAction";
import Avatar from "../Avatar";

const Menu = () => {
	const navbar = [
		{ label: "Home", icon: "home", path: "/" },
		{ label: "Message", icon: "near_me", path: "/message" },
		{ label: "Discover", icon: "explore", path: "/discover" },
		{ label: "Notify", icon: "favorite", path: "/notify" },
	];
	const { pathname } = useLocation();
	const dispatch = useDispatch();

	const isActive = (pn) => {
		return pn === pathname && "active";
	};

	const { theme, user } = useSelector((state) => ({
		theme: state.theme.theme,
		user: state.auth.user,
	}));

	return (
		<div className="menu">
			<button className="navbar-toggler" type="button">
				<span className="navbar-toggler-icon" />
			</button>
			<div
				className="collapse navbar-collapse justify-content-end"
				id="navbarSupportedContent"
			>
				<ul className="navbar-nav mb-2 mb-lg-0">
					{navbar.map((item) => (
						<li className="nav-item px-2" key={item.label}>
							<Link className={`nav-link ${isActive(item)}`} to={item.path}>
								<span className="material-icons">{item.icon}</span>
							</Link>
						</li>
					))}

					<li className="nav-item dropdown">
						<div
							className="nav-link dropdown-toggle"
							id="navbarDropdown"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<Avatar avatar={user?.avatar} theme={theme} />
						</div>
						<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
							<li>
								<label
									htmlFor="theme"
									className="dropdown-item"
									onClick={() =>
										dispatch({
											type: "THEME",
											payload: { theme: !theme },
										})
									}
								>
									{theme ? "Light Mode" : "Dark Mode"}
								</label>
							</li>
							<li>
								<Link className="dropdown-item" to={`/profile/${user?._id}`}>
									Profile
								</Link>
							</li>
							<li>
								<button
									className="dropdown-item"
									onClick={() => dispatch(logout())}
								>
									Logout
								</button>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Menu;
