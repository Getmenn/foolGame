import { cardReducer } from './cardReducer';
import { combineReducers } from "redux";

export const rootReduser = combineReducers({
    cards: cardReducer,
})

export type RootState = ReturnType<typeof rootReduser>