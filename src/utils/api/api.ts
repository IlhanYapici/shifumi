import axios from "axios"

import {
	IGetMatchListParams,
	IGetMatchParams,
	ILoginParams,
	IMoveParams,
	IRegisterParams,
	IRequestMatchParams
} from "./api-types"

export async function getMatch(params: IGetMatchParams) {
	const { matchId, token, resCallback, errCallback } = params

	const res = await axios
		.get(`${import.meta.env.VITE_API_URL}/matches/${matchId}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((res) => {
			if (resCallback) {
				resCallback(res.data)
			}

			return res
		})
		.catch((err) => {
			if (errCallback) {
				errCallback(err)
			} else {
				console.error(err)
			}

			return err
		})

	return res.data
}

export async function getMatchList(params: IGetMatchListParams) {
	const { token, resCallback, errCallback } = params

	const res = await axios
		.get(`${import.meta.env.VITE_API_URL}/matches`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((res) => {
			if (resCallback) {
				resCallback(res.data)
			}

			return res
		})
		.catch((err) => {
			if (errCallback) {
				errCallback(err)
			} else {
				console.error(err)
			}

			return err
		})

	return res.data as any[]
}

export async function requestNewMatch(params: IRequestMatchParams) {
	const { token, resCallback, errCallback } = params

	const res = await axios
		.post(`${import.meta.env.VITE_API_URL}/matches`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then((res) => {
			if (resCallback) {
				resCallback(res.data)
			}

			return res
		})
		.catch((err) => {
			if (errCallback) {
				errCallback(err)
			} else {
				console.error(err)
			}

			return err
		})

	return res.data
}

export async function registerUser(params: IRegisterParams) {
	const { username, password, resCallback, errCallback } = params

	const res = await axios
		.post(`${import.meta.env.VITE_API_URL}/register`, {
			username,
			password
		})
		.then((res) => {
			if (resCallback) {
				resCallback(res.data)
			}

			return res
		})
		.catch((err) => {
			if (errCallback) {
				errCallback(err)
			} else {
				console.error(err)
			}

			return err
		})

	return res.data
}

export async function loginUser(params: ILoginParams) {
	const { username, password, resCallback, errCallback } = params

	const res = await axios
		.post(`${import.meta.env.VITE_API_URL}/login`, {
			username,
			password
		})
		.then((res) => {
			if (resCallback) {
				resCallback(res.data)
			}

			return res
		})
		.catch((err) => {
			if (errCallback) {
				errCallback(err)
			} else {
				console.error(err)
			}

			return err
		})

	return res.data
}

export async function move(params: IMoveParams) {
	const { token, matchId, turnId, move, resCallback, errCallback } = params

	const res = await axios
		.post(
			`${import.meta.env.VITE_API_URL}/matches/${matchId}/turns/${turnId}`,
			{ move },
			{
				headers: {
					Authorization: `Bearer ${token}`
				}
			}
		)
		.then((res) => {
			if (resCallback) {
				resCallback(res.data)
			}

			return res
		})
		.catch((err) => {
			if (errCallback) {
				errCallback(err)
			} else {
				console.error(err)
			}

			return err
		})

	return res.data
}
