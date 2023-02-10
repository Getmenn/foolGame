import { CardActionsTypes, cardState, packAction } from './../../types/storeTypes';

const initialState: cardState = {
    cards: [
        '6 Diamonds', '7 Diamonds', '8 Diamonds', '9 Diamonds', '10 Diamonds', 'B Diamonds', 'D Diamonds', 'K Diamonds', 'T Diamonds',
        '6 Hearts', '7 Hearts', '8 Hearts', '9 Hearts', '10 Hearts', 'B Hearts', 'D Hearts', 'K Hearts', 'T Hearts',
        '6 Clubs', '7 Clubs', '8 Clubs', '9 Clubs', '10 Clubs', 'B Clubs', 'D Clubs', 'K Clubs', 'T Clubs',
        '6 Spades', '7 Spades', '8 Spades', '9 Spades', '10 Spades', 'B Spades', 'D Spades', 'K Spades', 'T Spades'
    ],
    hendOpponent: [],
    hendPlayer: []
    //suit: ['Diamonds', 'Hearts', 'Clubs', 'Spades'], //буби, черви, крести, пики
}

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
    
    return array;
}

//сделать последнюю карту в массиве козырем 
export const cardReducer = (state = initialState, action: packAction): cardState => {
    switch (action.type) { 
        case CardActionsTypes.SET_RANDOM_CARDS:
            return {
                ...state,
                cards: [...shuffle(state.cards)]
            }
        case CardActionsTypes.SET_NEW_CARDS:
            return {
                ...state,
                cards: [...action.payload],
                hendOpponent: [],
                hendPlayer: []

            }
        case CardActionsTypes.GET_CARDS:
            return {
                ...state,
                cards: [...state.cards.slice(action.payload)]
            }
        case CardActionsTypes.ADD_OPPONENT_CARD:
            return {
                ...state,
                hendOpponent: [...state.hendOpponent,...state.cards.slice(0, action.payload)]
            }
        case CardActionsTypes.ADD_PLAYER_CARD:
            return {
                ...state,
                hendPlayer: [...state.hendPlayer,...state.cards.slice(0, action.payload)]
            }
        case CardActionsTypes.DELETE_OPPONENT_CARD:
            return {
                ...state,
                hendOpponent: state.hendOpponent.filter((card, index) => card !== action.payload)
            }
        case CardActionsTypes.DELETE_PLAYER_CARD:
            return {
                ...state,
                hendPlayer: state.hendPlayer.filter((card, index) => card !== action.payload)
        }
        default:
            return state;
    }
}
