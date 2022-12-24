import { ILoginState, IRegisterState } from "./types"

export const DEFAULT_LOGIN_STATE: ILoginState = {
	form: {
		username: "",
		password: ""
	},
	error: false,
	loading: false,
	isPasswordVisible: false
}

export const DEFAULT_REGISTER_STATE: IRegisterState = {
	form: {
		username: "",
		password: ""
	},
	error: null,
	loading: false,
	isPasswordVisible: false,
	invalidFields: {
		username: false,
		password: false
	}
}
