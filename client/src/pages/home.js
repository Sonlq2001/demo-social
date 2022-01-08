import React from "react";
import { useSelector } from "react-redux";

import Status from "./../components/home/Status";
import Posts from "./../components/home/Posts";

const Home = () => {
	const { homePosts } = useSelector((state) => state);

	return (
		<div className="home mx-0 row">
			<div className="col-md-8">
				<Status />

				{homePosts.loading ? (
					<div>Loading ...</div>
				) : homePosts.posts.length === 0 ? (
					<div>No Post</div>
				) : (
					<Posts />
				)}
			</div>

			<div className="col-md-4">s </div>
		</div>
	);
};

export default Home;
