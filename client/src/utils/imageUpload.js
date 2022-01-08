export const checkImage = (file) => {
	let error = "";
	if (!file) {
		return (error = "File dose not exits");
	}

	if (file.size > 1024 * 1024) {
		// 1mb
		return (error = "File largest image size is 1mb");
	}
	return error;
};

export const imageUpload = async (images) => {
	let imgArray = [];

	for (const item of images) {
		const formData = new FormData();

		if (item.camera) {
			formData.append("file", item.camera);
		} else {
			formData.append("file", item);
		}

		formData.append("upload_preset", "deg2wbii");
		formData.append("cloud_name", "sonel");

		const res = await fetch(
			"https://api.cloudinary.com/v1_1/sonel/image/upload",
			{
				method: "POST",
				body: formData,
			}
		);

		const data = await res.json();
		imgArray.push({ public_id: data.public_id, url: data.secure_url });
	}

	return imgArray;
};
