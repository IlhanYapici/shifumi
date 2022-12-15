import { EventSourcePolyfill } from "event-source-polyfill"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { useMatchContext } from "../../context/MatchContext/MatchContext"
import { ScoreBar } from "./_components/ScoreBar/ScoreBar"
import { Controls } from "./_components/Controls/Controls"
import { getMatch } from "../../api/utils"

export function Match() {
	const [token, setToken] = useState<string | null>(null)
	const [eventSource, setEventSource] = useState<EventSourcePolyfill>()

	const { matchId } = useParams()
	const { matchContext, setMatchContext } = useMatchContext()

	// ["PLAYER_JOIN", "NEW_TURN", "TURN_ENDED", "PLAYER_MOVED", "MATCH_ENDED"]

	useEffect(() => {
		const fetchMatch = async () => {
			if (!matchId) {
				return
			}

			const localToken = localStorage.getItem("token")

			if (localToken === null) {
				console.info("Token is null")
				return
			}

			const resCallback = (data: any) => {
				setToken(localToken)
				setMatchContext({
					...matchContext,
					players: {
						"0": { score: 0, username: data.user1.username },
						"1": { score: 0, username: data.user2.username }
					}
				})
			}

			await getMatch({ matchId: matchId, token: localToken, resCallback })
		}

		fetchMatch()
	}, [])

	// useEffect(() => {
	// 	if (token === null) return

	// 	const sse = new EventSourcePolyfill(
	// 		`${import.meta.env.VITE_API_URL}/matches/${matchId}/subscribe`,
	// 		{ headers: { Authorization: `Bearer ${token}` } }
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
	// 			case "PLAYER1_MOVED":
	// 				console.info("Player 1 moved.")
	// 				break
	// 			case "PLAYER1_MOVED":
	// 				console.info("Player 1 moved.")
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

	return (
		<>
			<ScoreBar />
			<Controls />
		</>
	)
}
