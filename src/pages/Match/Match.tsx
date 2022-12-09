import { useParams } from "react-router-dom"

interface Props {}

export function Match(props: Props) {
	const { matchId } = useParams()

	const {} = props

	return <h1>Match {matchId} </h1>
}
