import { createContext, useContext, useMemo, useReducer } from "react"

import { IMatchProviderProps, IMatchContext } from "./MatchContext-types"
import { DEFAULT_MATCH_CONTEXT } from "./MatchContext-constants"
import { matchContextReducer } from "./MatchContext-utils"

export const MatchContext = createContext({} as IMatchContext)

export function MatchProvider({ children }: IMatchProviderProps) {
	const [matchContext, dispatchMatchCtx] = useReducer(
		matchContextReducer,
		DEFAULT_MATCH_CONTEXT
	)

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
