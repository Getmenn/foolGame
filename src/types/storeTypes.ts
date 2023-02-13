
export interface cardState {
    cards: string[];
    hendOpponent: string[];
    hendPlayer: string[];
    trump: string
}

export enum CardActionsTypes{
    SET_RANDOM_CARDS = 'SET_RANDOM_CARDS', // перемешать колоду
    GET_CARDS = 'GET_CARDS', // убрать карты из колоды
    ADD_OPPONENT_CARD = 'SET_OPPONENT_CARD', // добавить врагу
    DELETE_OPPONENT_CARD = 'GET_OPPONENT_CARD', // удалить у врага
    ADD_PLAYER_CARD = 'SET_PLAYER_CARD', // добавить игроку
    DELETE_PLAYER_CARD = 'GET_PLAYER_CARD', // удалить у игрока
    SET_NEW_CARDS = 'SET_NEW_CARDS', //добавить новые карты в колоду
    ADD_OPPONENT_SOME_CARD = 'ADD_OPPONENT_SOME_CARD',
    ADD_PLAYER_SOME_CARD = 'ADD_PLAYER_SOME_CARD'

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

interface SetNewCardsAction{
    type: CardActionsTypes.SET_NEW_CARDS;
    payload: string[]
}

interface AddSomeCardOpponent{
    type: CardActionsTypes.ADD_OPPONENT_SOME_CARD;
    payload: string[]
}

interface AddSomeCardPlayer{
    type: CardActionsTypes.ADD_PLAYER_SOME_CARD;
    payload: string[]
}

export type packAction =
    SetRandomCardsAction | AddOpponentCardAction |
    DeleteOpponentCardAction | AddPlayerCardAction |
    DeletePlayerCardAction | GetCardsAction | 
    SetNewCardsAction| AddSomeCardOpponent | AddSomeCardPlayer

//===================================================== колода на столе

export interface onTablePackState {
    activePack: string[];
    attacker: string;
    person: string;
    trash: string[];
}

export enum onTablePackTypes{
    ADD_CARD_ON_TABLE = 'ADD_CARD_ON_TABLE',
    CLEAR_TABLE = 'CLEAR_TABLE',
    ADD_TRASH = 'ADD_TRASH',
    CHANGE_ATTACKER = 'CHANGE_ATTACKER'
}

interface addCardOnTable{
    type: onTablePackTypes.ADD_CARD_ON_TABLE;
    payload: { card: string, person: string}
}

interface clearTable{
    type: onTablePackTypes.CLEAR_TABLE;
    payload: {person: string} //чей ход слудующий
}

interface addTrash{
    type: onTablePackTypes.ADD_TRASH;
    payload: string;
}

interface changeAttacker{
    type: onTablePackTypes.CHANGE_ATTACKER;
    payload: string; //изменить нападающего
}


export type onTablePackAction = addCardOnTable | clearTable | addTrash | changeAttacker


export type generalAction = onTablePackAction | packAction //обьединяющий экшены тип, для диспатчей
