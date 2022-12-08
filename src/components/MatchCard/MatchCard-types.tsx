export interface IMatchCardProps {
	match: IMatch
}

export interface IMatch {
	user1: IUser | null
	user2: IUser | null
	turns: []
	_id: string
}

export interface IUser {
	_id: string
	username: string
}
