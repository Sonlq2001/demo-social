import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProfileUsers } from "./../../redux/actions/profileAction";
import EditProfile from "./EditProfile";
import FollowBtn from "./../FollowBtn";
import Followers from "./Followers";
import Following from "./Following";
import { GLOBALTYPES } from "./../../redux/actions/globalTypes";

const Info = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [userData, setUserData] = useState([]);
	const [onEdit, setOnEdit] = useState(false);
	const [showFollowers, setShowFollowers] = useState(false);
	const [showFollowing, setShowFollowing] = useState(false);

	const { auth, profile } = useSelector((state) => ({
		auth: state.auth,
		profile: state.profile,
	}));

	useEffect(() => {
		if (id === auth.user._id) {
			setUserData([auth.user]);
		} else {
			console.log("vo day");
			// dispatch(getProfileUsers({ users: profile.users, id, auth }));
			// const newData = profile.users.filter((user) => user._id === id);
			// setUserData([newData]);
		}
	}, [id, dispatch, profile, auth]);

	useEffect(() => {
		if (showFollowers || showFollowing || onEdit) {
			dispatch({ type: GLOBALTYPES.MODAL, payload: true });
		} else {
			dispatch({ type: GLOBALTYPES.MODAL, payload: false });
		}
	}, [showFollowers, showFollowing, onEdit, dispatch]);

	return (
		<div className="info">
			{userData.map((user) => (
				<div className="info_container" key={user._id}>
					<img src={user.avatar} alt="" width="150px" height="150px" />

					<div className="info_content">
						<div className="info_content_title">
							<h2>{user.username}</h2>
							{user._id === auth.user._id ? (
								<button
									className="btn btn-outline-info"
									onClick={() => setOnEdit(true)}
								>
									Edit Profile
								</button>
							) : (
								<FollowBtn user={user} />
							)}
						</div>

						<div className="follow_btn">
							<span className="mr-4" onClick={() => setShowFollowers(true)}>
								{user.followers?.length} Followers
							</span>
							<span className="ml-4" onClick={() => setShowFollowing(true)}>
								{user.following?.length} Following
							</span>
						</div>

						<h6>
							{user.fullname} <span className="text-danger">{user.mobile}</span>
						</h6>
						<p className="m-0">{user.address}</p>
						<h6 className="m-0">{user.email}</h6>
						<a href={user.website} target="_blank" rel="noreferrer">
							{user.website}
						</a>
						<p>{user.story}</p>
					</div>

					{onEdit && <EditProfile setOnEdit={setOnEdit} />}

					{showFollowers && (
						<Followers
							users={user.followers}
							setShowFollowers={setShowFollowers}
						/>
					)}

					{showFollowing && (
						<Following
							users={user.following}
							setShowFollowing={setShowFollowing}
						/>
					)}
				</div>
			))}
		</div>
	);
};

export default Info;
