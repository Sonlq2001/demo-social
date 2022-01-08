const initialState = {
	loading: false,
	data: [],
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SEARCH_USER":
			return {
				...state,
				data: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default userReducer;
