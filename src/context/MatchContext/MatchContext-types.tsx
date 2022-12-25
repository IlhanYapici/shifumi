import { ReactNode } from "react"

export interface IMatchProviderProps {
	children: ReactNode
}

export interface IMatchContext {
	matchContext: IMatchState
	setMatchContext: React.Dispatch<React.SetStateAction<IMatchState>>
	updateScore: (params: IUpdateScoreParams) => void
}

export interface IMatchState {
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
