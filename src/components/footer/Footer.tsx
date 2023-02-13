import { useTypedSelector } from '../hooks/useTypeSelector'
import './footer.scss'

const Footer: React.FC = () => {

    const { attacker } = useTypedSelector(state => state.onTable)

    const person = attacker === 'player'? 'Игрока' : 'Компьютера';
    
    return (
        <div className="footer">
            <span>Ход <b>{person}</b></span>
        </div>
    )
}

export {Footer}