import { Dispatch } from "react"
import { CardActionsTypes, generalAction, onTablePackAction, onTablePackTypes } from "../../../types/storeTypes"

export const setCardOnTablePersonT = (card: string, attacker: string, person: string ) => { // первый ход игрока, person ходит
    
    return async (dispatch: Dispatch<generalAction>) => {
        dispatch({ type: onTablePackTypes.ADD_CARD_ON_TABLE, payload: { card: card, attacker: attacker, person: person } })
        
        if (person === 'player') { // удаление карт из рук 
            dispatch({ type: CardActionsTypes.DELETE_OPPONENT_CARD, payload: card })  
        }
        else {//игроки поменяны местами для следующего хода
            dispatch({ type: CardActionsTypes.DELETE_PLAYER_CARD, payload: card })
        }
    }
}

export const addTrashCardsT = () => { 
    
    return async (dispatch: Dispatch<generalAction>) => {
        dispatch({ type: onTablePackTypes.ADD_TRASH })
    }
}

export const changeAttackerT = (attacker: string) => { 
    
    return async (dispatch: Dispatch<generalAction>) => {
        dispatch({ type: onTablePackTypes.CHANGE_ATTACKER, payload: attacker})
    }
}