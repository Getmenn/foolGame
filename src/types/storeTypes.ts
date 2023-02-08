
export interface packState {
    hendOpponent: string[];
    hendPlayer: string[];
}

export interface packAction{
    type: string,
    payload?: any;
}

export interface cardState {
    cards: string[];
}