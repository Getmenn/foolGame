import { ICard } from "../../../../types/dats";
import backSide from '../../../images/backSide.jpg'
import './card.scss'
import { DetailedCard } from "./DetailedCard";

const Card: React.FC<ICard> = (props) => {

    const { card, handleSelectCard, hend, index, elementLine = false} = props

    const styleCard: React.CSSProperties = // работает, но пока безпонтово
        elementLine ? { 
            transform: 'none',
            marginLeft: '-42px',
            zIndex: index
        } 
        : {
            zIndex: index
          }
    
    return (
        <div className='card' style={styleCard}>
            {hend === 'pack'
                ? <img src={backSide} alt="backside card" />
                : <DetailedCard card={card} handleSelectCard={handleSelectCard} hend={hend} />
            }    
        </div>       
    )
}

export {Card}