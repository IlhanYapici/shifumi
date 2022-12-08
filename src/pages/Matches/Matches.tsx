import { Grid } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { MatchCard } from "../../components/MatchCard/MatchCard"

export function Matches() {
	const [matches, setMatches] = useState([])

	useEffect(() => {
		const token = localStorage.getItem("token")

		const getMaches = async () => {
			await axios
				.get(`${import.meta.env.VITE_API_URL}/matches`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then((res) => setMatches(res.data))
				.catch((err) => console.error(err))
		}

		getMaches()
	}, [])

	return (
		<Grid className="matches-list-container" w="fit-content" m="0 auto">
			<MatchCard
				match={{
					_id: "toto",
					turns: [],
					user1: { _id: "1", username: "barney" },
					user2: null
				}}
			/>
		</Grid>
	)
}
