import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import NotFound from "../components/NotFound";

const generatorPage = (pageName) => {
	const component = () => require(`./../pages/${pageName}`).default;

	try {
		return React.createElement(component());
	} catch (error) {
		return <NotFound />;
	}
};

const PageRender = () => {
	const { token } = useSelector((state) => ({ token: state.auth.token }));

	const { page, id } = useParams();
	let pageName = "";

	if (token) {
		if (id) {
			pageName = `${page}/[id]`;
		} else {
			pageName = `${page}`;
		}
	}

	return generatorPage(pageName);
};

export default PageRender;
