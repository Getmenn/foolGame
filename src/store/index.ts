import { rootReduser } from './reducers/index';
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';


export const store = createStore(rootReduser, composeWithDevTools(applyMiddleware(thunk)))