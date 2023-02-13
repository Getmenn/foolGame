import { useState } from "react"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypeSelector"
import backSide from '../../../images/backSide.jpg'
import './card.scss'

interface CardI{
    card: string;
    key: string;
    handleSelectCard?: (card: string, attacker: string, person: string) => void;
    hend?: string; //чья рука
    //removeTodo: (id: number) => void;
}

const Card: React.FC<CardI> = (props) => {

    const { card, handleSelectCard, hend } = props

    const { cards } = useTypedSelector(state => state.cards)
    const {person, attacker} = useTypedSelector(state => state.onTable)
    

    const handlePlayCard = (card: string) => {
        if (person === hend) {
            if (handleSelectCard) {
                handleSelectCard(card, 'player', person === 'player'? 'opponent' : 'player')
            }
        } 
    }
    
    return (
        //<div className="cardPlase">
        <div className='card' onClick={() => handlePlayCard(card)}>
            {hend === 'pack'
                ? <img src={backSide} alt="backSide card" />
                : <p>{card}</p>
            }    
            </div>
        //</div>
        
    )
}

export {Card}