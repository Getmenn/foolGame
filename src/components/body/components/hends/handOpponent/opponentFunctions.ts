import { IResetCards } from "../../../../../types/dats";
import { convertValueToInt, handlePlayCard, handleResetCards } from "../../card/cardFunctions";

const makeUniq = (arr: string[]): string[] => { //преобразования массива в массив уникальных значений
    return arr.filter((el, id) => arr.indexOf(el) === id);
}

const hendleCheckSuitTramp = (hendOpponent: string[], lastCardSuit?: string, lastCardNumber?: number , trump?: string): string => { //выявление минимальной карты у врага
    
    if (lastCardSuit && lastCardNumber && lastCardSuit !== '0') {
        let cardSelect: string = '0';

        const variantsMove: string[] = hendOpponent.filter(card => { //выбираем карты из руки которые больше карты на столе
            const valueCard = convertValueToInt(card.slice(0, 2))
            const suitCard = card.slice(2).trim()
            if (suitCard === lastCardSuit) {
                if (valueCard > lastCardNumber) {
                    cardSelect = card
                    return card
                }
            } 
        })

        variantsMove.forEach(card => { //выбираем наименьшую из них
            const valueCard = convertValueToInt(card.slice(0, 2))
            
            if (valueCard < convertValueToInt(cardSelect.slice(0, 2))) {
                cardSelect = card
            }
        })    
        
        return cardSelect
    }
    else if (trump !== undefined) { // поиск минимального козыря в руке
        let cardSelect: string = '0';

        const variantsMove: string[] = hendOpponent.filter(card => { //создаем массив из козырей
            const suitCard = card.slice(2).trim();
            
            if (suitCard === trump.slice(2).trim()) {
                cardSelect = card;
                return card
            } 
        })

        variantsMove.forEach(card => { //выбираем наименьшую карту
            const valueCard = convertValueToInt(card.slice(0, 2))
            if (valueCard < convertValueToInt(cardSelect.slice(0, 2))) {
                cardSelect = card;
            }
        })    
        
        return cardSelect
    }
    else { 
        let hendOpponentValues:number[]// = []     

        let minCard = convertValueToInt(hendOpponent[0].slice(0,2))
        let indexCard = 0
    
        hendOpponentValues = hendOpponent.map(card => {
            return convertValueToInt(card.slice(0,2))
        })
    
        minCard = Math.min.apply(null, hendOpponentValues)
        indexCard = hendOpponentValues.findIndex(cardNumber => cardNumber === minCard)     
        
        return hendOpponent[indexCard]
    }
}

const hendleFirstMoveOpponent =  ( hendOpponent: string[], activePack: string[], handleSelectCard: any, trump: string): void => { 
    
    let hendOpponentCopy: string[] = hendOpponent.slice(0);
    let cardSelect: string = '';
    let cardStatus: boolean = true;
    
    do {
        if (makeUniq(hendOpponentCopy).length === 1) { //если все значения перебрали и в руках все козыри
            let cardSelect = hendleCheckSuitTramp(hendOpponent); // срабатывает

            if (activePack.length === 0 && cardStatus ) {
                handlePlayCard(cardSelect, 'opponent', 'opponent', 'opponent', activePack, handleSelectCard, trump) //ходим с минимального козыря
            }
            break;
        }

        let cardSelect = hendleCheckSuitTramp(hendOpponentCopy);

        hendOpponentCopy = hendOpponentCopy.map(card => {
            if (card === cardSelect) {
                return '20'
            }
            else return card
        })
        
        
        if (cardSelect.slice(2).trim() !== trump.slice(2).trim() && cardStatus) {
            setTimeout(() => handlePlayCard(cardSelect, 'opponent', 'opponent', 'opponent', activePack, handleSelectCard, trump), 500) 
            cardStatus = false
        }
    }
    while (cardSelect.slice(2).trim() !== trump)
}

export const hendleProtectionOpponent = ( hendOpponent: string[], activePack: string[], handleSelectCard: any, trump: string, propsReset: IResetCards): void => { //
        
    const lastCard: string = activePack[activePack.length - 1];
    const lastCardSuit: string = lastCard.slice(2).trim();
    const lastCardNumber: number = convertValueToInt(lastCard.slice(0, 2));
    
    let cardSelect: string = hendleCheckSuitTramp(hendOpponent, lastCardSuit, lastCardNumber) // изменить все на selectCard
    
    if (cardSelect === '0' && lastCardSuit !== trump) { //если нет подходящей карты и карта на столе не козырь
        cardSelect = hendleCheckSuitTramp(hendOpponent, '0', 0, trump) //выбираем наименьший козырь из рук  

        if (cardSelect === '0') {
            console.log('Враг забирает карты');
            
            setTimeout(() => handleResetCards(propsReset), 500)
        }
        else {
            setTimeout(() => handlePlayCard(cardSelect, 'player', 'opponent', 'opponent', activePack, handleSelectCard, trump), 500)
        }
    }
    else { //если есть чем побить без козыря      
        setTimeout(() => handlePlayCard(cardSelect, 'player', 'opponent', 'opponent', activePack, handleSelectCard, trump), 500) 
    }

}


export const hendlePlayOpponent = ( hendOpponent: string[], activePack: string[], handleSelectCard: any, trump: string, attacker: string, person: string, propsReset: IResetCards): void => {
    
    if (attacker === 'opponent' && person === 'opponent') {
        hendleFirstMoveOpponent(hendOpponent, activePack, handleSelectCard, trump); //первый атакующий ход оппонета
    }
    else if (attacker === 'player' && person === 'opponent') {
        
        hendleProtectionOpponent(hendOpponent, activePack, handleSelectCard, trump, propsReset); //защита оппонета
    }

}

