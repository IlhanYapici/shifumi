import { ReactNode } from "react"

export interface IMatchProviderProps {
	children: ReactNode
}

export interface IMatchContext {
	matchContext: IMatchState
	setMatchContext: React.Dispatch<React.SetStateAction<IMatchState>>
	updateScore: (user: "user1" | "user2") => void
}

export interface IMatchState {
	matchId: string | null
	currentTurn: number
	players: {
		0: {
			username: string
			score: number
		}
		1: {
			username: string
			score: number
		}
	}
}
