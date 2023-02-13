import { useEffect, useState } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypeSelector'
import { Card } from '../../card/Card'
import './handPlayer.scss'

const HandPlayer: React.FC = () => {

    //const [cards, setCards] = useState<string[]>(['1', '2', '3', '4', '45', '5'])
    
    const { hendPlayer, hendOpponent } = useTypedSelector(state => state.cards)
    const { attacker, activePack } = useTypedSelector(state => state.onTable)
    const [ elementLine, setElementLine ] = useState(false)
    const { setCardOnTablePersonT, addTrashCardsT, getCardsT, changeAttackerT, addCardsLoserT } = useActions()

    useEffect(() => {
        if (hendPlayer.length > 6) {
            setElementLine(true)
        }
    },[hendPlayer])
    
    const handleSelectCard = (card: string, person: string) => {
        setCardOnTablePersonT(card, person)
    }

    const handleResetcards = () => {
        if (activePack.length % 2 === 1) {
            addCardsLoserT(activePack, attacker === 'player'? 'opponent' : 'player')
            addTrashCardsT('clear')
        }
        else{
            addTrashCardsT('simple')
        }

        if (hendPlayer.length < 6) {
            const amountCardsPlayer = 6 - hendPlayer.length
            getCardsT(amountCardsPlayer, 'player')
        }

        if (hendOpponent.length < 6) {
            const amountCardsOpponent = 6 - hendOpponent.length
            getCardsT(amountCardsOpponent, 'opponent')
        }

        changeAttackerT(attacker === 'player'? 'opponent' : 'player') //изменяем наподающего
        
    }

    return (
        <>
            <div className="containerHandPlayer">
                <div className="handPlayer">
                    <div className="hand">
                        {hendPlayer.map((card, index) => <Card key={card} card={hendPlayer[index]} handleSelectCard={handleSelectCard} hend={'player'} elementLine={elementLine}/>)}
                    </div>
                </div>
                <button onClick={handleResetcards}>Бито</button>
            </div>
        </>
    )
}

export {HandPlayer}