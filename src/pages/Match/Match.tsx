import { EventSourcePolyfill } from "event-source-polyfill"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { useMatchContext } from "../../context/MatchContext/MatchContext"
import { ScoreBar } from "./_components/ScoreBar/ScoreBar"
import { Controls } from "./_components/Controls/Controls"
import { getMatch } from "../../utils/api/api"
import { getScores } from "../../utils/misc/misc"
import { Loading } from "./_components/Loading/Loading"
import { handleEvents } from "./Match-utils"
import { AnimatedEventsContainer } from "./_components/AnimatedEventsContainer/AnimatedEventsContainer"
import { IMatch } from "../../components"

export function Match() {
	const [loading, setLoading] = useState<boolean>(true)
	const [token, setToken] = useState<string | null>(null)
	const [controlsDisabled, setControlsDisabled] = useState<boolean>(false)
	const [eventSource, setEventSource] = useState<EventSourcePolyfill>()

	const { matchContext, setMatchContext, updateScore } = useMatchContext()
	const { matchId } = useParams()
	const navigate = useNavigate()

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

			const resCallback = (match: IMatch) => {
				const { turns, user1, user2 } = match
				setToken(localToken)

				if (Object.keys(match).includes("winner")) {
					setControlsDisabled(true)
				}

				const currentTurn = turns.length > 0 ? getCurrentTurn(turns) : 1

				const scores = getScores({ turns })

				setMatchContext((prevState) => ({
					...prevState,
					players: {
						user1: { score: scores.user1, username: user1!.username },
						user2: { score: scores.user2, username: user2!.username }
					},
					currentTurn
				}))
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
				updateScore,
				navigate
			})

		return () => sse.close()
	}, [token])

	return (
		<motion.div
			key="matchPageContainer"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			{loading && (
				<motion.div
					key="matchLoadginBar"
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
		</motion.div>
	)
}
