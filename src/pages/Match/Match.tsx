import { EventSourcePolyfill } from "event-source-polyfill"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

import { useMatchContext } from "../../context/MatchContext/MatchContext"
import { ScoreBar } from "./_components/ScoreBar/ScoreBar"

export function Match() {
	// const [token, setToken] = useState<string | null>(null)
	const [eventSource, setEventSource] = useState<EventSourcePolyfill>()

	const { matchId } = useParams()
	const { matchContext, setMatchContext } = useMatchContext()

	// ["PLAYER_JOIN", "NEW_TURN", "TURN_ENDED", "PLAYER_MOVED", "MATCH_ENDED"]

	useEffect(() => {
		const getMatch = async () => {
			const token = localStorage.getItem("token")
			if (token === null) {
				console.info("Token is null")
				return
			}

			await axios
				.get(`${import.meta.env.VITE_API_URL}/matches/${matchId}`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then(({ data }) => {
					setMatchContext({
						...matchContext,
						players: {
							"0": { score: 0, username: data.user1.username },
							"1": { score: 0, username: data.user2.username }
						}
					})
				})
				.catch((err) => console.error(err))
		}

		getMatch()
	}, [])

	// useEffect(() => {
	// 	if (token === null) return

	// 	const sse = new EventSourcePolyfill(
	// 		`${import.meta.env.VITE_API_URL}/matches/${matchId}/subscribe`,
	// 		{ headers: { Authorization: `Bearer ${token}` }, heartbeatTimeout: 30000 }
	// 	)

	// 	sse.onmessage = (event) => {
	// 		console.log(JSON.parse(event.data))

	// 		switch (event.data.type) {
	// 			case "PLAYER1_JOIN":
	// 				console.info("Player 1 joined.")
	// 				break
	// 			case "PLAYER2_JOIN":
	// 				console.info("Player 2 joined.")
	// 				break
	// 			case "NEW_TURN":
	// 				console.info("New turn.")
	// 				break
	// 			case "TURN_ENDED":
	// 				console.info("Turn ended.")
	// 				break
	// 			case "PLAYER_MOVED":
	// 				console.info("Player moved.")
	// 				break
	// 			case "MATCH_ENDED":
	// 				console.info("Match ended.")
	// 				break
	// 		}
	// 	}

	// 	sse.onerror = (event) => {
	// 		console.log(event)
	// 		sse.close()
	// 	}
	// }, [token])

	return <ScoreBar />
}
