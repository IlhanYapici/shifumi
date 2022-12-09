import axios from "axios"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

export function Match() {
	const { matchId } = useParams()

	useEffect(() => {
		const getMatch = async () => {
			const token = localStorage.getItem("token")
			if (token === null) return

			await axios
				.get(`${import.meta.env.VITE_API_URL}/matches/${matchId}`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then((res) => console.log(res.data))
				.catch((err) => console.error(err))
		}

		getMatch()
	}, [])

	return <h1>Match {matchId} </h1>
}
