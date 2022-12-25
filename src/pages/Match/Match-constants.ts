import { IMatchState } from "./Match-types"

export const DEFAULT_MATCH_STATE: IMatchState = {
	loading: true,
	controlsDisabled: false,
	displayAnimations: false,
	matchEnded: false,
	token: null,
	user1: null,
	user2: null
}
