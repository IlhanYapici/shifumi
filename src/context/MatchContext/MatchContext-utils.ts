import {
	IMatchContextState,
	TMatchContextReducerActions
} from "./MatchContext-types"

export function matchContextReducer(
	state: IMatchContextState,
	action: TMatchContextReducerActions
) {
	switch (action.type) {
		case "SET_MATCH_ID":
			return {
				...state,
				matchId: action.payload
			} as IMatchContextState
		case "SET_CURRENT_TURN":
			return {
				...state,
				currentTurn: action.payload
			} as IMatchContextState
		case "SET_USER":
			if (action.field === "score" && action.payload === undefined) {
				return {
					...state,
					players: {
						...state.players,
						[action.user]: {
							...state.players[action.user],
							[action.field]: state.players[action.user].score + 1
						}
					}
				} as IMatchContextState
			}
			return {
				...state,
				players: {
					...state.players,
					[action.user]: {
						...state.players[action.user],
						[action.field]: action.payload
					}
				}
			} as IMatchContextState
		case "SET_USER_NUMBER":
			return {
				...state,
				userNumber: action.payload
			} as IMatchContextState
	}
}
