import { useEffect, useState } from "react"
import { useTypedSelector } from "../../../hooks/useTypeSelector"
import backSide from '../../../images/backSide.jpg'
import './card.scss'
import { DetailedCard } from "./DetailedCard";

interface CardI{
    card: string;
    key: string;
    handleSelectCard?: (card: string, person: string) => void;
    hend: string; //чья рука
    elementLine?: boolean;
    //logickOpponent?: (card: string) => void;
}

const Card: React.FC<CardI> = (props) => {

    const { card, handleSelectCard, hend, elementLine = false} = props

    const { trump } = useTypedSelector(state => state.cards)
    const { person, activePack, attacker} = useTypedSelector(state => state.onTable)
    const [cardValue, setCardValue] = useState<string>('')
    const [cardSuit, setCardSuit] = useState<string>('')

    const styleCard: React.CSSProperties = elementLine  // работает, но пока безпонтово
    ? {
        transform: 'none',
        marginLeft: '-42px'
    } 
        : {}
    
    return (
        <div className='card' style={styleCard}>
            {hend === 'pack'
                ? <img src={backSide} alt="backside card" />
                : <DetailedCard card={card} handleSelectCard={handleSelectCard} hend={hend} /* logickOpponent={logickOpponent} */ />
            }    
        </div>       
    )
}

export {Card}