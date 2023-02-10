import { useState } from "react"
import { useTypedSelector } from "../../../hooks/useTypeSelector"
import { Card } from "../card/Card"
import './pack.scss'

const PackOnTable: React.FC = () => {
    //const [cards, setCards] = useState<string[]>(['1', '2', '3', '4', '45', '5'])
    const {activePack} = useTypedSelector(state => state.onTable)

    //const activePack: string[] = []
    
    return (
        <div className="packOnTableContainer" style={{marginTop: activePack.length >= 6 ? '-193px' : '-233px'}}>
            <div className="packOnTable">
                {activePack?.map((card) => <Card key={card} card={card}/>)}
            </div>
        </div>
    )
}

export {PackOnTable}