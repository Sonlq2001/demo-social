import { getDataAPI } from "../../utils/fetchData";

export const TYPES = {
	AUTH: "AUTH",
};

export const searchUser =
	({ search, token }) =>
	async (dispatch) => {
		try {
			const res = await getDataAPI(`search?username=${search}`, token);
			dispatch({
				type: "SEARCH_USER",
				payload: res.data.msg,
			});
		} catch (error) {}
	};
