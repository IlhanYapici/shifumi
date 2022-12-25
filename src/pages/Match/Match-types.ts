import { MessageEvent, EventSourcePolyfill } from "event-source-polyfill"
import { NavigateFunction } from "react-router-dom"
import { Dispatch, SetStateAction } from "react"

import {
	IMatchContextState,
	IUpdateScoreParams
} from "../../context/MatchContext/MatchContext-types"

export interface IHandleEventsParams {
	events: MessageEvent
	sse: EventSourcePolyfill
	setControlsDisabled: (disabled: boolean) => void
	token: string
	matchContext: IMatchContextState
	setMatchContext: Dispatch<SetStateAction<IMatchContextState>>
	updateScore: (params: IUpdateScoreParams) => void
	navigate: NavigateFunction
}

type TMove = "rock" | "paper" | "scissors"

export interface IMatchState {
	loading: boolean
	controlsDisabled: boolean
	token: string | null
	player1: TMove | null
	player2: TMove | null
}

export type TMatchReducerActions =
	| {
			type: "SET_LOADING" | "SET_CONTROLS_DISABLED"
			payload: boolean
	  }
	| {
			type: "SET_TOKEN"
			payload: string | null
	  }
	| {
			type: "SET_PLAYER_MOVE"
			player: "player1" | "player2"
			payload: TMove
	  }
