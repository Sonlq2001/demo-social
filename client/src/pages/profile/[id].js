import React from "react";
import { useSelector } from "react-redux";

import Info from "./../../components/profile/Info";
import Posts from "./../../components/profile/Posts";

const Profile = () => {
	const { profile } = useSelector((state) => state);

	return (
		<div className="profile">
			{profile.loading ? <div>Loading</div> : <Info />}

			<Posts />
		</div>
	);
};

export default Profile;
