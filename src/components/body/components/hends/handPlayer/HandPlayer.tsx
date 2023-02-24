import { useEffect, useState } from 'react'
import { IResetCards } from '../../../../../types/dats'
import { useActions } from '../../../../hooks/useActions'
import { useTypedSelector } from '../../../../hooks/useTypeSelector'
import { Card } from '../../card/Card'
import { handleResetCards } from '../../card/cardFunctions'
import './handPlayer.scss'

const HandPlayer: React.FC = () => {

    //const [cards, setCards] = useState<string[]>(['1', '2', '3', '4', '45', '5'])
    
    const { hendPlayer, hendOpponent } = useTypedSelector(state => state.cards)
    const { attacker, activePack } = useTypedSelector(state => state.onTable)
    const [elementLine, setElementLine] = useState<boolean>(false)
    const [disabled, setDisabled] = useState<boolean>(true)
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

    /* const handleResetCards = ():void => { //раздача карт после сброса
        if (activePack.length % 2 === 1) {
            handleAddCardLoser(activePack, attacker)
            if (attacker === 'player') {
                if (hendPlayer.length < 6) {
                    const amountCardsPlayer = 6 - hendPlayer.length
                    hendleGetCards(amountCardsPlayer, 'player')
                }
            }
            else {
                if (hendOpponent.length < 6) {
                    const amountCardsOpponent = 6 - hendOpponent.length
                    hendleGetCards(amountCardsOpponent, 'opponent')
                }
            }
            hendAddCardsTrash('clear')
        }
        else{
            hendAddCardsTrash('simple')
            if (attacker === 'player') {
                if (hendPlayer.length < 6) {
                    const amountCardsPlayer = 6 - hendPlayer.length
                    hendleGetCards(amountCardsPlayer, 'player')
                }
                if (hendOpponent.length < 6) {
                    const amountCardsOpponent = 6 - hendOpponent.length
                    hendleGetCards(amountCardsOpponent, 'opponent')
                }
            }
            else {
                if (hendOpponent.length < 6) {
                    const amountCardsOpponent = 6 - hendOpponent.length
                    hendleGetCards(amountCardsOpponent, 'opponent')
                }
                if (hendPlayer.length < 6) {
                    const amountCardsPlayer = 6 - hendPlayer.length
                    hendleGetCards(amountCardsPlayer, 'player')
                }
            }
            handleChangeAttacker(attacker)
        }
    } */

    return (
        <>
            <div className="containerHandPlayer">
                <div className="handPlayer">
                    <div className="hand">
                        {hendPlayer.map((card, index) => <Card
                            key={card}
                            card={hendPlayer[index]}
                            handleSelectCard={handleSelectCard}
                            hend={'player'}
                            elementLine={elementLine}
                        />)}
                    </div>
                </div>
                <button onClick={() => handleResetCards(propsReset)} disabled={disabled}>Бито</button>
            </div>
        </>
    )
}

export {HandPlayer}