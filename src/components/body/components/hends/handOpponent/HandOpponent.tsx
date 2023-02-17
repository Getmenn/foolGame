import { useState, useEffect } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypeSelector'
import { Card } from '../../card/Card'
import './handOpponent.scss'
import { hendlePlayOpponent } from './opponentFunctions'

const HandOpponent: React.FC = () => {

    const { hendOpponent, trump } = useTypedSelector(state => state.cards)
    const { activePack, attacker, person} = useTypedSelector(state => state.onTable)
    const [ elementLine, setElementLine ] = useState<boolean>(false)
    const { setCardOnTablePersonT } = useActions()

    useEffect(() => {
        if (hendOpponent.length > 6) {
            setElementLine(true)
        }
        else {
            setElementLine(false)
        }
    }, [hendOpponent])
    
    useEffect(() => {
        if (attacker === 'opponent' && person === 'opponent') {
            hendlePlayOpponent(hendOpponent, activePack, handleSelectCard, trump)
        }
    }, [attacker])
    
    const handleSelectCard = (card: string, person: string):void => {
        setCardOnTablePersonT(card, person)
    }

    return (
        <div className="handOpponent">
            <div className="hand">
                {hendOpponent.map((card, index) => <Card
                    key={card}
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