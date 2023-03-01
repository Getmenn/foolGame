import { useEffect, useState } from "react"
import { useTypedSelector } from "../../../hooks/useTypeSelector"
import './card.scss'
import clubs from '../../../images/suits/clubs.svg'
import spades from '../../../images/suits/spades.svg'
import hearts from '../../../images/suits/hearts.svg'
import diamonds from '../../../images/suits/diamonds.svg'
import { handlePlayCard } from "./cardFunctions"
import { IDetailedCard } from "../../../../types/dats"

const DetailedCard: React.FC<IDetailedCard> = ({ card, handleSelectCard, hend }) => {

    const { trump} = useTypedSelector(state => state.cards)
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
        <div className='detailedCard' onClick={() => handlePlayCard({card, attacker, hend, person, activePack, handleSelectCard, trump})}>
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