import { IMatchContextState } from "./MatchContext-types"

export const DEFAULT_MATCH_CONTEXT: IMatchContextState = {
	matchId: null,
	currentTurn: 1,
	userNumber: null,
	players: {
		user1: { username: "", score: 0 },
		user2: { username: "", score: 0 }
	}
}
