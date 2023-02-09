import { useState } from "react"
import { useDispatch } from "react-redux"
import { setRandomCardsT } from "../../../../store/reducers/action-creators/card"
import { useActions } from "../../../hooks/useActions"
import { useTypedSelector } from "../../../hooks/useTypeSelector"
//import images from "../../../../packImages"
import './card.scss'

interface CardI{
    card: string;
    key: string;
    //removeTodo: (id: number) => void;
}

const Card: React.FC<CardI> = (props) => {

    const {card } = props
    
    const {cards} = useTypedSelector(state => state.cards)
    const { setRandomCardsT } = useActions()
    
    const aaaa = () => {
        setRandomCardsT() // работает
    }

    /* function getCommand(file: string) {
        return import(
          /* webpackInclude: /[A-Za-z0-9-_,\s]+\.ts$/i 
          `../../../../pack/${file}`
        );
      }

    const image = getCommand('6+.jpg')

    console.log(image); */
    

    return (
        <div className="card" onClick={aaaa}>
            {/* <img src={} alt="" /> */}
            <p>{card}</p>
        </div>
    )
}

export {Card}