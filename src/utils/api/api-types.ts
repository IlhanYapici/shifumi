export interface IGetMatchParams {
	matchId: string
	token: string
	resCallback?: (data: any) => void
	errCallback?: (error: any) => void
}

export interface IGetMatchListParams {
	token: string
	resCallback?: (data: any) => void
	errCallback?: (error: any) => void
}

export interface IRequestMatchParams {
	token: string
	resCallback?: (data: any) => void
	errCallback?: (error: any) => void
}

export interface IRegisterParams {
	username: string
	password: string
	resCallback?: (data: any) => void
	errCallback?: (error: any) => void
}

export interface ILoginParams extends IRegisterParams {}

export interface IMoveParams {
	token: string
	matchId: string
	turnId: string
	move: "rock" | "paper" | "scissors"
	resCallback?: (data: any) => void
	errCallback?: (error: any) => void
}
