import { Dispatch } from "react"
import { CardActionsTypes, generalAction, onTablePackTypes } from "../../../types/storeTypes"

export const setCardOnTablePersonT = (card: string, person: string ) => { // первый ход игрока, person ходит
    
    return async (dispatch: Dispatch<generalAction>) => {
        if (person === 'player') { // удаление карт из рук 
            setTimeout(() => dispatch({ type: CardActionsTypes.DELETE_OPPONENT_CARD, payload: card }), 100)   
        }
        else {
            setTimeout(() => dispatch({ type: CardActionsTypes.DELETE_PLAYER_CARD, payload: card }), 100)
        }

        setTimeout(() => dispatch({ type: onTablePackTypes.ADD_CARD_ON_TABLE, payload: { card: card, person: person } }), 100) 
        
        
    }
}

export const addTrashCardsT = (flag: string) => { 
    
    return async (dispatch: Dispatch<generalAction>) => {
        setTimeout(() => dispatch({ type: onTablePackTypes.ADD_TRASH, payload: flag }), 900) 
    }
}

export const changeAttackerT = (attacker: string) => { 
    
    return async (dispatch: Dispatch<generalAction>) => {
        setTimeout(() =>dispatch({ type: onTablePackTypes.CHANGE_ATTACKER, payload: attacker}), 910)
    }
}