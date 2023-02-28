import { useEffect, useState } from 'react'
import { IResetCards, ISelectCard } from '../../../../../types/dats'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypeSelector'
import { Card } from '../../card/Card'
import { handleResetCards } from '../../card/cardFunctions'
import { Message } from '../../message/Message'
import './handPlayer.scss'

const HandPlayer: React.FC = () => {
    
    const { hendPlayer, hendOpponent } = useTypedSelector(state => state.cards)
    const { attacker, activePack } = useTypedSelector(state => state.onTable)
    const [ elementLine, setElementLine] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)
    const [ message, setMessage ] = useState<string>('')
    const { setCardOnTablePersonT, addTrashCardsT, getCardsT, changeAttackerT, addCardsLoserT } = useActions()

    useEffect(() => {
        if (hendPlayer.length > 6) {
            setElementLine(true)
        }
        else {
            setElementLine(false)
        }
    }, [hendPlayer])
    
    useEffect(() => {
        if (activePack.length === 0) {
            setDisabled(true)
        }
        else {
            setDisabled(false)
        }
    }, [activePack])
    
    const handleSelectCard = (card: string, person: string): void => { // положить карту на стол
        setCardOnTablePersonT(card, person)
    }

    const propsReset:IResetCards = {activePack, attacker, addCardsLoserT, hendPlayer, hendOpponent, getCardsT, addTrashCardsT, changeAttackerT, setMessage}

    return (
        <>
            <div className="containerHandPlayer">
                <div className="handPlayer">
                    <div className="hand">
                        {hendPlayer.map((card, index) => <Card
                            key={card}
                            index = {index}
                            card={hendPlayer[index]}
                            handleSelectCard={handleSelectCard}
                            hend={'player'}
                            elementLine={elementLine}
                        />)}
                    </div>
                </div>
                <button onClick={() => handleResetCards(propsReset)} disabled={disabled}>Бито</button>
            </div>
            <Message person='player' message={message} />
        </>
    )
}

export {HandPlayer}