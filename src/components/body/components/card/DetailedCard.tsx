import { useEffect, useState } from "react"
import { useTypedSelector } from "../../../hooks/useTypeSelector"
import './card.scss'
import clubs from '../../../images/clubs.svg'
import spades from '../../../images/spades.svg'
import hearts from '../../../images/hearts.svg'
import diamonds from '../../../images/diamonds.svg'
import { handlePlayCard } from "./cardFunctions"

interface DetailedCardI{
    card: string;
    handleSelectCard?: (card: string, person: string) => void;
    hend: string; //чья рука
    //logickOpponent?: (card: string) => void;
}

const DetailedCard: React.FC<DetailedCardI> = (props) => {

    const { card, handleSelectCard, hend } = props

    const { trump, hendOpponent  } = useTypedSelector(state => state.cards)
    const { person, activePack, attacker} = useTypedSelector(state => state.onTable)
    const [cardValue, setCardValue] = useState('')
    const [cardSuit, setCardSuit] = useState('')
    
    useEffect(() => {
        setCardValue(card.slice(0, 2))
        setCardSuit(card.slice(2).trim()) 
    }, [])

    useEffect(() => {
        switch (cardSuit) {
            case 'clubs':
                setCardSuit(clubs)
                break;
            case 'spades':
                setCardSuit(spades)
            break;
            case 'hearts':
                setCardSuit(hearts)
            break;
            case 'diamonds':
                setCardSuit(diamonds)
                break;
            default:
                break;
        }
    },[cardSuit])
    
    /* const convertValueToInt = (value:string) => {
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

    const handlePlayCard = (card: string) => {
        if(attacker === hend){ 
            if (person === hend) {
                if (activePack.length !== 0) { //если на столе больше 0 карт 
                    const arrOfNumbers = activePack.map(cardPack => {
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

            const lastCard = activePack.slice(-1);
            let lastCardValue = convertValueToInt(lastCard[0].slice(0,2)); //значения последней карты на столе
            const lastCardSuit = lastCard[0].slice(2); //масть последней карты на столе

            let cardHendValue = convertValueToInt(cardValue);
            const cardHendSuit = card.slice(2);

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
    } */

/* 
    const makeUniq = (arr: string[]) => {
        return arr.filter((el, id) => arr.indexOf(el) === id);
    }

    const hendleCheckSuitTramp = (hendOpponentCopy: string[]) => { //выявление минимальной карты у врага
        let hendOpponentValues = []

        let minCard = convertValueToInt(hendOpponent[0].slice(0,2))
        let indexCard = 0

        hendOpponentValues = hendOpponentCopy.map(card => {
            return convertValueToInt(card.slice(0,2))
        })

        minCard = Math.min.apply(null, hendOpponentValues)
        indexCard = hendOpponentValues.findIndex(cardNumber => cardNumber === minCard)     
        
        return hendOpponentCopy[indexCard]
    }
  
    const hendlePlayOpponent = () => { //переместить
        if (attacker === 'opponent' && person === 'opponent') {
            
            let hendOpponentCopy = hendOpponent.slice(0);
            let cardSelect = '';
            
            do {
                if (makeUniq(hendOpponentCopy).length === 1) { //если все значения перебрали и в руках все козыри
                    let cardSelect = hendleCheckSuitTramp(hendOpponent);
                    handlePlayCard(cardSelect) //ходим с минимального козыря
                    break;
                }

                let cardSelect = hendleCheckSuitTramp(hendOpponentCopy);
                hendOpponentCopy = hendOpponentCopy.map(card => {
                    if (card === cardSelect) {
                        return '20'
                    }
                    else return card
                })
                console.log('go');
                
                
                if (cardSelect.slice(2).trim() !== trump.slice(2).trim()) {
                    console.log('ну все ок', cardSelect.slice(2).trim() !== trump, cardSelect.slice(2).trim(), cardSelect);
                    
                    setTimeout(() => handlePlayCard(cardSelect), 500)
                }
            }
            while (cardSelect.slice(2).trim() === trump)

        }

    } */

    /* useEffect(() => {
        hendlePlayOpponent()
    }, []) */
    
    

    return (
        <div className='detailedCard' onClick={() => handlePlayCard(card, attacker, hend, person, activePack, handleSelectCard, trump)}>
            <div className="leftUpCorner">
                <span>{cardValue}</span>
                <img src={cardSuit} alt="suit" />
            </div>
            <div className="midle">
                <img src={cardSuit} alt="suit" />
            </div>
            <div className="rightDownCorner">
                <img src={cardSuit} alt="suit" />
                <span>{cardValue}</span>
            </div> 
        </div>       
    )
}

export {DetailedCard}