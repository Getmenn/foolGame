import './message.scss'

interface IMessage{
    person?: string;
    message?: string;
}

const Message: React.FC<IMessage> = ({ person, message }) => {
    
    const style: React.CSSProperties = person === 'opponent'
        ? {
            gridRowStart: '1',
            gridColumnStart: '3',
        }
        : {
            gridRowStart: '3',
            gridColumnStart: '3',
        }  

    return (
        <>
            {message &&
                <div className="message" style={style}>
                    {message}
                </div>
            }
        </>
        
    )
}

export {Message}