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
		case "SET_FINISHED":
			return {
				...state,
				matchList: {
					...state.matchList,
					finished: action.payload
				}
			} as IMatchListState
		case "SET_ONGOING":
			return {
				...state,
				matchList: {
					...state.matchList,
					ongoing: action.payload
				}
			} as IMatchListState
	}
}
