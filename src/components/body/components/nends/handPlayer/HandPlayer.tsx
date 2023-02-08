import { useState } from 'react'
import { Card } from '../../card/Card'
import './handPlayer.scss'

const HandPlayer: React.FC = () => {

    const [cards, setCards] = useState([1,2,3,4,45,5])

    return (
        <div className="handPlayer">
            <div className="hand">
                {cards.map((card) => <Card key={card} />)}
            </div>
        </div>
    )
}

export {HandPlayer}