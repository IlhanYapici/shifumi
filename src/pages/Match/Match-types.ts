import { MessageEvent, EventSourcePolyfill } from "event-source-polyfill"
import { NavigateFunction } from "react-router-dom"
import { Dispatch, SetStateAction } from "react"

import {
	IMatchState,
	IUpdateScoreParams
} from "../../context/MatchContext/MatchContext-types"

export interface IHandleEventsParams {
	events: MessageEvent
	sse: EventSourcePolyfill
	setControlsDisabled: Dispatch<SetStateAction<boolean>>
	token: string
	matchContext: IMatchState
	setMatchContext: Dispatch<SetStateAction<IMatchState>>
	updateScore: (params: IUpdateScoreParams) => void
	navigate: NavigateFunction
}
