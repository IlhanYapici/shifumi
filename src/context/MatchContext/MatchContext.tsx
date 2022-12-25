import { createContext, useContext, useState } from "react"

import {
	IMatchProviderProps,
	IMatchState,
	IMatchContext,
	IUpdateScoreParams
} from "./MatchContext-types"

export const MatchContext = createContext({} as IMatchContext)

export function MatchProvider({ children }: IMatchProviderProps) {
	const [matchContext, setMatchContext] = useState<IMatchState>({
		matchId: null,
		currentTurn: 1,
		players: {
			user1: { username: "", score: 0 },
			user2: { username: "", score: 0 }
		}
	})

	const updateScore = (params: IUpdateScoreParams) => {
		const { user, newTurnId } = params

		setMatchContext((prevState) => ({
			...prevState,
			currentTurn: newTurnId,
			players: {
				...prevState.players,
				[user]: {
					...prevState.players[user],
					score: prevState.players[user].score + 1
				}
			}
		}))
	}

	const ctx: IMatchContext = {
		matchContext,
		setMatchContext,
		updateScore
	}

	return <MatchContext.Provider value={ctx}>{children}</MatchContext.Provider>
}

export function useMatchContext() {
	return useContext(MatchContext)
}
