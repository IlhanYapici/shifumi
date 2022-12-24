import {
	ILoginState,
	IRegisterState,
	TLoginReducerAction,
	TRegisterReducerAction
} from "./types"

export function loginReducer(state: ILoginState, action: TLoginReducerAction) {
	switch (action.type) {
		case "HANDLE_INPUT":
			return {
				...state,
				form: {
					...state.form,
					[action.field]: action.payload
				}
			} as ILoginState
		case "SET_ERROR":
			return {
				...state,
				error: action.payload
			} as ILoginState
		case "SET_LOADING":
			return {
				...state,
				loading: action.payload
			} as ILoginState
		case "TOGGLE_PASSWORD":
			return {
				...state,
				isPasswordVisible: !state.isPasswordVisible
			} as ILoginState
		default:
			return state
	}
}

export function registerReducer(
	state: IRegisterState,
	action: TRegisterReducerAction
) {
	switch (action.type) {
		case "HANDLE_INPUT":
			return {
				...state,
				form: {
					...state.form,
					[action.field]: action.payload
				}
			} as IRegisterState
		case "SET_ERROR":
			return {
				...state,
				error: action.payload
			} as IRegisterState
		case "SET_LOADING":
			return {
				...state,
				loading: action.payload
			} as IRegisterState
		case "SET_INVALID_FIELD":
			return {
				...state,
				invalidFields: {
					...state.invalidFields,
					[action.field]: action.payload
				}
			} as IRegisterState
		case "TOGGLE_PASSWORD":
			return {
				...state,
				isPasswordVisible: !state.isPasswordVisible
			} as IRegisterState
		default:
			return state
	}
}
