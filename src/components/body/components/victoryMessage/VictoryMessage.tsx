import { useEffect, useState } from 'react'
import { useActions } from '../../../hooks/useActions'
import { useTypedSelector } from '../../../hooks/useTypeSelector'
import firework from '../../../images/firework.png'
import whiteFlag from '../../../images/whiteFlag.gif'
import './victoryMessage.scss'

const VictoryMessage: React.FC = () => {

    const { hendOpponent, hendPlayer, cards} = useTypedSelector(state => state.cards)
    const [victory, setVictory] = useState<string>('unset')
    const {clearTableT} = useActions()
    
    useEffect(() => {
        if (cards.length === 0 && hendPlayer.length === 0) {
            setVictory('victory');
            setTimeout(() => clearTableT(), 1500);
        }
        else if (cards.length === 0 && hendOpponent.length === 0){
            setVictory('defeat');
            setTimeout(() => clearTableT(), 1500);
        }
    }, [cards, hendPlayer, hendOpponent])

    const hendleExit = (): void =>  {
        setVictory('unset');
    }   

    return (
        <>
            {victory === 'victory' &&
                <div className="victoryMessage" >
                    <img src={firework} alt="firework" />
                    Победа
                    <img src={firework} alt="firework" />
                </div>
            }

            {victory === 'defeat' &&
                <div className="defeatMessage" >
                    <img src={whiteFlag} alt="whiteFlag" />
                    Поражение
                </div>
            }

            {victory !== 'unset' && <div className="overlay" onClick={hendleExit}/>}
        </>
        
    )
}

export {VictoryMessage}