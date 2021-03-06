import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { follow, unfollow } from "./../redux/actions/profileAction";

const FollowBtn = ({ user }) => {
	const dispatch = useDispatch();
	const [followed, setFollowed] = useState(false);
	const [load, setLoad] = useState(false);

	const { auth, profile } = useSelector((state) => state);

	useEffect(() => {
		if (auth.user.following.find((item) => item._id === user._id)) {
			setFollowed(true);
		}
	}, [auth.user.following, user._id]);

	const handleFollow = async () => {
		if (load) {
			return;
		}
		setFollowed(false);
		setLoad(true);
		await dispatch(follow({ users: profile.users, user: auth }));
		setLoad(false);
	};

	const handleUnFollow = async () => {
		if (load) {
			return;
		}
		setFollowed(false);
		setLoad(true);
		await dispatch(unfollow({ users: profile.users, user: auth }));
		setLoad(false);
	};

	return followed ? (
		<button className="btn btn-outline-info" onClick={handleUnFollow}>
			UnFollow
		</button>
	) : (
		<button className="btn btn-outline-info" onClick={handleFollow}>
			Follow
		</button>
	);
};

export default FollowBtn;
