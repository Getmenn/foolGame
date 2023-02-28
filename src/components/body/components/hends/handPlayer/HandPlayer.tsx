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
    const { attacker, activePack, person } = useTypedSelector(state => state.onTable)
    const [ elementLine, setElementLine] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)
    const [ message, setMessage] = useState<string>('')
    const [ buttonText, setButtonText ] = useState<string>('Бито')
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
        if (activePack.length === 0 || activePack.length % 2 === 1) {
            setDisabled(true)
        }
        else {
            setDisabled(false)
        }
    }, [activePack])

    useEffect(() => {
        if(attacker === 'player' && person === 'player'){
            setButtonText('Бито')
        }
        else if (attacker === 'opponent' && person === 'player') {
            setButtonText('Беру')
            setDisabled(false)
        }
    },[attacker, person])
    
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
                <button onClick={() => handleResetCards(propsReset)} disabled={disabled}>{buttonText}</button>
            </div>
            <Message person='player' message={message} />
        </>
    )
}

export {HandPlayer}