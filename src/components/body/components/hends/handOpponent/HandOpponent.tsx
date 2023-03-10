import { useState, useEffect } from 'react'
import { IResetCards, ISelectCard } from '../../../../../types/dats'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypeSelector'
import { Card } from '../../card/Card'
import { Message } from '../../message/Message'
import './handOpponent.scss'
import { hendlePlayOpponent } from './opponentFunctions'

const HandOpponent: React.FC = () => {

    const { hendOpponent, hendPlayer, trump, cards } = useTypedSelector(state => state.cards)
    const { activePack, attacker, person} = useTypedSelector(state => state.onTable)
    const [elementLine, setElementLine] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const [ marginHend, setMarginHend ] = useState<string>('0')
    const { setCardOnTablePersonT, addCardsLoserT, getCardsT, addTrashCardsT, changeAttackerT } = useActions()

    useEffect(() => {
        if (hendOpponent.length > 7 || hendOpponent.length < 4) { //если карт больше 6 то изменяе стили
            setElementLine(true)
        }
        else {
            setElementLine(false)
        }
    }, [hendOpponent])
    
    useEffect(() => {
        if (person === 'opponent') {
            hendlePlayOpponent(hendOpponent, activePack, handleSelectCard, trump, attacker, person, propsReset, cards)
        }
    }, [person, attacker])

    useEffect(() => {
        switch (hendOpponent.length) {
            case 6:
                setMarginHend('0')
                break;
            case 7:
                setMarginHend('90px')
                break;
            case 4:
                setMarginHend('-111px')
                break;
            case 3:
                setMarginHend('0')
                break; 
            default:
                setMarginHend('0')
                break;
        }
    }, [hendOpponent])
    
    const handleSelectCard = (card: string, person: string): void => {
        setCardOnTablePersonT(card, person)
    }

    const propsReset:IResetCards = {activePack, attacker, addCardsLoserT, hendPlayer, hendOpponent, getCardsT, addTrashCardsT, changeAttackerT, setMessage}

    return (
        <>
            <div className="handOpponent">
                <div className="hand" style={{marginLeft: marginHend }}>
                    {hendOpponent.map((card, index) => <Card
                        key={card}
                        index={index}
                        card={hendOpponent[index]}
                        handleSelectCard={handleSelectCard}
                        hend={'pack'}
                        elementLine={elementLine}
                    />)}
                </div>
            </div>
            <Message person='opponent' message={message} />
        </>
        
    )
}

export {HandOpponent}