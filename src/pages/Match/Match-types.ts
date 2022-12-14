import { MessageEvent, EventSourcePolyfill } from "event-source-polyfill"
import { Dispatch } from "react"

import {
	IMatchContextState,
	TMatchContextReducerActions
} from "../../context/MatchContext/MatchContext-types"

export interface IHandleEventsParams {
	events: MessageEvent
	sse: EventSourcePolyfill
	setControlsDisabled: (disabled: boolean) => void
	matchId: string
	token: string
	matchContext: IMatchContextState
	dispatchMatchState: Dispatch<TMatchReducerActions>
	dispatchMatchCtx: Dispatch<TMatchContextReducerActions>
}

type TMove = "rock" | "paper" | "scissors"

export interface IMatchState {
	loading: boolean
	controlsDisabled: boolean
	displayAnimations: boolean
	matchEnded: boolean
	token: string | null
	user1: TMove | null
	user2: TMove | null
}

export type TMatchReducerActions =
	| {
			type:
				| "SET_LOADING"
				| "SET_CONTROLS_DISABLED"
				| "SET_DISPLAY_ANIMATIONS"
				| "SET_MATCH_ENDED"
			payload: boolean
	  }
	| {
			type: "SET_TOKEN"
			payload: string | null
	  }
	| {
			type: "SET_PLAYER_MOVE"
			user: "user1" | "user2"
			payload: TMove
	  }
