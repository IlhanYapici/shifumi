import { Grid } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { IMatch } from "../../components"
import { MatchCard } from "../../components/MatchCard/MatchCard"

export function Matches() {
	const [matches, setMatches] = useState<IMatch[]>([
		{
			_id: "9803",
			user1: { _id: "1", username: "barney" },
			user2: null,
			turns: []
		},
		{
			_id: "2879",
			user1: {
				_id: "23",
				username: "Firazer"
			},
			user2: {
				_id: "26",
				username: "Balbu98"
			},
			turns: []
		}
	])

	// useEffect(() => {
	// 	const token = localStorage.getItem("token")

	// 	const getMaches = async () => {
	// 		await axios
	// 			.get(`${import.meta.env.VITE_API_URL}/matches`, {
	// 				headers: {
	// 					Authorization: `Bearer ${token}`
	// 				}
	// 			})
	// 			.then((res) => setMatches(res.data))
	// 			.catch((err) => console.error(err))
	// 	}

	// 	getMaches()
	// }, [])

	return (
		<Grid
			className="matches-list-container"
			w="fit-content"
			m="0 auto"
			gap="2rem"
		>
			{matches.map((match) => (
				<MatchCard match={match} />
			))}
		</Grid>
	)
}
