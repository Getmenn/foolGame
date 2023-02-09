import { useState, useEffect } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypeSelector'
import { Card } from '../../card/Card'
import './handOpponent.scss'

const HandOpponent: React.FC = () => {

    //const [cards, setCards] = useState<string[]>(['1', '2', '3', '4', '45', '5'])
    const {hendOpponent} = useTypedSelector(state => state.cards)
    const { getCardsT } = useActions()
    
    useEffect(() => {
        getCardsT(6, 'opponent')
    },[])

    return (
        <div className="handOpponent">
            <div className="hand">
                {hendOpponent.map((card, index) => <Card key={card} card={hendOpponent[index]}/>)}
            </div>
        </div>
    )
}

export {HandOpponent}