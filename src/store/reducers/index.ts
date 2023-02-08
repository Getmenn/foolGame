import { packReducer } from './packReducer';
import { cardReducer } from './cardReducer';
import { combineReducers } from "redux";

export const rootReduser = combineReducers({
    cards: cardReducer,
    pack: packReducer
})