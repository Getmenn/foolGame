import { onTablePackAction, onTablePackState, onTablePackTypes } from "../../types/storeTypes";

const initialState: onTablePackState = {
    activePack: [],
    attacker: '', //атакует
    person: '', //чей хой в данный момент
    trash: []
}



export const activePack = (state = initialState, action: onTablePackAction): onTablePackState => {
    switch (action.type) { 
        case onTablePackTypes.ADD_CARD_ON_TABLE:
            return {
                ...state,
                activePack: [...state.activePack, action.payload.card],
                attacker: action.payload.attacker,
                person: action.payload.person   //person ходит
            }
        case onTablePackTypes.CLEAR_TABLE:
            return {
                ...state,
                activePack: [],
                trash: [],
                attacker: action.payload.person,
                person: action.payload.person    
            }
        case onTablePackTypes.ADD_TRASH:
            return {
                ...state,
                trash: [...state.trash, ...state.activePack],
                activePack: []
            }
        case onTablePackTypes.CHANGE_ATTACKER:
            return {
                ...state,
                attacker: action.payload,
                person: action.payload
            }
        default:
            return state;
    }
}
