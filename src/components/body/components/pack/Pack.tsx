import { useState } from "react"
import { Card } from "../card/Card"
import './pack.scss'

const Pack: React.FC = () => {
    const [cards, setCards] = useState([1,2,3,4,45,5])

    return (
        <div className="packContainer">
            <div className="pack">
                {cards.map((card) => <Card key={card} />)}
            </div>
        </div>
    )
}

export {Pack}