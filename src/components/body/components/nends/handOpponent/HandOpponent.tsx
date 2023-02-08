import { useState } from 'react'
import { Card } from '../../card/Card'
import './handOpponent.scss'

const HandOpponent: React.FC = () => {

    const [cards, setCards] = useState([1,2,3,4,45,5])

    return (
        <div className="handOpponent">
            <div className="hand">
                {cards.map((card) => <Card key={card} />)}
            </div>
        </div>
    )
}

export {HandOpponent}