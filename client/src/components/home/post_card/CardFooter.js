import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import LikeButton from "../../LikeButton";
import { likePost, unLikePost } from "./../../../redux/actions/postAction";

const CardFooter = ({ post }) => {
	const [isLike, setIsLike] = useState(false);
	const [loadLike, setLoadLike] = useState(false);

	const { auth } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		if (post.likes.find((item) => item._id === auth.user._id)) {
			setIsLike(true);
		}
	}, [post.likes, auth.user._id]);

	const handleLike = async () => {
		if (loadLike) {
			return;
		}
		setLoadLike(true);
		setIsLike(true);

		await dispatch(likePost({ post, auth }));
		setLoadLike(false);
	};

	const handleUnLike = async () => {
		if (loadLike) {
			return;
		}
		setLoadLike(true);
		setIsLike(false);

		await dispatch(unLikePost({ post, auth }));
		setLoadLike(false);
	};

	return (
		<div className="card_footer">
			<div className="card_icon_menu">
				<div>
					<LikeButton
						isLike={isLike}
						handleLike={handleLike}
						handleUnLike={handleUnLike}
					/>

					<Link to={`/post/${post._id}`} className="text-dark">
						<i className="fa fa-comment" />
					</Link>

					<span>
						<i className="fas fa-paper-plane" />
					</span>
				</div>

				<i className="fa fa-bookmark" />
			</div>

			<div className="d-flex justify-content-between">
				<h6 className={{ padding: "0 25px", cursor: "pointer" }}>
					{post.likes.length}
				</h6>

				<h6 className={{ padding: "0 25px", cursor: "pointer" }}>
					{post.comments.length} comments
				</h6>
			</div>
		</div>
	);
};

export default CardFooter;
