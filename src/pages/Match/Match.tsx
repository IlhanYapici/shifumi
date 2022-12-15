import { EventSourcePolyfill } from "event-source-polyfill"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { useMatchContext } from "../../context/MatchContext/MatchContext"
import { ScoreBar } from "./_components/ScoreBar/ScoreBar"
import { Controls } from "./_components/Controls/Controls"
import { getMatch } from "../../utils/api/api"
import { getUsernameFromJWT } from "../../utils/jwt/jwt"
import { getScores } from "../../utils/misc/misc"

export function Match() {
	const [token, setToken] = useState<string | null>(null)
	const [controlsDisabled, setControlsDisabled] = useState<boolean>(false)
	// const [eventSource, setEventSource] = useState<EventSourcePolyfill>()

	const { matchId } = useParams()
	const { matchContext, setMatchContext, updateScore } = useMatchContext()

	// ["PLAYER_JOIN", "NEW_TURN", "TURN_ENDED", "PLAYER_MOVED", "MATCH_ENDED"]

	useEffect(() => {
		const fetchMatch = async () => {
			if (!matchId) {
				return
			}

			setMatchContext({ ...matchContext, matchId })

			const localToken = localStorage.getItem("token")

			if (localToken === null) {
				console.info("Token is null")
				return
			}

			const resCallback = (data: any) => {
				setToken(localToken)

				const currentTurn = Object.keys(
					data.turns[data.turns.length - 1]
				).includes("winner")
					? data.turns.length + 1
					: data.turns.length

				const scores = getScores(data.turns)

				setMatchContext({
					...matchContext,
					players: {
						"0": { score: scores.user1, username: data.user1.username },
						"1": { score: scores.user2, username: data.user2.username }
					},
					currentTurn
				})

				console.log(data)
			}

			await getMatch({ matchId: matchId, token: localToken, resCallback })
		}

		fetchMatch()
	}, [])

	useEffect(() => {
		if (token === null) return

		const sse = new EventSourcePolyfill(
			`${import.meta.env.VITE_API_URL}/matches/${matchId}/subscribe`,
			{ headers: { Authorization: `Bearer ${token}` } }
		)

		sse.onmessage = (ev) => {
			const event: any = JSON.parse(ev.data)

			if (Array.isArray(event)) {
				return
			}

			switch (event.type) {
				case "PLAYER1_JOIN":
					console.info("Player 1 joined.")
					break
				case "PLAYER2_JOIN":
					console.info("Player 2 joined.")
					break
				case "NEW_TURN":
					console.info(`New turn: ${event.payload.turnId}`)
					setMatchContext({
						...matchContext,
						currentTurn: event.payload.turnId
					})
					break
				case "TURN_ENDED":
					const { winner, newTurnId } = event.payload
					console.info(`Turn ${newTurnId - 1} ended.`)
					updateScore(winner)
					setControlsDisabled(false)
					break
				case "PLAYER1_MOVED":
					console.info("Player 1 moved.")
					if (getUsernameFromJWT(token) === matchContext.players[0].username) {
						setControlsDisabled(true)
					}
					break
				case "PLAYER2_MOVED":
					console.info("Player 2 moved.")
					if (getUsernameFromJWT(token) === matchContext.players[1].username) {
						setControlsDisabled(true)
					}
					break
				case "MATCH_ENDED":
					console.info("Match ended.")
					break
			}
		}

		sse.onerror = (event) => {
			console.log(event)
			// sse.close()
		}
	}, [token])

	return (
		<>
			<ScoreBar />
			<Controls disabled={controlsDisabled} />
		</>
	)
}
