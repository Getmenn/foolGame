import { packState, packAction } from "../../types/storeTypes"

const ADD_OPPONENT_CARD = 'SET_OPPONENT_CARD'
const DELET_OPPONENT_CARD = 'GET_OPPONENT_CARD'
const ADD_PLAYER_CARD = 'SET_PLAYER_CARD'
const DELET_PLAYER_CARD = 'GET_PLAYER_CARD'

const initialState: packState = {
    hendOpponent: [],
    hendPlayer: []
}

export const packReducer = (state = initialState, action: packAction): packState => {
    switch (action.type) {
        case ADD_OPPONENT_CARD:
            return {
                ...state,
                hendOpponent: [...state.hendOpponent, action.payload]
            }
        case ADD_PLAYER_CARD:
            return {
                ...state,
                hendPlayer: [...state.hendPlayer, action.payload]
            }
        case DELET_OPPONENT_CARD:
            return {
                ...state,
                hendOpponent: state.hendOpponent.filter((card, index) => index !== action.payload)
            }
        case DELET_PLAYER_CARD:
            return {
                ...state,
                hendPlayer: state.hendPlayer.filter((card, index) => index !== action.payload)
        }
        
        default:
            return state
    }
}