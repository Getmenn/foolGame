import { activePack } from './activePackReducer';
import { cardReducer } from './cardReducer';
import { combineReducers } from "redux";

export const rootReduser = combineReducers({
    cards: cardReducer,
    onTable: activePack
})

export type RootState = ReturnType<typeof rootReduser>