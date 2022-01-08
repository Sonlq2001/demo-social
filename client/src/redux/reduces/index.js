import { combineReducers } from "redux";

import auth from "./../reduces/authReducer";
import alert from "./../reduces/alertReducer";
import theme from "./../reduces/themeReducer";
import user from "./../reduces/userReducer";
import profile from "./../reduces/profileReducer";
import status from "./../reduces/statusReducer";
import homePosts from "./../reduces/postReducer";
import modal from "./modalReducer";

export const rootReducer = combineReducers({
	auth,
	alert,
	theme,
	user,
	profile,
	status,
	homePosts,
	modal,
});
