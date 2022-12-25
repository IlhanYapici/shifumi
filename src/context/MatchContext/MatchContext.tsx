import { createContext, useContext, useMemo, useReducer } from "react"

import {
	IMatchProviderProps,
	IMatchContext,
	IUpdateScoreParams
} from "./MatchContext-types"
import { matchContextReducer } from "./MatchContext-utils"
import { DEFAULT_MATCH_CONTEXT } from "./MatchContext-constants"

export const MatchContext = createContext({} as IMatchContext)

export function MatchProvider({ children }: IMatchProviderProps) {
	const [matchContext, dispatchMatchCtx] = useReducer(
		matchContextReducer,
		DEFAULT_MATCH_CONTEXT
	)

	const updateScore = (params: IUpdateScoreParams) => {
		const { user, newTurnId } = params

		dispatchMatchCtx({ type: "SET_CURRENT_TURN", payload: newTurnId })
		dispatchMatchCtx({ type: "SET_USER", user, field: "score" })
	}

	const ctx: IMatchContext = useMemo(
		() => ({
			matchContext,
			dispatchMatchCtx
		}),
		[matchContext, dispatchMatchCtx]
	)

	return <MatchContext.Provider value={ctx}>{children}</MatchContext.Provider>
}

export function useMatchContext() {
	return useContext(MatchContext)
}
