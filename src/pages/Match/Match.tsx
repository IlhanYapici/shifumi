import { EventSourcePolyfill } from "event-source-polyfill"
import { AnimatePresence, motion } from "framer-motion"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { useMatchContext } from "../../context/MatchContext/MatchContext"
import { ScoreBar } from "./_components/ScoreBar/ScoreBar"
import { Controls } from "./_components/Controls/Controls"
import { getMatch } from "../../utils/api/api"
import { getUsernameFromJWT } from "../../utils/jwt/jwt"
import { getScores } from "../../utils/misc/misc"
import { Loading } from "./_components/Loading/Loading"

export function Match() {
	const [loading, setLoading] = useState<boolean>(true)
	const [token, setToken] = useState<string | null>(null)
	const [controlsDisabled, setControlsDisabled] = useState<boolean>(false)
	// const [eventSource, setEventSource] = useState<EventSourcePolyfill>()

	const { matchId } = useParams()
	const { matchContext, setMatchContext, updateScore } = useMatchContext()

	// ["PLAYER_JOIN", "NEW_TURN", "TURN_ENDED", "PLAYER_MOVED", "MATCH_ENDED"]

	const defaultDelay = 2000

	const getCurrentTurn = (turns: any[]) => {
		return Object.keys(turns[turns.length - 1]).includes("winner")
			? turns.length + 1
			: turns.length
	}

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

				const currentTurn =
					data.turns.length > 0 ? getCurrentTurn(data.turns) : 1

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

		const t = setTimeout(() => {
			setLoading(false)
		}, defaultDelay)

		return () => clearTimeout(t)
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
			sse.close()
		}
	}, [token])

	return (
		<AnimatePresence>
			{loading && (
				<motion.div
					key="progressBar"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<Loading delay={500} />
				</motion.div>
			)}
			{!loading && (
				<motion.div
					key="matchPage"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<ScoreBar />
					<Controls disabled={controlsDisabled} />
				</motion.div>
			)}
		</AnimatePresence>
	)
}
