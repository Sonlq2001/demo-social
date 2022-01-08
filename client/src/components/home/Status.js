import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Status = () => {
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => state);

	return (
		<div className="status my-3 d-flex">
			<img src={auth.user.avatar} width="50px" height="50px" alt="" />

			<button
				className="statusBtn"
				onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
			>
				{auth.user.username}, what are you thinking ?
			</button>
		</div>
	);
};

export default Status;
