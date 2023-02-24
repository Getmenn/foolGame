export interface ITodo{ //лишний
    id: number;
    title: string,
    complete: boolean;
}

export interface IResetCards {
    activePack: string[],
    attacker: string,
    handleAddCardLoser: any,
    hendPlayer: string[],
    hendOpponent: string[],
    hendleGetCards: any,
    hendAddCardsTrash: any,
    handleChangeAttacker: any
}