import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createComment } from "./../../redux/actions/commentAction";

const InputComment = ({ children, post }) => {
	const dispatch = useDispatch();
	const [content, setContent] = useState("");

	const { auth } = useSelector((state) => state);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!content.trim()) return;
		setContent("");
		const newComment = {
			content,
			likes: [],
			user: auth.user._id,
			createdAt: new Date().toISOString(),
		};

		dispatch(createComment(post, auth, newComment));
	};

	return (
		<form className="card-footer comment_input" onSubmit={handleSubmit}>
			{children}
			<input
				type="text"
				placeholder="Add your comments..."
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>

			<button type="submit" className="postBtn">
				Post
			</button>
		</form>
	);
};

export default InputComment;
