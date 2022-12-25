import { ReactNode } from "react"

export interface IMatchProviderProps {
	children: ReactNode
}

export interface IMatchContext {
	matchContext: IMatchContextState
	setMatchContext: React.Dispatch<React.SetStateAction<IMatchContextState>>
	updateScore: (params: IUpdateScoreParams) => void
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

export interface IUpdateScoreParams {
	user: "user1" | "user2"
	newTurnId: number
}
