import { Dispatch } from 'redux';
import { useTypedSelector } from '../../../components/hooks/useTypeSelector';
import { CardActionsTypes, packAction } from '../../../types/storeTypes';

/* export const cardActions = {
    setRandomCards: () => ({type: SET_RANDOM_CARDS})
} */



export const setRandomCardsT = ()  => { // работает
    return async (dispatch: Dispatch<packAction>) => {
        dispatch({type: CardActionsTypes.SET_RANDOM_CARDS})
    }
}

export const getCardsT = (cardsNum: number, person: string) => { // работает
    return async (dispatch: Dispatch<packAction>) => {
        if (person === 'player') {
            dispatch({ type: CardActionsTypes.ADD_PLAYER_CARD, payload: cardsNum }) //кладем игроку 
            dispatch({ type: CardActionsTypes.GET_CARDS, payload: cardsNum}) //забираем из колоды
        }
        else {
            dispatch({ type: CardActionsTypes.ADD_OPPONENT_CARD, payload: cardsNum }) //кладем игроку 
            dispatch({ type: CardActionsTypes.GET_CARDS, payload: cardsNum}) //забираем из колоды
        }
        
    }
}