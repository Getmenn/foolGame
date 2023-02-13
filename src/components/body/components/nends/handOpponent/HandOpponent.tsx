import { useState, useEffect } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypeSelector'
import { Card } from '../../card/Card'
import './handOpponent.scss'

const HandOpponent: React.FC = () => {

    //const [cards, setCards] = useState<string[]>(['1', '2', '3', '4', '45', '5'])
    const { hendOpponent } = useTypedSelector(state => state.cards)
    const {activePack} = useTypedSelector(state => state.onTable)
    const { setCardOnTablePersonT } = useActions()
    
    const handleSelectCard = (card: string, attacker: string, person: string) => {
        setCardOnTablePersonT(card, attacker, person)
    }

    return (
        <div className="handOpponent">
            <div className="hand">
                {hendOpponent.map((card, index) => <Card key={card} card={hendOpponent[index]} handleSelectCard={handleSelectCard} hend={'opponent'} />)}
            </div>
        </div>
    )
}

export {HandOpponent}