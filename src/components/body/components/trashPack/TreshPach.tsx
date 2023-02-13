import { useState } from "react"
import { useTypedSelector } from "../../../hooks/useTypeSelector"
import { Card } from "../card/Card"
import './treshpack.scss'

const TreshPach: React.FC = () => {

    const {trash} = useTypedSelector(state => state.onTable)
    
    return (
        <div className="treshPackConteiner">
            {trash.length !== 0 &&
                <>
                    <h1>Бито</h1>
                    <div className="tresh">
                        {trash.map((card) => <Card key={card} card={card} hend={'pack'}/>)}
                    </div>
                </>
            }
        </div>
    )
}

export {TreshPach}