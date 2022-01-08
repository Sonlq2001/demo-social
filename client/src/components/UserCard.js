import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({
	children,
	user,
	handleClose,
	setShowFollowers,
	setShowFollowing,
}) => {
	const handleCloseAll = () => {
		if (handleClose) {
			handleClose();
		}

		if (setShowFollowers) {
			setShowFollowers(false);
		}
		if (setShowFollowing) {
			setShowFollowing(false);
		}
	};

	return (
		<div className="d-flex p-2 align-item-center">
			<div>
				<Link
					to={`/profile/${user._id}`}
					className="d-flex align-item-center"
					onClick={handleCloseAll}
				>
					<img src={user.avatar} alt="" width="50px" height="50px" />

					<div className="ml-1">
						<span className="d-block">{user.username}</span>
						<small className="d-block">{user.fullname}</small>
					</div>

					{children}
				</Link>
			</div>
		</div>
	);
};

export default UserCard;
