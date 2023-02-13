import { useEffect, useState } from "react"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypeSelector"
import backSide from '../../../images/backSide.jpg'
import './card.scss'

interface CardI{
    card: string;
    key: string;
    handleSelectCard?: (card: string, person: string) => void;
    hend?: string; //чья рука
    elementLine?: boolean;
}

const Card: React.FC<CardI> = (props) => {

    const { card, handleSelectCard, hend, elementLine = false } = props

    const { cards, trump } = useTypedSelector(state => state.cards)
    const { person, activePack, attacker} = useTypedSelector(state => state.onTable)

    const styleCard: React.CSSProperties = elementLine  // работает, но пока безпонтово
    ? {
        transform: 'none',
        marginLeft: '155px'
    } 
    : {}
    
    
    const convertValueToInt = (value:string) => {
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
                    return value;
            }   
        }
        else{
            return Number(value)
        }
    }

    const handlePlayCard = (card: string) => {
        if(attacker === hend){ //сделать атаку только повторяющихся карт на столе
            if (person === hend) {
                if (handleSelectCard) {
                    handleSelectCard(card, person === 'player'? 'opponent' : 'player')
                }
            } 
        }
        else if (activePack.length !== 0) {

            const lastCard = activePack.slice(-1);
            let lastCardValue = convertValueToInt(lastCard[0].slice(0,2)); //значения последней карты на столе
            const lastCardSuit = lastCard[0].slice(2); //масть последней карты на столе

            let cardHendValue = convertValueToInt(card.slice(0,2));
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
        
        
        
        
    }
    
    return (
        <div className='card' onClick={() => handlePlayCard(card)} style={styleCard}>
            {hend === 'pack'
                ? <img src={backSide} alt="backSide card" />
                : <p>{card}</p>
            }    
        </div>       
    )
}

export {Card}