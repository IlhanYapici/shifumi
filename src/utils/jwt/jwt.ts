export function getUsernameFromJWT(token: string) {
	const base64Url = token.split(".")[1]
	const base64 = base64Url.replace("-", "+").replace("_", "/")

	return JSON.parse(window.atob(base64)).username
}

export function getDataFromJWT(token: string) {
	const base64Url = token.split(".")[1]
	const base64 = base64Url.replace("-", "+").replace("_", "/")

	return JSON.parse(window.atob(base64))
}
