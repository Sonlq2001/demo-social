import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";
import Home from "./pages/home";
import Login from "./pages/login";
import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import StatusModal from "./components/StatusModal";
import { getPosts } from "./redux/actions/postAction";

import { refreshToken } from "./redux/actions/authAction";

const App = () => {
	const dispatch = useDispatch();
	const { auth, status, modal } = useSelector((state) => state);

	useEffect(() => {
		dispatch(refreshToken());
	}, [dispatch]);

	useEffect(() => {
		if (auth.token) {
			dispatch(getPosts(auth.token));
		}
	}, [auth.token, dispatch]);

	return (
		<Router>
			<Alert />
			<input type="checkbox" id="theme" hidden />
			<div className={`App ${(status || modal) && "model"}`}>
				<div className="main">
					{auth.token && <Header />}
					{status && <StatusModal />}
					<Route exact path="/" component={auth.token ? Home : Login} />
					<PrivateRouter exact path="/:page" component={PageRender} />
					<PrivateRouter exact path="/:page/:id" component={PageRender} />
				</div>
			</div>
		</Router>
	);
};

export default App;
