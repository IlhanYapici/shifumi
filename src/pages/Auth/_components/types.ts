export interface ILoginForm {
	username: string
	password: string
}

export interface IRegisterForm {
	username: {
		isInvalid: boolean | undefined
		value: string
	}
	password: {
		isInvalid: boolean | undefined
		value: string
	}
}

export type THandleChange = (
	field: "username" | "password",
	value: string
) => void
