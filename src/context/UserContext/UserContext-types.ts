import { ReactNode } from "react"

export interface IUserProviderProps {
	children: ReactNode
}

export interface IUserState {
	username: string
}

export interface IUserContext {
	userContext: IUserState
	setUserContext: (userContext: IUserState) => void
}
