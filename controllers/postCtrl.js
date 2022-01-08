const Posts = require("./../models/postModel");

const postCtrl = {
	createPost: async (req, res) => {
		try {
			const { content, images } = req.body;

			if (images.length === 0) {
				return res.status(400).json({ msg: "Please add your photo" });
			}

			const newPost = new Posts({ content, images, user: req.user._id });

			await newPost.save();

			res.status(200).json({ msg: "Create post", newPost });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},

	getPost: async (req, res) => {
		try {
			const posts = await Posts.find({
				user: [...req.user.following, req.user._id],
			})
				.sort("-createdAt")
				.populate("user likes", "avatar fullname username followers")
				.populate({
					path: "comments",
					populate: { path: "user likes", select: "-password" },
				});

			res.status(200).json({ msg: "Success", total: posts.length, posts });
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	updatePost: async (req, res) => {
		try {
			const { content, images } = req.body;

			const post = await Posts.findOneAndUpdate(
				{ _id: req.params.id },
				{ content, images }
			).populate("user likes", "avatar username fullname");

			res.status(200).json({
				msg: "Update post",
				newPost: {
					...post._doc,
					content,
					images,
				},
			});
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},

	likePost: async (req, res) => {
		try {
			const post = await Posts.find({
				_id: req.params.id,
				likes: req.user._id,
			});
			if (post.length > 0) {
				return res.status(400).json({ msg: "You liked this post !" });
			}

			await Posts.findOneAndUpdate(
				{ _id: req.params.id },
				{ $push: { likes: req.user._id } },
				{ new: true }
			);

			res.json({ msg: "Like post" });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},

	unLikePost: async (req, res) => {
		try {
			// const post = await Posts.find({
			// 	_id: req.params.id,
			// 	likes: req.user._id,
			// });

			// if (post) {
			// 	return res.status(400).json({ msg: "You liked this post !" });
			// }

			await Posts.findOneAndUpdate(
				{ _id: req.params.id },
				{ $pull: { likes: req.user._id } },
				{ new: true }
			);

			res.json({ msg: "UnLike post" });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
};

module.exports = postCtrl;
