const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/authRouter");
const searchUserRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const commentRouter = require("./routes/commentRouter");

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const URL = process.env.URL_MONGODB;
mongoose.connect(
	URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) throw new Error(err);
		console.log("Connect db successfully");
	}
);

// routes
app.use("/api", authRouter);
app.use("/api", searchUserRouter);
app.use("/api", postRouter);
app.use("/api", commentRouter);

const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
	res.send("le quang son");
});

app.listen(port, () => {
	console.log("Server running", port);
});
