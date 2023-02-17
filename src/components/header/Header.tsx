import { useActions } from '../hooks/useActions'
import './header.scss'

const Header: React.FC = () => {

    const { setNewGameT } = useActions()

    const handleReload = (): void => {
        setNewGameT()
    }
    
    return (
        <div className="header">
            <button onClick={handleReload}>Новая игра</button>
            <p>Дурак</p>
        </div>
    )
}

export {Header}