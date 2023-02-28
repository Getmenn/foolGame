export interface ITodo{ //лишний
    id: number;
    title: string;
    complete: boolean;
}

export interface IResetCards {
    activePack: string[];
    attacker: string;
    addCardsLoserT: any;
    hendPlayer: string[];
    hendOpponent: string[];
    getCardsT: any;
    addTrashCardsT: any;
    changeAttackerT: any
}

export interface ICard{
    card: string;
    key: string;
    handleSelectCard?: any;
    hend: string; //чья рука
    elementLine?: boolean;
    index?: number;
}

export interface IDetailedCard{
    card: string;
    handleSelectCard?: any;
    hend: string; //чья рука
}

export interface IPlayCard{
    card: string;
    attacker: string;
    hend: string;
    person: string;
    activePack: string[];
    handleSelectCard: any;
    trump: string
}

export interface ISelectCard{
    card: string;
    person: string;
}