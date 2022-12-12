import { ReactNode } from "react"

export interface IMatchProviderProps {
	children: ReactNode
}

export interface IMatchContext {
	matchContext: IMatchState
	setMatchContext: React.Dispatch<React.SetStateAction<IMatchState>>
}

export interface IMatchState {
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
