import { CardActionsTypes, cardState, packAction } from './../../types/storeTypes';

const initialState: cardState = {
    cards: [
        '6 diamonds', '7 diamonds', '8 diamonds', '9 diamonds', '10 diamonds', 'B diamonds', 'D diamonds', 'K diamonds', 'T diamonds',
        '6 hearts', '7 hearts', '8 hearts', '9 hearts', '10 hearts', 'B hearts', 'D hearts', 'K hearts', 'T hearts',
        '6 clubs', '7 clubs', '8 clubs', '9 clubs', '10 clubs', 'B clubs', 'D clubs', 'K clubs', 'T clubs',
        '6 spades', '7 spades', '8 spades', '9 spades', '10 spades', 'B spades', 'D spades', 'K spades', 'T spades'
    ],
    hendOpponent: [],
    hendPlayer: [],
    trump: ''
    //suit: ['diamonds', 'hearts', 'clubs', 'spades'], //буби, черви, крести, пики
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
                cards: [...shuffle(state.cards)],
                trump: state.cards.at(-1) || ''
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
        case CardActionsTypes.ADD_OPPONENT_SOME_CARD:
            return {
                ...state,
                hendOpponent: [...state.hendOpponent, ...action.payload],
            }
        case CardActionsTypes.ADD_PLAYER_SOME_CARD:
            return {
                ...state,
                hendPlayer: [...state.hendPlayer, ...action.payload],
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
