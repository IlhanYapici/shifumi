import { IMatch } from "../../components"

export interface IMatchListState {
	loading: boolean
	tabIndex: number
	matchList: {
		finished: IMatch[]
		ongoing: IMatch[]
	}
}

export type TMatchListReducerActions =
	| {
			type: "SET_LOADING"
			payload: boolean
	  }
	| {
			type: "SET_TAB_INDEX"
			payload: number
	  }
	| {
			type: "SET_MATCH_LIST"
			field: "finished" | "ongoing"
			payload: IMatch[]
	  }
//TODO: split SET_MATCH_LIST to SET_FINISHED and SET_ONGOING
