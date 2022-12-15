import { createContext, useContext, useState } from "react"

import {
	IUserContext,
	IUserProviderProps,
	IUserState
} from "./UserContext-types"

export const UserContext = createContext({} as IUserContext)

export function UserProvider({ children }: IUserProviderProps) {
	const [userContext, setUserContext] = useState<IUserState>({
		username: ""
	})

	const ctx: IUserContext = {
		userContext,
		setUserContext
	}

	return <UserContext.Provider value={ctx}>{children}</UserContext.Provider>
}

export function useUserContext() {
	return useContext(UserContext)
}
