import './body.scss'
import { HandOpponent } from './components/nends/handOpponent/HandOpponent'
import { HandPlayer } from './components/nends/handPlayer/HandPlayer'
import { Pack } from './components/pack/Pack'

const Body: React.FC = () => {
    

    return (
        <div className="body">
            <HandOpponent />
            <Pack />
            <HandPlayer />
        </div>
    )
}

export {Body}