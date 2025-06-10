type ComentProps = {
    name : string,
    text : string,
    date : Date;
}

export default function Coment({ name, text, date } : ComentProps) {
    return (
        <div>
            <span>{name}</span>
            <div>
                <div>{text}</div>
                <div>{date.toLocaleString()}</div>
            </div>
        </div>
    )
}