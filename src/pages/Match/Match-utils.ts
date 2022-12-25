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
		case "SET_TOKEN":
			return {
				...state,
				token: action.payload
			} as IMatchState
		case "SET_PLAYER_MOVE":
			return {
				...state,
				[action.player]: action.payload
			} as IMatchState
	}
}

export function handleEvents(params: IHandleEventsParams) {
	const {
		events,
		sse,
		setControlsDisabled,
		token,
		matchContext,
		dispatchMatchCtx,
		navigate
	} = params

	const event: any = JSON.parse(events.data)

	if (Array.isArray(event)) {
		return
	}

	switch (event.type) {
		case "TURN_ENDED":
			const { winner, newTurnId } = event.payload
			console.info(`Turn ${newTurnId - 1} ended.`)

			dispatchMatchCtx({ type: "SET_CURRENT_TURN", payload: newTurnId })
			dispatchMatchCtx({ type: "SET_USER", user: winner, field: "score" })

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
			console.info("Match ended.")
			setControlsDisabled(true)
			const t = setTimeout(() => {
				navigate("/matches")

				return () => clearTimeout(t)
			}, 1000)
			sse.close()
			break
	}
}
