import { IMatchListState, TMatchListReducerActions } from "./MatchList-types"

export function matchListReducer(
	state: IMatchListState,
	action: TMatchListReducerActions
) {
	switch (action.type) {
		case "SET_LOADING":
			return {
				...state,
				loading: action.payload
			} as IMatchListState
		case "SET_TAB_INDEX":
			return {
				...state,
				tabIndex: action.payload
			} as IMatchListState
		case "SET_MATCH_LIST":
			return {
				...state,
				matchList: {
					[action.field]: action.payload
				}
			} as IMatchListState
	}
}
