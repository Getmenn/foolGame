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
    const [cardValue, setCardValue] = useState<string>('')
    const [cardSuit, setCardSuit] = useState<string>('')
    
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