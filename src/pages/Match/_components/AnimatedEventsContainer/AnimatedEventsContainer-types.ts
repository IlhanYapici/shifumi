import { Dispatch } from "react"

import { IMatchState, TMatchReducerActions } from "../../Match-types"

export interface IAnimatedEventsContainerProps {
	matchState: IMatchState
	dispatchMatchState: Dispatch<TMatchReducerActions>
}
