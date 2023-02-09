
export interface cardState {
    cards: string[];
    hendOpponent: string[];
    hendPlayer: string[];
}

export enum CardActionsTypes{
    SET_RANDOM_CARDS = 'SET_RANDOM_CARDS', // перемешать колоду
    GET_CARDS = 'GET_CARDS', // убрать карты из колоды
    ADD_OPPONENT_CARD = 'SET_OPPONENT_CARD', // добавить врагу
    DELETE_OPPONENT_CARD = 'GET_OPPONENT_CARD', // удалить у врага
    ADD_PLAYER_CARD = 'SET_PLAYER_CARD', // добавить игроку
    DELETE_PLAYER_CARD = 'GET_PLAYER_CARD' // удалить у игрока
    
}

interface SetRandomCardsAction{
    type: CardActionsTypes.SET_RANDOM_CARDS;
}

interface AddOpponentCardAction{
    type: CardActionsTypes.ADD_OPPONENT_CARD;
    payload: number
}

interface DeleteOpponentCardAction{
    type: CardActionsTypes.DELETE_OPPONENT_CARD;
    payload: string
}

interface AddPlayerCardAction{
    type: CardActionsTypes.ADD_PLAYER_CARD;
    payload: number
}

interface DeletePlayerCardAction{
    type: CardActionsTypes.DELETE_PLAYER_CARD;
    payload: string
}

interface GetCardsAction{
    type: CardActionsTypes.GET_CARDS;
    payload: number
}

export type packAction =
    SetRandomCardsAction | AddOpponentCardAction |
    DeleteOpponentCardAction | AddPlayerCardAction |
    DeletePlayerCardAction | GetCardsAction
