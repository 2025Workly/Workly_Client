
type CategoryBoxProps = {
    tag : string
}

export default function CategoryBox({ tag } : CategoryBoxProps) {
    return (
        <span style={tag==="고민" ? {backgroundColor: "#356EFF"} : {backgroundColor: "#FF4747"}}>{tag}</span>
    )
}
