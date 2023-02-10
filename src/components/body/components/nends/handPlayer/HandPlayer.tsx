import { useEffect, useState } from 'react'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypeSelector'
import { Card } from '../../card/Card'
import './handPlayer.scss'

const HandPlayer: React.FC = () => {

    //const [cards, setCards] = useState<string[]>(['1', '2', '3', '4', '45', '5'])
    
    const { hendPlayer, hendOpponent } = useTypedSelector(state => state.cards)
    const { setCardOnTablePersonT, addTrashCardsT, getCardsT } = useActions()
    
    const handleSelectCard = (card: string, attacker: string, person: string) => {
        setCardOnTablePersonT(card, attacker, person)
    }

    const handleResetcards = () => {
        addTrashCardsT()

        if (hendPlayer.length < 6) {
            const amountCardsPlayer = 6 - hendPlayer.length
            getCardsT(amountCardsPlayer, 'player')
        }

        if (hendOpponent.length < 6) {
            const amountCardsOpponent = 6 - hendOpponent.length
            getCardsT(amountCardsOpponent, 'opponent')
        }
        
    }

    return (
        <>
            <div className="containerHandPlayer">
                <div className="handPlayer">
                    <div className="hand">
                        {hendPlayer.map((card, index) => <Card key={card} card={hendPlayer[index]} handleSelectCard={handleSelectCard} hend={'player'} />)}
                    </div>
                </div>
                <button onClick={handleResetcards}>Бито</button>
            </div>
        </>
    )
}

export {HandPlayer}