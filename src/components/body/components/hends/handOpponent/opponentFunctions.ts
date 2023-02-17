import { convertValueToInt, handlePlayCard } from "../../card/cardFunctions";

const makeUniq = (arr: string[]):string[] => {
    return arr.filter((el, id) => arr.indexOf(el) === id);
}

const hendleCheckSuitTramp = (hendOpponentCopy: string[]):string => { //выявление минимальной карты у врага
    let hendOpponentValues = []

    let minCard = convertValueToInt(hendOpponentCopy[0].slice(0,2))
    let indexCard = 0

    hendOpponentValues = hendOpponentCopy.map(card => {
        return convertValueToInt(card.slice(0,2))
    })

    minCard = Math.min.apply(null, hendOpponentValues)
    indexCard = hendOpponentValues.findIndex(cardNumber => cardNumber === minCard)     
    
    return hendOpponentCopy[indexCard]
}

export const hendlePlayOpponent = ( hendOpponent: string[], activePack: string[], handleSelectCard: any, trump: string):void => { //переместить
        
    let hendOpponentCopy: string[] = hendOpponent.slice(0);
    let cardSelect: string = '';
    let cardStatus: boolean = true
    
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