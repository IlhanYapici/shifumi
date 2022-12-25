import { ReactNode, Dispatch } from "react"

export interface IMatchProviderProps {
	children: ReactNode
}

export interface IMatchContext {
	matchContext: IMatchContextState
	dispatchMatchCtx: Dispatch<TMatchContextReducerActions>
}

export interface IUpdateScoreParams {
	user: "user1" | "user2"
	newTurnId: number
}

export interface IMatchContextState {
	matchId: string | null
	currentTurn: number
	players: {
		user1: {
			username: string
			score: number
		}
		user2: {
			username: string
			score: number
		}
	}
}

// export interface IMatchContextReducerActions {
// 	type: "SET_MATCH_ID" | "SET_CURRENT_TURN" | "SET_USER"
// }

export type TMatchContextReducerActions =
	| {
			type: "SET_MATCH_ID"
			payload: string
	  }
	| {
			type: "SET_CURRENT_TURN"
			payload: number
	  }
	| {
			type: "SET_USER"
			user: "user1" | "user2"
			field: "username"
			payload: string
	  }
	| {
			type: "SET_USER"
			user: "user1" | "user2"
			field: "score"
			payload?: number
	  }
