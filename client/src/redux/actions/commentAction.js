import { GLOBALTYPES } from "./globalTypes";

import { POST_TYPES } from "./postAction";
import { postDataAPI } from "./../../utils/fetchData";

export const createComment = (post, auth, newComment) => async (dispatch) => {
	try {
		const newPost = { ...post, comments: [...post.comments, newComment] };
		dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });

		const data = { ...newComment, postId: post._id };
		const res = await postDataAPI("comment", data, auth.token);
		console.log(res);
	} catch (error) {
		dispatch({
			type: GLOBALTYPES.ALERT,
			payload: { err: error.response.data.msg },
		});
	}
};
