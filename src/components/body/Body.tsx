import { useEffect, useState } from 'react'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypeSelector'
import './body.scss'
import { HandOpponent } from './components/nends/handOpponent/HandOpponent'
import { HandPlayer } from './components/nends/handPlayer/HandPlayer'
import { Pack } from './components/pack/Pack'
import { PackOnTable } from './components/pack/PackOnTable'

const Body: React.FC = () => {

    const {cards } = useTypedSelector(state => state.cards)

    useEffect(() => {
        localStorage.setItem('cards', JSON.stringify(cards) )
    }, [])

    return (
        <div className="body">
            <HandOpponent />
            <Pack />
            <PackOnTable />
            <HandPlayer />
        </div>
    )
}

export {Body}