import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../redux/actions/authAction";

const Login = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [userData, setUserData] = useState({ email: "", password: "" });

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setUserData({
			...userData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(login(userData));
	};

	const { token } = useSelector((state) => ({ token: state.auth.token }));

	useEffect(() => {
		if (token) {
			history.push("/");
		}
	}, [token, history]);

	return (
		<div className="auth_page">
			<form onSubmit={handleSubmit}>
				<h3>Login social</h3>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label">
						Email address
					</label>
					<input
						type="text"
						className="form-control"
						value={userData.email}
						name="email"
						onChange={handleChangeInput}
						placeholder="Email"
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label">
						Password
					</label>
					<input
						type="password"
						className="form-control"
						name="password"
						value={userData.password}
						onChange={handleChangeInput}
						placeholder="Password"
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Login
				</button>

				<p>
					You don't have an account ? <Link to="/register">Register</Link>
				</p>
			</form>
		</div>
	);
};

export default Login;
