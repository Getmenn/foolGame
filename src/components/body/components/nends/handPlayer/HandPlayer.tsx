import { useEffect, useState } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypeSelector'
import { Card } from '../../card/Card'
import './handPlayer.scss'

const HandPlayer: React.FC = () => {

    const [cards, setCards] = useState<string[]>(['1', '2', '3', '4', '45', '5'])
    
    const {hendPlayer} = useTypedSelector(state => state.cards)
    const { getCardsT } = useActions()
    
    useEffect(() => {
        getCardsT(6, 'player')
    },[])

    return (
        <div className="handPlayer">
            <div className="hand">
                {hendPlayer.map((card, index) => <Card key={card} card={hendPlayer[index]} />)}
            </div>
        </div>
    )
}

export {HandPlayer}