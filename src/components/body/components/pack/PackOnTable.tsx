import { useState } from "react"
import { useTypedSelector } from "../../../hooks/useTypeSelector"
import { Card } from "../card/Card"
import './pack.scss'

const PackOnTable: React.FC = () => {
    
    const {activePack} = useTypedSelector(state => state.onTable)
    
    return (
        <div className="packOnTableContainer">
            <div className="packOnTable">
                {activePack?.map((card, index) => <Card key={card} card={card} hend={'onTable'} index={index} />)}
            </div>
        </div>
    )
}

export {PackOnTable}