import { getDataAPI, patchDataAPI } from "./../../utils/fetchData";
import { GLOBALTYPES, DeleteData } from "./../../redux/actions/globalTypes";

import { imageUpload } from "./../../utils/imageUpload";

export const PROFILE_TYPES = {
	LOADING: "LOADING",
	GET_USER: "GET_USER",
	FOLLOW: "FOLLOW",
	UNFOLLOW: "UNFOLLOW",
};

export const getProfileUsers =
	({ users, id, auth }) =>
	async (dispatch) => {
		// if (users.every((user) => user._id !== id)) {
		try {
			dispatch({
				type: PROFILE_TYPES.LOADING,
				payload: true,
			});
			console.log(users, id, auth);
			// const res = await getDataAPI(`/user/${id}`, auth.token);

			// dispatch({
			// 	type: PROFILE_TYPES.GET_USER,
			// 	payload: res.data,
			// });

			dispatch({
				type: PROFILE_TYPES.LOADING,
				payload: false,
			});
		} catch (err) {
			dispatch({
				type: GLOBALTYPES.ALERT,
				payload: { error: err.response.data.msg },
			});
		}
		// }
	};

export const updateUserProfile =
	({ avatar, userData, auth }) =>
	async (dispatch) => {
		try {
			dispatch({
				type: GLOBALTYPES.ALERT,
				payload: { loading: true },
			});
			const media = await imageUpload([avatar]);
			await patchDataAPI(
				`user`,
				{
					...userData,
					avatar: avatar ? media[0].url : auth.user.avatar,
				},
				auth.token
			);

			dispatch({
				type: GLOBALTYPES.AUTH,
				payload: {
					...auth,
					user: {
						...auth.user,
						...userData,
						avatar: avatar ? media[0].url : auth.user.avatar,
					},
				},
			});

			dispatch({
				type: GLOBALTYPES.ALERT,
				payload: { loading: false },
			});
		} catch (err) {
			dispatch({
				type: GLOBALTYPES.ALERT,
				payload: { error: err.response.data.msg },
			});
		}
	};

export const follow =
	({ users, user, auth }) =>
	async (dispatch) => {
		try {
			let newUser;
			if (users.every((item) => item._id !== user._id)) {
				newUser = { ...user, followers: [...user.followers, auth.user] };
			} else {
				users.forEach((item) => {
					if (item._id === user._id) {
						newUser = { ...item, followers: [...item.followers, auth.user] };
					}
				});
			}

			dispatch({
				type: PROFILE_TYPES.FOLLOW,
				payload: newUser,
			});

			dispatch({
				type: GLOBALTYPES.AUTH,
				payload: {
					...auth,
					user: { ...auth.user, following: [...auth.user.following, newUser] },
				},
			});

			// call api
			await patchDataAPI(`user/${user._id}/follow`, null, auth.token);
		} catch (err) {
			dispatch({
				type: GLOBALTYPES.ALERT,
				payload: { error: err.response.data.msg },
			});
		}
	};

export const unfollow =
	({ users, user, auth }) =>
	async (dispatch) => {
		try {
			let newUser;
			if (users.every((item) => item._id !== user._id)) {
				newUser = {
					...user,
					followers: DeleteData(user.following, auth.user._id),
				};
			} else {
				users.forEach((item) => {
					if (item._id === user._id) {
						newUser = {
							...item,
							followers: DeleteData(item.following, auth.user._id),
						};
					}
				});
			}

			dispatch({
				type: PROFILE_TYPES.UNFOLLOW,
				payload: newUser,
			});

			dispatch({
				type: GLOBALTYPES.AUTH,
				payload: {
					...auth,
					user: {
						...auth.user,
						following: DeleteData(auth.user.following, newUser._id),
					},
				},
			});

			// call api
			await patchDataAPI(`user/${user._id}/unfollow`, null, auth.token);
		} catch (err) {
			dispatch({
				type: GLOBALTYPES.ALERT,
				payload: { error: err.response.data.msg },
			});
		}
	};
