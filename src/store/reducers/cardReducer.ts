import { cardState } from './../../types/storeTypes';

const SET_RANDOM_CARDS = 'SET_RANDOM_CARDS'

const initialState: cardState = {
    cards: [
        '6 Diamonds', '7 Diamonds', '8 Diamonds', '9 Diamonds', '10 Diamonds', 'B Diamonds', 'D Diamonds', 'K Diamonds', 'T Diamonds',
        '6 Hearts', '7 Hearts', '8 Hearts', '9 Hearts', '10 Hearts', 'B Hearts', 'D Hearts', 'K Hearts', 'T Hearts',
        '6 Clubs', '7 Clubs', '8 Clubs', '9 Clubs', '10 Clubs', 'B Clubs', 'D Clubs', 'K Clubs', 'T Clubs',
        '6 Spades', '7 Spades', '8 Spades', '9 Spades', '10 Spades', 'B Spades', 'D Spades', 'K Spades', 'T Spades'
    ],
    //suit: ['Diamonds', 'Hearts', 'Clubs', 'Spades'], //буби, черви, крести, пики
}



export const cardReducer = (state = initialState, action: any): cardState => {
    const shuffle = (array: string[]) => {
        let m = array.length, t, i;
        // Пока есть элементы для перемешивания
        while (m) {
          // Взять оставшийся элемент
          i = Math.floor(Math.random() * m--);
          // И поменять его местами с текущим элементом
          t = array[m];
          array[m] = array[i];
          array[i] = t;
        }
        console.log(array);
        
        return array;
    }
    switch (action) { //.payload
        case SET_RANDOM_CARDS:
            return {
                ...state,
                cards: [...shuffle(state.cards)]
            }
        default:
            return state;
    }
}

export const cardActions = {
    setRandomCards: () => ({type: SET_RANDOM_CARDS})
}

export const setRandomCardsT = () => (dispatch: any) => {
    dispatch(cardActions.setRandomCards())
}