import React from "react";

const Avatar = ({ avatar, theme }) => {
	return (
		<>
			<img
				src={avatar}
				alt=""
				width="50"
				height="50"
				style={{ filter: `${theme ? "invert(1)" : "invert(0)"}` }}
			/>
		</>
	);
};

export default Avatar;
