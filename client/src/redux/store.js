import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

import { rootReducer } from "./reduces/index";

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

const DataProvider = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};

export default DataProvider;
