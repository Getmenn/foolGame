import { useState, useEffect } from 'react'
import { IResetCards } from '../../../../../types/dats'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypeSelector'
import { Card } from '../../card/Card'
import './handOpponent.scss'
import { hendlePlayOpponent } from './opponentFunctions'

const HandOpponent: React.FC = () => {

    const { hendOpponent, hendPlayer, trump } = useTypedSelector(state => state.cards)
    const { activePack, attacker, person} = useTypedSelector(state => state.onTable)
    const [ elementLine, setElementLine ] = useState<boolean>(false)
    const { setCardOnTablePersonT, addCardsLoserT, getCardsT, addTrashCardsT, changeAttackerT } = useActions()

    useEffect(() => {
        if (hendOpponent.length > 6) { //если карт больше 6 то изменяе стили
            setElementLine(true)
        }
        else {
            setElementLine(false)
        }
    }, [hendOpponent])
    
    useEffect(() => {
        if (person === 'opponent') {
            hendlePlayOpponent(hendOpponent, activePack, handleSelectCard, trump, attacker, person, propsReset)
        }
    }, [person, attacker])
    
    const handleSelectCard = (card: string, person: string): void => {
        setCardOnTablePersonT(card, person)
    }

    const handleAddCardLoser = (activePack: string[], attacker: string): void => { //добавить карты со стола проигравшему
        addCardsLoserT(activePack, attacker === 'player' ? 'opponent' : 'player')
    }

    const hendleGetCards = (amount: number, person: string ): void => { // добавить карты кому-то
        getCardsT(amount, person)
    }

    const hendAddCardsTrash = (type: string): void => { //убрать карты в бито
        addTrashCardsT(type)
    }

    const handleChangeAttacker = (attacker: string): void => { //изменяем нападающего
        changeAttackerT(attacker === 'player'? 'opponent' : 'player') 
    }

    const propsReset:IResetCards = {activePack, attacker, handleAddCardLoser, hendPlayer, hendOpponent, hendleGetCards, hendAddCardsTrash, handleChangeAttacker}

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