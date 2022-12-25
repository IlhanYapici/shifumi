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
			type: "SET_FINISHED"
			payload: IMatch[]
	  }
	| {
			type: "SET_ONGOING"
			payload: IMatch[]
	  }
