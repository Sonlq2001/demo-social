import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { checkImage } from "./../../utils/imageUpload";
import { GLOBALTYPES } from "./../../redux/actions/globalTypes";
import { updateUserProfile } from "../../redux/actions/profileAction";

const EditProfile = ({ setOnEdit }) => {
	const dispatch = useDispatch();
	const [userData, setUserData] = useState({
		fullname: "",
		mobile: "",
		address: "",
		website: "",
		story: "",
		gender: "",
	});

	const [avatar, setAvatar] = useState("");

	const { auth, theme } = useSelector((state) => ({
		auth: state.auth,
		theme: state.theme.theme,
	}));

	useEffect(() => {
		setUserData(auth.user);
	}, [auth.user]);

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	const handleChangeAvatar = (e) => {
		const file = e.target.files[0];
		setAvatar(file);
		const err = checkImage(file);
		if (err) {
			return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateUserProfile({ userData, avatar, auth }));
	};

	return (
		<div className="edit_profile">
			<button
				className="btn btn-danger btn_close"
				onClick={() => setOnEdit(false)}
			>
				Close
			</button>

			<form onSubmit={handleSubmit}>
				<div className="info_avatar">
					<img
						src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
						alt="avatar"
						style={{ filter: theme ? "invert(1)" : "invert(0)" }}
					/>
					<span>
						<i className="fas fa-camera" />
						<p>Change</p>
						<input
							type="file"
							name="file"
							id="file_up"
							accept="image/*"
							onChange={handleChangeAvatar}
						/>
					</span>
				</div>

				<div className="form-group">
					<label htmlFor="fullname">Full Name</label>
					<div className="position-relative">
						<input
							type="text"
							className="form-control"
							id="fullname"
							name="fullname"
							onChange={handleChangeInput}
							value={userData.fullname}
						/>
						<small
							className="text-danger position-absolute"
							style={{
								top: "50%",
								right: "5px",
								transform: "translateY(-50%)",
							}}
						>
							{userData.fullname.length}/25
						</small>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="mobile">Mobile</label>
					<input
						type="text"
						name="mobile"
						className="form-control"
						onChange={handleChangeInput}
						value={userData.mobile}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="address">Address</label>
					<input
						type="text"
						name="address"
						className="form-control"
						onChange={handleChangeInput}
						value={userData.address}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="website">Website</label>
					<input
						type="text"
						name="website"
						className="form-control"
						onChange={handleChangeInput}
						value={userData.website}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="story">Story</label>
					<textarea
						name="story"
						cols="30"
						rows="4"
						className="form-control"
						onChange={handleChangeInput}
						defaultValue={userData.story}
					/>

					<small className="text-danger d-block text-right">
						{userData.story.length}/200
					</small>
				</div>

				<label htmlFor="gender">Gender</label>
				<div className="input-group-prepend px-0 mb-4">
					<select
						name="gender"
						id="gender"
						className="custom-select text-capitalize"
						onChange={handleChangeInput}
						value={userData.gender}
					>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="other">Other</option>
					</select>
				</div>

				<button className="btn btn-info w-100" type="submit">
					Save
				</button>
			</form>
		</div>
	);
};

export default EditProfile;
