export type THandleChange = (
	field: "username" | "password",
	value: string
) => void

export interface IForm {
	username: string
	password: string
}

export interface ILoginState {
	form: IForm
	isPasswordVisible: boolean
	error: boolean
	loading: boolean
}

type TFormFields = "username" | "password"

export type TLoginReducerAction =
	| {
			type: "TOGGLE_PASSWORD"
	  }
	| {
			type: "SET_ERROR" | "SET_LOADING"
			payload: boolean
	  }
	| {
			type: "HANDLE_INPUT"
			field: TFormFields
			payload: string
	  }

interface IInvalidFields {
	username: boolean
	password: boolean
}

export interface IRegisterState extends Omit<ILoginState, "error"> {
	error: string | null
	invalidFields: IInvalidFields
}

export type TRegisterReducerAction =
	| {
			type: "TOGGLE_PASSWORD"
			field?: never
			payload?: never
	  }
	| {
			type: "SET_ERROR"
			field?: never
			payload: string | null
	  }
	| {
			type: "SET_LOADING"
			field?: never
			payload: boolean
	  }
	| {
			type: "SET_INVALID_FIELD"
			field: TFormFields
			payload: boolean
	  }
	| {
			type: "HANDLE_INPUT"
			field: TFormFields
			payload: string
	  }
