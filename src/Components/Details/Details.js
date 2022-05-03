import { useParams } from "react-router-dom"

function Details() {
    const {item} = useParams()

    return (
        <div>{item}</div>
    )
}

export default Details