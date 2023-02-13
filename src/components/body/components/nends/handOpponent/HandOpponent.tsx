import { useState, useEffect } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypeSelector'
import { Card } from '../../card/Card'
import './handOpponent.scss'

const HandOpponent: React.FC = () => {

    //const [cards, setCards] = useState<string[]>(['1', '2', '3', '4', '45', '5'])
    const { hendOpponent } = useTypedSelector(state => state.cards)
    const {activePack} = useTypedSelector(state => state.onTable)
    const [ elementLine, setElementLine ] = useState(false)
    const { setCardOnTablePersonT } = useActions()

    useEffect(() => {
        if (hendOpponent.length > 6) {
            setElementLine(true)
        }
    },[hendOpponent])
    
    const handleSelectCard = (card: string, person: string) => {
        setCardOnTablePersonT(card, person)
    }

    return (
        <div className="handOpponent">
            <div className="hand">
                {hendOpponent.map((card, index) => <Card key={card} card={hendOpponent[index]} handleSelectCard={handleSelectCard} hend={'opponent'} elementLine={elementLine}/>)}
            </div>
        </div>
    )
}

export {HandOpponent}