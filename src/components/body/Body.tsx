import { useEffect, useState } from 'react'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypeSelector'
import './body.scss'
import { HandOpponent } from './components/hends/handOpponent/HandOpponent'
import { HandPlayer } from './components/hends/handPlayer/HandPlayer'
import { Pack } from './components/pack/Pack'
import { PackOnTable } from './components/pack/PackOnTable'
import { TreshPach } from './components/trashPack/TreshPach'

const Body: React.FC = () => {

    const { cards } = useTypedSelector(state => state.cards)

    useEffect(() => {
        localStorage.setItem('cards', JSON.stringify(cards) )
    }, [])

    return (
        <div className="body">
            <HandOpponent />
            <Pack />
            <PackOnTable />
            <HandPlayer />
            <TreshPach />
        </div>
    )
}

export {Body}