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
		updateScore,
		navigate
	} = params

	const event: any = JSON.parse(events.data)

	if (Array.isArray(event)) {
		return
	}

	switch (event.type) {
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
			updateScore({ user: winner, newTurnId })
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
