import { IPlayCard, IResetCards } from "../../../../types/dats";

export const convertValueToInt = (value: string): number => {
    if (isNaN(Number(value))) {
        switch (value) {
            case 'B ':
                return 11;
            case 'D ':
                return 12;
            case 'K ':
                return 13;
            case 'T ':
                return 14;
            default:
                return 0;
        }   
    }
    else{
        return Number(value)
    }
}

export const handlePlayCard = ({card, attacker, hend, person, activePack, handleSelectCard, trump}: IPlayCard): void => {
    if(attacker === hend){ 
        if (person === hend) {
            if (activePack.length !== 0) { //если на столе больше 0 карт 
                const arrOfNumbers: number[] = activePack.map(cardPack => {
                    return convertValueToInt(cardPack.slice(0,2))
                })
                if (arrOfNumbers.includes(convertValueToInt(card.slice(0,2)))) { //проверка есть ли на столе такая же карта которую выбрал пользователь
                    if (handleSelectCard) {
                        handleSelectCard(card, person === 'player'? 'opponent' : 'player')
                    }
                }
            }
            else {
                if (handleSelectCard) {
                    handleSelectCard(card, person === 'player'? 'opponent' : 'player')
                }
            }
        } 
    }
    else if (activePack.length !== 0) { //при защите

        const lastCard: string[] = activePack.slice(-1);
        let lastCardValue: number = convertValueToInt(lastCard[0].slice(0,2)); //значения последней карты на столе
        const lastCardSuit: string = lastCard[0].slice(2); //масть последней карты на столе

        let cardHendValue: number = convertValueToInt(card.slice(0,2));
        const cardHendSuit: string = card.slice(2);

        if (activePack.length % 2 === 1) { //проверка на колличество кар на столе
            if (trump.slice(2).trim() === cardHendSuit.trim()) { //если активная карта это козырь
                if (cardHendSuit.trim() === lastCardSuit.trim()) {
                    if (lastCardValue < cardHendValue) {
                        if (person === hend) {
                            if (handleSelectCard) {
                                handleSelectCard(card, person === 'player'? 'opponent' : 'player')
                            }
                        } 
                    }
                }
                else{
                    if (person === hend) {
                        if (handleSelectCard) {
                            handleSelectCard(card, person === 'player'? 'opponent' : 'player')
                        }
                    } 
                }
            }
            else if (lastCardValue < cardHendValue && cardHendSuit.trim() === lastCardSuit.trim()) {// если значение карты на столе меньше чем активная карта
                if (person === hend) {
                    if (handleSelectCard) {
                        handleSelectCard(card, person === 'player'? 'opponent' : 'player')
                    }
                } 
            }
        }
        
    } 
}
    
export const handleResetCards = (props: IResetCards): void => { //сброс и раздача карт после сброса
    
    const  {activePack, attacker, addCardsLoserT, hendPlayer, hendOpponent, getCardsT, addTrashCardsT, changeAttackerT}  = props   
        
    if (activePack.length % 2 === 1) {
        addCardsLoserT(activePack, attacker === 'player' ? 'opponent' : 'player')
        if (attacker === 'player') {
            if (hendPlayer.length < 6) {
                const amountCardsPlayer = 6 - hendPlayer.length
                getCardsT(amountCardsPlayer, 'player')
            }
        }
        else {
            if (hendOpponent.length < 6) {
                const amountCardsOpponent = 6 - hendOpponent.length
                getCardsT(amountCardsOpponent, 'opponent')
            }
        }
        addTrashCardsT('clear')
    }
    else{
        addTrashCardsT('simple')
        if (attacker === 'player') {
            if (hendPlayer.length < 6) {
                const amountCardsPlayer = 6 - hendPlayer.length
                getCardsT(amountCardsPlayer, 'player')
            }
            if (hendOpponent.length < 6) {
                const amountCardsOpponent = 6 - hendOpponent.length
                getCardsT(amountCardsOpponent, 'opponent')
            }
        }
        else {
            if (hendOpponent.length < 6) {
                const amountCardsOpponent = 6 - hendOpponent.length
                getCardsT(amountCardsOpponent, 'opponent')
            }
            if (hendPlayer.length < 6) {
                const amountCardsPlayer = 6 - hendPlayer.length
                getCardsT(amountCardsPlayer, 'player')
            }
        }
        changeAttackerT(attacker === 'player'? 'opponent' : 'player')
    }
}