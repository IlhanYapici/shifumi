import { createContext, useContext, useState } from "react"

import {
	IMatchProviderProps,
	IMatchState,
	IMatchContext
} from "./MatchContext-types"

export const MatchContext = createContext({} as IMatchContext)

export function MatchProvider({ children }: IMatchProviderProps) {
	const [matchContext, setMatchContext] = useState<IMatchState>({
		currentTurn: 1,
		players: {
			"0": { username: "", score: 0 },
			"1": { username: "", score: 0 }
		}
	})

	const ctx: IMatchContext = {
		matchContext,
		setMatchContext
	}

	return <MatchContext.Provider value={ctx}>{children}</MatchContext.Provider>
}

export function useMatchContext() {
	return useContext(MatchContext)
}
