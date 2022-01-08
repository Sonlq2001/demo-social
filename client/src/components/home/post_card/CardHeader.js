import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import { GLOBALTYPES } from "./../../../redux/actions/globalTypes";

const CardHeader = ({ post }) => {
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => state);

	const handleEditPost = () => {
		dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
	};

	const handleCopyLink = () => {
		navigator.clipboard.writeText(`/post/${post._id}`);
	};

	return (
		<div className="card_header">
			<div className="d-flex">
				<img src={post.user.avatar} alt="" width="50px" height="50px" />

				<div className="card_name">
					<h6 className="m-0">
						<Link to={`/profile/${post.user._id}`} className="text-dark">
							{post.user.username}
						</Link>
					</h6>
					<small className="text-muted">
						{moment(post.createdAt).fromNow()}
					</small>
				</div>
			</div>

			<div className="nav-item dropdown">
				<span
					className="material-icons"
					id="moreLink"
					data-bs-toggle="dropdown"
				>
					more_horiz
				</span>

				<div className="dropdown-menu">
					{auth.user._id === post.user._id && (
						<>
							<div className="dropdown-item" onClick={handleEditPost}>
								<span className="material-icons">create</span> Edit Post
							</div>
							<div className="dropdown-item">
								<span className="material-icons">delete_outline</span> Remove
								Post
							</div>
						</>
					)}

					<div className="dropdown-item" onClick={handleCopyLink}>
						<span className="material-icons">content_copy</span> Copy Link
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardHeader;
