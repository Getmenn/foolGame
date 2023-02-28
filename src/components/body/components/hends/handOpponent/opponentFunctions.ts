import { IResetCards, ISelectCard } from "../../../../../types/dats";
import { convertValueToInt, handlePlayCard, handleResetCards } from "../../card/cardFunctions";

const makeUniq = (arr: string[]): string[] => { //преобразования массива в массив уникальных значений
    return arr.filter((el, id) => arr.indexOf(el) === id);
}

const hendleCheckSuitTramp = (
    hendOpponent: string[],
    lastCardSuit?: string,
    lastCardNumber?: number,
    trump?: string
): string => { //выявление минимальной карты у врага
    
    if (lastCardSuit && lastCardNumber && lastCardSuit !== '0') {
        let cardSelect: string = '0';
        
        const variantsMove: string[] = hendOpponent.filter(card => { //выбираем карты из руки которые больше карты на столе
            const valueCard: number = convertValueToInt(card.slice(0, 2))
            const suitCard: string = card.slice(2).trim()
            if (suitCard === lastCardSuit) {
                if (valueCard > lastCardNumber) {
                    cardSelect = card
                    return card
                }
            } 
        })

        variantsMove.forEach(card => { //выбираем наименьшую из них
            const valueCard: number = convertValueToInt(card.slice(0, 2))
            
            if (valueCard < convertValueToInt(cardSelect.slice(0, 2))) {
                cardSelect = card
            }
        })    
        
        return cardSelect
    }
    else if (trump !== undefined) { // поиск минимального козыря в руке
        let cardSelect: string = '0';
        
        const variantsMove: string[] = hendOpponent.filter(card => { //создаем массив из козырей
            const suitCard: string = card.slice(2).trim();
            
            if (suitCard === trump.slice(2).trim()) {
                cardSelect = card;
                return card
            } 
        })

        variantsMove.forEach(card => { //выбираем наименьшую карту
            const valueCard: number = convertValueToInt(card.slice(0, 2))
            if (valueCard < convertValueToInt(cardSelect.slice(0, 2))) {
                cardSelect = card;
            }
        })    

        return cardSelect
    }
    else { 
        let hendOpponentValues:number[]// = []     
        
        let minCard: number = convertValueToInt(hendOpponent[0].slice(0,2))
        let indexCard: number = 0
    
        hendOpponentValues = hendOpponent.map(card => {
            return convertValueToInt(card.slice(0,2))
        })
    
        minCard = Math.min.apply(null, hendOpponentValues)
        indexCard = hendOpponentValues.findIndex(cardNumber => cardNumber === minCard)     
        
        return hendOpponent[indexCard]
    }
}

const hendleFirstMoveOpponent = (
    hendOpponent: string[],
    activePack: string[],
    handleSelectCard: any,
    trump: string,
    propsReset: IResetCards,
    personGame: string
): void => { 
    
    let hendOpponentCopy: string[] = hendOpponent.slice(0);
    let card: string = '';
    let cardStatus: boolean = true;
    const attacker= 'opponent'
    const hend = 'opponent'
    const person = 'opponent'
    
    do {
        if (makeUniq(hendOpponentCopy).length === 1) { //если все значения перебрали и в руках все козыри
            let card: string = hendleCheckSuitTramp(hendOpponent); 

            if (activePack.length === 0 && cardStatus ) {
                handlePlayCard({card , hend , attacker, person, activePack, handleSelectCard, trump}) //ходим с минимального козыря
            }
/*             else if (activePack.length % 2 === 0 && personGame === 'opponent' && activePack.length !== 0) { // не работает пока
                setTimeout(() => handleResetCards(propsReset), 500)
            } */
            break;
        }

        let card: string = hendleCheckSuitTramp(hendOpponentCopy);

        hendOpponentCopy = hendOpponentCopy.map(el => {
            if (card === el) {
                return '20'
            }
            else return el
        })
        
        
        if (card.slice(2).trim() !== trump.slice(2).trim() && cardStatus) {
            setTimeout(() => handlePlayCard({card , hend , attacker, person, activePack, handleSelectCard, trump}), 500) 
            cardStatus = false
        }
    }
    while (card.slice(2).trim() !== trump)
}

