export interface IMatchCardProps {
	match: IMatch
}

export interface IMatch {
	winner: IUser | null
	user1: IUser | null
	user2: IUser | null
	turns: ITurn[]
	_id: string
}

export interface ITurn {
	user1: "rock" | "paper" | "scissors"
	user2: "rock" | "paper" | "scissors"
	winner: "user1" | "user2" | "draw"
}

export interface IUser {
	_id: string
	username: string
}

export type TMatchStatus = "open" | "ongoing" | "finished"
