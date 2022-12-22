import { MessageEvent, EventSourcePolyfill } from "event-source-polyfill"
import { Dispatch, SetStateAction } from "react"

import { IMatchState } from "../../context/MatchContext/MatchContext-types"

export interface IHandleEventsParams {
	events: MessageEvent
	sse: EventSourcePolyfill
	setControlsDisabled: Dispatch<SetStateAction<boolean>>
	token: string
	matchContext: IMatchState
	setMatchContext: Dispatch<SetStateAction<IMatchState>>
	updateScore: (user: "user1" | "user2") => void
}
