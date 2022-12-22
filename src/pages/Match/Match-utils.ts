import { getUsernameFromJWT } from "../../utils/jwt/jwt"
import { IHandleEventsParams } from "./Match-types"

export function handleEvents(params: IHandleEventsParams) {
	const {
		events,
		sse,
		setControlsDisabled,
		token,
		matchContext,
		setMatchContext,
		updateScore
	} = params

	const event: any = JSON.parse(events.data)

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
			setMatchContext((prevState) => ({
				...prevState,
				currentTurn: event.payload.turnId
			}))
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
			setControlsDisabled(true)
			sse.close()
			break
	}
}
