import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { GLOBALTYPES } from "./../redux/actions/globalTypes";
import { createPost, updatePost } from "./../redux/actions/postAction";

const StatusModal = () => {
	const dispatch = useDispatch();
	const { auth, theme, status } = useSelector((state) => state);

	const [content, setContent] = useState("");
	const [images, setImages] = useState([]);
	const [stream, setStream] = useState(false);
	const [tracks, setTracks] = useState("");

	const videoRef = useRef();
	const refCanvas = useRef();

	const handleChangeImages = (e) => {
		const files = [...e.target.files];

		let err = "";
		let newImage = [];

		files.forEach((file) => {
			if (!file) {
				return (err = "File dose not exits");
			}
			return newImage.push(file);
		});

		if (err) {
			dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
		}

		setImages([...images, ...newImage]);
	};

	const deleteImage = (key) => {
		const newArray = [...images];
		newArray.splice(key, 1);
		setImages(newArray);
	};

	const handleStream = () => {
		setStream(true);

		if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then((mediaStream) => {
					videoRef.current.srcObject = mediaStream;
					videoRef.current.play();

					const track = mediaStream.getTracks();
					setTracks(track[0]);
				})
				.catch((err) => console.log(err));
		}
	};

	const handleCapture = () => {
		const width = videoRef.current.clientWidth;
		const height = videoRef.current.clientHeight;

		refCanvas.current.setAttribute("width", width);
		refCanvas.current.setAttribute("height", height);

		const ctx = refCanvas.current.getContext("2d");
		ctx.drawImage(videoRef.current, 0, 0, width, height);
		let URL = refCanvas.current.toDataURL();
		setImages([...images, { camera: URL }]);
	};

	const handleStopStream = () => {
		tracks.stop();
		setStream(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (images.length === 0) {
			return dispatch({
				type: GLOBALTYPES.ALERT,
				payload: { error: "Please add your photo" },
			});
		}

		if (status.onEdit) {
			dispatch(updatePost({ content, images, auth, status }));
		} else {
			dispatch(createPost({ content, images, auth }));
		}

		setContent("");
		setImages([]);

		if (tracks) {
			tracks.stop();
		}
		dispatch({ type: GLOBALTYPES.STATUS, payload: false });
	};

	useEffect(() => {
		if (status.onEdit) {
			setContent(status.content);
			setImages(status.images);
		}
	}, [status]);

	return (
		<div className="status_modal">
			<form action="" onSubmit={handleSubmit}>
				<div className="status_header">
					<h5 className="m-0">Create post</h5>
					<span
						onClick={() =>
							dispatch({ type: GLOBALTYPES.STATUS, payload: false })
						}
					>
						&times;
					</span>
				</div>

				<div className="status_body">
					<textarea
						name=""
						id=""
						cols="30"
						rows="10"
						placeholder={`${auth.user.username}, what are you thinking ?`}
						onChange={(e) => setContent(e.target.value)}
						value={content}
					/>

					<div className="show_images">
						{images.map((image, index) => {
							return (
								<div className="file_image" key={index}>
									<img
										src={
											image?.camera
												? image.camera
												: image.url
												? image.url
												: URL.createObjectURL(image)
										}
										alt=""
										className="img-thumbnail"
										style={{ filter: theme.theme ? "invert(1)" : "invert(0)" }}
									/>
									<span onClick={() => deleteImage(index)}>&times;</span>
								</div>
							);
						})}
					</div>

					{stream && (
						<div className="stream position-relative">
							<video muted autoPlay ref={videoRef} width="100%" height="100%" />

							<span onClick={handleStopStream}>&times;</span>

							<canvas ref={refCanvas} style={{ display: "none" }} />
						</div>
					)}

					<div className="input_images">
						{stream ? (
							<i className="fas fa-camera" onClick={handleCapture} />
						) : (
							<>
								<i className="fas fa-camera" onClick={handleStream} />

								<div className="file_upload">
									<i className="fa fa-image" />

									<input
										type="file"
										multiple
										accept="image/*"
										name="file"
										id="file"
										onChange={handleChangeImages}
									/>
								</div>
							</>
						)}
					</div>
				</div>

				<div className="status_footer">
					<button className="btn btn-secondary w-100">Post</button>
				</div>
			</form>
		</div>
	);
};

export default StatusModal;
