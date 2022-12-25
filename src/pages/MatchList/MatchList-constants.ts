import { IMatchListState } from "./MatchList-types"

export const DEFAULT_MATCH_LIST_STATE: IMatchListState = {
	loading: true,
	tabIndex: 0,
	matchList: {
		finished: [],
		ongoing: []
	}
}
