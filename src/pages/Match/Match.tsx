import { EventSourcePolyfill } from "event-source-polyfill"
import { useEffect, useReducer } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"

import { AnimatedEventsContainer } from "./_components/AnimatedEventsContainer/AnimatedEventsContainer"
import { useMatchContext } from "../../context/MatchContext/MatchContext"
import { useUserContext } from "../../context/UserContext/UserContext"
import { getScores, getUserNumber } from "../../utils/misc/misc"
import { handleEvents, matchReducer } from "./Match-utils"
import { ScoreBar } from "./_components/ScoreBar/ScoreBar"
import { Controls } from "./_components/Controls/Controls"
import { DEFAULT_MATCH_STATE } from "./Match-constants"
import { Loading } from "./_components/Loading/Loading"
import { getMatch } from "../../utils/api/api"
import { IMatch } from "../../components"
import { MatchEndedOverlay } from "./_components/MatchEndedOverlay/MatchEndedOverlay"

export function Match() {
	const [matchState, dispatch] = useReducer(matchReducer, DEFAULT_MATCH_STATE)

	const { matchContext, dispatchMatchCtx } = useMatchContext()
	const { userContext } = useUserContext()
	const { matchId } = useParams()

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

			dispatchMatchCtx({ type: "SET_MATCH_ID", payload: matchId })

			const localToken = localStorage.getItem("token")

			if (localToken === null) {
				console.info("Token is null")
				return
			}

			const resCallback = (match: IMatch) => {
				const { turns, user1, user2 } = match
				dispatch({ type: "SET_TOKEN", payload: localToken })

				if (Object.keys(match).includes("winner")) {
					dispatch({ type: "SET_CONTROLS_DISABLED", payload: true })
				}

				const userNumber = getUserNumber(userContext.username, match)

				const currentTurn = turns.length > 0 ? getCurrentTurn(turns) : 1

				const scores = getScores({ turns })

				dispatchMatchCtx({ type: "SET_USER_NUMBER", payload: userNumber })
				dispatchMatchCtx({
					type: "SET_USER",
					user: "user1",
					field: "username",
					payload: user1!.username
				})
				dispatchMatchCtx({
					type: "SET_USER",
					user: "user2",
					field: "username",
					payload: user2!.username
				})

				dispatchMatchCtx({
					type: "SET_USER",
					user: "user1",
					field: "score",
					payload: scores.user1
				})
				dispatchMatchCtx({
					type: "SET_USER",
					user: "user2",
					field: "score",
					payload: scores.user2
				})

				dispatchMatchCtx({ type: "SET_CURRENT_TURN", payload: currentTurn })
			}

			await getMatch({ matchId: matchId, token: localToken, resCallback })
		}

		fetchMatch()

		const t = setTimeout(() => {
			dispatch({ type: "SET_LOADING", payload: false })
		}, 2000)

		return () => clearTimeout(t)
	}, [])

	useEffect(() => {
		if (matchState.token === null) return

		const sse = new EventSourcePolyfill(
			`${import.meta.env.VITE_API_URL}/matches/${matchId}/subscribe`,
			{
				headers: { Authorization: `Bearer ${matchState.token}` },
				heartbeatTimeout: 600000
			}
		)

		sse.onmessage = (events) =>
			handleEvents({
				events,
				sse,
				matchId: matchId!,
				token: matchState.token!,
				setControlsDisabled: (disabled: boolean) =>
					dispatch({ type: "SET_CONTROLS_DISABLED", payload: disabled }),
				matchContext,
				dispatchMatchState: dispatch,
				dispatchMatchCtx
			})

		return () => sse.close()
	}, [matchState.token])

	return (
		<motion.div
			key="matchPageContainer"
			style={{ height: "100%" }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			{matchState.loading && (
				<motion.div
					key="matchLoadginBar"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<Loading delay={500} />
				</motion.div>
			)}
			{!matchState.loading && !matchState.matchEnded && (
				<motion.div
					key="matchPage"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<ScoreBar />
					{matchState.displayAnimations && (
						<AnimatedEventsContainer
							matchState={matchState}
							dispatchMatchState={dispatch}
						/>
					)}
					<Controls disabled={matchState.controlsDisabled} />
				</motion.div>
			)}
			{matchState.matchEnded && <MatchEndedOverlay />}
		</motion.div>
	)
}
