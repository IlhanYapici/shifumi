import { EventSourcePolyfill } from "event-source-polyfill"
import { AnimatePresence, motion } from "framer-motion"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { useMatchContext } from "../../context/MatchContext/MatchContext"
import { ScoreBar } from "./_components/ScoreBar/ScoreBar"
import { Controls } from "./_components/Controls/Controls"
import { getMatch } from "../../utils/api/api"
import { getScores } from "../../utils/misc/misc"
import { Loading } from "./_components/Loading/Loading"
import { handleEvents } from "./Match-utils"
import { AnimatedEventsContainer } from "./_components/AnimatedEventsContainer/AnimatedEventsContainer"

export function Match() {
	const [loading, setLoading] = useState<boolean>(true)
	const [token, setToken] = useState<string | null>(null)
	const [controlsDisabled, setControlsDisabled] = useState<boolean>(false)
	const [eventSource, setEventSource] = useState<EventSourcePolyfill>()

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

			setMatchContext((prevState) => ({ ...prevState, matchId }))

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

				setMatchContext((prevState) => ({
					...prevState,
					players: {
						"0": { score: scores.user1, username: data.user1.username },
						"1": { score: scores.user2, username: data.user2.username }
					},
					currentTurn
				}))

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
			{
				headers: { Authorization: `Bearer ${token}` },
				heartbeatTimeout: 600000
			}
		)

		setEventSource(sse)

		sse.onmessage = (events) =>
			handleEvents({
				events,
				sse,
				token,
				setControlsDisabled,
				matchContext,
				setMatchContext,
				updateScore
			})

		sse.onerror = (error) => {
			console.log(error)
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
					{/* {eventSource && <AnimatedEventsContainer sse={eventSource} />} */}
					<Controls disabled={controlsDisabled} />
				</motion.div>
			)}
		</AnimatePresence>
	)
}
