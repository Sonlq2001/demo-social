import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { searchUser } from "../../redux/actions/userAction";

const Search = () => {
	const dispatch = useDispatch();
	const [search, setSearch] = useState("");

	const { token, users, loadingUser } = useSelector((state) => ({
		token: state.auth.token,
		users: state.user.data,
		loadingUser: state.user.loading,
	}));

	useEffect(() => {
		const fetchData = async () => {
			if (search && token) {
				dispatch(searchUser({ search, token }));
			}
		};
		fetchData();
	}, [search, token, dispatch]);

	return (
		<form className="search_form">
			<input
				type="text"
				name="search"
				value={search}
				autoFocus
				onChange={(e) =>
					setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
				}
			/>

			<div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
				<span className="material-icons">search</span>
				<span>Enter to Search</span>
			</div>

			<div className="close_search">&times;</div>

			<button type="submit" style={{ display: "none" }}>
				Search
			</button>

			<div>{loadingUser && <div>loading ...</div>}</div>

			<div className="result-search">
				{users.length > 0 &&
					users.map((user, index) => {
						return (
							<div key={index}>
								<img src={user?.avatar} alt="" width="50px" height="50px" />
								<Link to={`/profile/${user._id}`}>{user?.fullname}</Link>
								<i>{user?.username}</i>
							</div>
						);
					})}
			</div>
		</form>
	);
};

export default Search;
