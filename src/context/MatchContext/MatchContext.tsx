import { createContext, useContext, useState } from "react"

import {
	IMatchProviderProps,
	IMatchState,
	IMatchContext
} from "./MatchContext-types"

export const MatchContext = createContext({} as IMatchContext)

export function MatchProvider({ children }: IMatchProviderProps) {
	const [matchContext, setMatchContext] = useState<IMatchState>({
		matchId: null,
		currentTurn: 1,
		players: {
			"0": { username: "", score: 0 },
			"1": { username: "", score: 0 }
		}
	})

	const updateScore = (user: "user1" | "user2") => {
		switch (user) {
			case "user1":
				setMatchContext((prevState) => ({
					...prevState,
					currentTurn: prevState.currentTurn + 1,
					players: {
						...prevState.players,
						"0": {
							...prevState.players[0],
							score: prevState.players[0].score + 1
						}
					}
				}))
				break
			case "user2":
				setMatchContext((prevState) => ({
					...prevState,
					currentTurn: prevState.currentTurn + 1,
					players: {
						...prevState.players,
						"1": {
							...prevState.players[1],
							score: prevState.players[1].score + 1
						}
					}
				}))
		}
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
