import { useEffect, useState } from "react"
import { useTypedSelector } from "../../../hooks/useTypeSelector"
import { Card } from "../card/Card"
import clubs from '../../../images/clubs.svg'
import spades from '../../../images/spades.svg'
import hearts from '../../../images/hearts.svg'
import diamonds from '../../../images/diamonds.svg'
import './pack.scss'

const Pack: React.FC = () => {
    const { cards, trump } = useTypedSelector(state => state.cards)
    const [cardSuit, setCardSuit] = useState<string>('')

    useEffect(() => {  
        setCardSuit(trump.slice(2).trim())          
    }, [trump])
    
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
        <div className="packContainer">
            <div className="pack">
                {cards.map((card) => {
                    if (trump === card) {
                        return <Card key={card} card={card} hend={'trump'}/>
                    }
                    return <Card key={card} card={card} hend={'pack'}/>
                }
                )}
                {cards.length === 0 && <img src={cardSuit} className='trumpSuit' alt="suit" />}
            </div>
        </div>
    )
}

export {Pack}