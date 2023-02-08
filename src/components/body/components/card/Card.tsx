import { useState } from "react"
import { useDispatch } from "react-redux"
import { cardActions, setRandomCardsT } from "../../../../store/reducers/cardReducer"
import './card.scss'

const Card: React.FC = () => {

    const dispatch = useDispatch()
    const aaaa = () => {
        //dispatch(cardActions.setRandomCards(5)) // не работает
        console.log('ok');
        setRandomCardsT() // тоже не работает
    }
    return (
        <div className="card" onClick={aaaa}>
        
        </div>
    )
}

export {Card}