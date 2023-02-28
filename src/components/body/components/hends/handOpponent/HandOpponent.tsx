import { useState, useEffect } from 'react'
import { IResetCards, ISelectCard } from '../../../../../types/dats'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypeSelector'
import { Card } from '../../card/Card'
import './handOpponent.scss'
import { hendlePlayOpponent } from './opponentFunctions'

const HandOpponent: React.FC = () => {

    const { hendOpponent, hendPlayer, trump, cards } = useTypedSelector(state => state.cards)
    const { activePack, attacker, person} = useTypedSelector(state => state.onTable)
    const [ elementLine, setElementLine ] = useState<boolean>(false)
    const { setCardOnTablePersonT, addCardsLoserT, getCardsT, addTrashCardsT, changeAttackerT } = useActions()

    useEffect(() => {
        if (hendOpponent.length > 6) { //если карт больше 6 то изменяе стили
            setElementLine(true)
        }
        else {
            setElementLine(false)
        }
    }, [hendOpponent])
    
    useEffect(() => {
        if (person === 'opponent') {
            hendlePlayOpponent(hendOpponent, activePack, handleSelectCard, trump, attacker, person, propsReset, cards)
        }
    }, [person, attacker])
    
    const handleSelectCard = (card: string, person: string): void => {
        setCardOnTablePersonT(card, person)
    }

    const propsReset:IResetCards = {activePack, attacker, addCardsLoserT, hendPlayer, hendOpponent, getCardsT, addTrashCardsT, changeAttackerT}

    return (
        <div className="handOpponent">
            <div className="hand">
                {hendOpponent.map((card, index) => <Card
                    key={card}
                    index={index}
                    card={hendOpponent[index]}
                    handleSelectCard={handleSelectCard}
                    hend={'opponent'}
                    elementLine={elementLine}
                />)}
            </div>
        </div>
    )
}

export {HandOpponent}