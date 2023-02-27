import { useTypedSelector } from "../../../hooks/useTypeSelector"
import { Card } from "../card/Card"
import './pack.scss'

const Pack: React.FC = () => {
    const {cards, trump} = useTypedSelector(state => state.cards)

    return (
        <div className="packContainer">
            <div className="pack">
                {cards.map((card) => {
                    if (trump === card) {
                        return <Card key={card} card={card} hend={'trump'}/>
                    }
                    return <Card key={card} card={card} hend={'pack'}/>
                }
                 )}
            </div>
        </div>
    )
}

export {Pack}