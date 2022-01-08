import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
	theme: false,
};

const themeReducer = (state = initialState, action) => {
	switch (action.type) {
		case GLOBALTYPES.THEME:
			return action.payload;
		default:
			return state;
	}
};

export default themeReducer;