const hendleSecondMoveOpponent = (
    activePack: string[],
    hendOpponent: string[],
    trump: string,
    handleSelectCard: any,
    propsReset: IResetCards,
    cards: string[]
): void => { //оппонент добрасывает карты в свой ход и сбрасывает

    const arrOfNumbersTable: number[] = []
    const arrOfNumbersHend: number[] = []
    let statusReset = true
    const attacker = 'opponent'
    const hend = 'opponent'
    const person = 'opponent'

    activePack.forEach((card, index) => arrOfNumbersTable[index] = convertValueToInt(card.slice(0, 2)))
    hendOpponent.forEach((card, index) => arrOfNumbersHend[index] = convertValueToInt(card.slice(0, 2)))
    
    arrOfNumbersHend.forEach((card, index) => {
        if (arrOfNumbersTable.includes(card)) {
            if (hendOpponent[index].slice(2).trim() !== trump.slice(2).trim()) {
                const card = hendOpponent[index];
                statusReset = false
                setTimeout(() => handlePlayCard({card, attacker, hend, person, activePack, handleSelectCard, trump}), 500)
            }
            else if (cards.length <= 4) { //если в колоде 4 или меньше карт компьютер добрасывает козыри
                const card = hendOpponent[index];
                statusReset = false
                setTimeout(() => handlePlayCard({card, attacker, hend, person, activePack, handleSelectCard, trump}), 500)
            }
        }
    })

    if(activePack.length % 2 === 0 && statusReset){
        setTimeout(() => handleResetCards(propsReset), 800)
    }


}

export const hendleProtectionOpponent = (
    hendOpponent: string[],
    activePack: string[],
    handleSelectCard: any,
    trump: string,
    propsReset: IResetCards
): void => { //
        
    const lastCard: string = activePack[activePack.length - 1];
    const lastCardSuit: string = lastCard.slice(2).trim();
    const lastCardNumber: number = convertValueToInt(lastCard.slice(0, 2));
    const attacker= 'player'
    const hend = 'opponent'
    const person = 'opponent'
    
    let card: string = hendleCheckSuitTramp(hendOpponent, lastCardSuit, lastCardNumber) 
    
    if (card === '0' && lastCardSuit !== trump.slice(2).trim() ) { //если нет подходящей карты и карта на столе не козырь
        card = hendleCheckSuitTramp(hendOpponent, '0', 0, trump) //выбираем наименьший козырь из рук  
        
        if (card === '0') {
            console.log('Враг забирает карты');
            
            setTimeout(() => handleResetCards(propsReset), 500)
        }
        else {
            setTimeout(() => handlePlayCard({card ,attacker, hend  , person, activePack, handleSelectCard, trump}), 500)
        }
    }
    else if (lastCardSuit === trump.slice(2).trim()) { //тест
        card = hendleCheckSuitTramp(hendOpponent,  lastCardSuit, lastCardNumber, trump)  
        console.log('идет');
        
        if (card === '0') {
            console.log('Враг забирает карты');
            
            setTimeout(() => handleResetCards(propsReset), 500)
        }
        else {
            setTimeout(() => handlePlayCard({card ,attacker, hend  , person, activePack, handleSelectCard, trump}), 500)
        }
    }
    else { //если есть чем побить без козыря  
        setTimeout(() => handlePlayCard({card ,attacker, hend  , person, activePack, handleSelectCard, trump}), 500) 
    }

}

export const hendlePlayOpponent = (
    hendOpponent: string[],
    activePack: string[],
    handleSelectCard: any,
    trump: string,
    attacker: string,
    person: string,
    propsReset: IResetCards,
    cards: string[]
): void => {
    
    if (attacker === 'opponent' && person === 'opponent' && activePack.length) {
        hendleSecondMoveOpponent(activePack, hendOpponent, trump, handleSelectCard, propsReset, cards)
    }
    else if (attacker === 'opponent' && person === 'opponent') {
        hendleFirstMoveOpponent(hendOpponent, activePack, handleSelectCard, trump, propsReset, person); //первый атакующий ход оппонета
    }
    else if (attacker === 'player' && person === 'opponent') {
        hendleProtectionOpponent(hendOpponent, activePack, handleSelectCard, trump, propsReset); //защита оппонета
    }

}

