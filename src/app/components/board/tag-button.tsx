type tagButtonProps = {
    type : string,
    onClick: ()=> void,
    isActive: boolean
    
}

export default function TagButton({type, onClick, isActive} : tagButtonProps) {
    return (
        <div>
            <div onClick={onClick}>{type}</div>
        </div>
    )
}