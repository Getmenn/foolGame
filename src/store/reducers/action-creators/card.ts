import { Dispatch } from 'redux';
import { CardActionsTypes, generalAction, onTablePackTypes, packAction } from '../../../types/storeTypes';


export const setNewGameT = ()  => { // перемешать карты и раздать по 6 карт
    
    return async (dispatch: Dispatch<generalAction>) => {

        let cardMass

        if (localStorage.getItem('cards')) {
            cardMass = localStorage.getItem('cards')
        }
        if (typeof cardMass === 'string') {
            cardMass = JSON.parse(cardMass) // ok
        }

        dispatch({ type: onTablePackTypes.CLEAR_TABLE, payload: { person: 'player' } }) //игрок начинает 
        dispatch({ type: CardActionsTypes.SET_NEW_CARDS, payload: [...cardMass] })
        dispatch({ type: CardActionsTypes.SET_RANDOM_CARDS })
        
        dispatch({ type: CardActionsTypes.ADD_PLAYER_CARD, payload: 6 }) //кладем игроку 
        dispatch({ type: CardActionsTypes.GET_CARDS, payload: 6 })
        
        dispatch({ type: CardActionsTypes.ADD_OPPONENT_CARD, payload: 6 }) //кладем врагу 
        dispatch({ type: CardActionsTypes.GET_CARDS, payload: 6 })
        
    }
}

export const getCardsT = (cardsNum: number, person: string) => { // работает
    
    return async (dispatch: Dispatch<packAction>) => {
        if (person === 'player') {
            dispatch({ type: CardActionsTypes.ADD_PLAYER_CARD, payload: cardsNum }) //кладем игроку 
            dispatch({ type: CardActionsTypes.GET_CARDS, payload: cardsNum}) //забираем из колоды
        }
        else {
            dispatch({ type: CardActionsTypes.ADD_OPPONENT_CARD, payload: cardsNum }) //кладем врагу 
            dispatch({ type: CardActionsTypes.GET_CARDS, payload: cardsNum}) //забираем из колоды
        }
        
    }
}

export const deletCardPersonT = (card: string, person: string) => { // работает person ходит
    
    return async (dispatch: Dispatch<packAction>) => {
        
        if (person === 'player') {    

            dispatch({ type: CardActionsTypes.DELETE_PLAYER_CARD, payload: card })
        }
        else {
            dispatch({ type: CardActionsTypes.DELETE_OPPONENT_CARD, payload: card })
        }
        
    }
}

export const addCardsLoserT = (cards: string[], person: string) => { 
    
    return async (dispatch: Dispatch<generalAction>) => {
        if (person === 'player') {
            dispatch({ type: CardActionsTypes.ADD_PLAYER_SOME_CARD, payload: cards })
            dispatch({ type: onTablePackTypes.CHANGE_ATTACKER, payload: 'opponent'})
            
        } else {
            dispatch({ type: CardActionsTypes.ADD_OPPONENT_SOME_CARD, payload: cards })
            dispatch({ type: onTablePackTypes.CHANGE_ATTACKER, payload: 'player'})
        }
        
    }
}
