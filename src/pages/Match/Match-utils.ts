import { IMatch } from "../../components"
import { getMatch } from "../../utils/api/api"
import { getUsernameFromJWT } from "../../utils/jwt/jwt"
import {
	IHandleEventsParams,
	IMatchState,
	TMatchReducerActions
} from "./Match-types"

export function matchReducer(state: IMatchState, action: TMatchReducerActions) {
	switch (action.type) {
		case "SET_LOADING":
			return {
				...state,
				loading: action.payload
			} as IMatchState
		case "SET_CONTROLS_DISABLED":
			return {
				...state,
				controlsDisabled: action.payload
			} as IMatchState
		case "SET_DISPLAY_ANIMATIONS":
			return {
				...state,
				displayAnimations: action.payload
			} as IMatchState
		case "SET_MATCH_ENDED":
			return {
				...state,
				matchEnded: action.payload
			} as IMatchState
		case "SET_TOKEN":
			return {
				...state,
				token: action.payload
			} as IMatchState
		case "SET_PLAYER_MOVE":
			return {
				...state,
				[action.user]: action.payload
			} as IMatchState
	}
}

export async function handleEvents(params: IHandleEventsParams) {
	const {
		events,
		sse,
		setControlsDisabled,
		matchId,
		token,
		matchContext,
		dispatchMatchState,
		dispatchMatchCtx
	} = params

	const event: any = JSON.parse(events.data)

	if (Array.isArray(event)) {
		return
	}

	switch (event.type) {
		case "TURN_ENDED":
			const { winner, newTurnId } = event.payload

			await getMatch({
				matchId,
				token,
				resCallback: (match: IMatch) => {
					dispatchMatchState({
						type: "SET_PLAYER_MOVE",
						user: "user1",
						payload: match.turns[match.turns.length - 1].user1
					})

					dispatchMatchState({
						type: "SET_PLAYER_MOVE",
						user: "user2",
						payload: match.turns[match.turns.length - 1].user2
					})

					dispatchMatchState({ type: "SET_DISPLAY_ANIMATIONS", payload: true })
				}
			})

			dispatchMatchCtx({ type: "SET_CURRENT_TURN", payload: newTurnId })
			if (winner !== "draw") {
				dispatchMatchCtx({ type: "SET_USER", user: winner, field: "score" })
			}

			setControlsDisabled(false)
			break
		case "PLAYER1_MOVED":
			if (getUsernameFromJWT(token) === matchContext.players.user1.username) {
				setControlsDisabled(true)
			}
			break
		case "PLAYER2_MOVED":
			if (getUsernameFromJWT(token) === matchContext.players.user2.username) {
				setControlsDisabled(true)
			}
			break
		case "MATCH_ENDED":
			setControlsDisabled(true)

			const t = setTimeout(() => {
				dispatchMatchState({ type: "SET_MATCH_ENDED", payload: true })
			}, 2000)

			sse.close()
			return () => clearTimeout(t)
	}
}
