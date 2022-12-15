import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"

import { useUserContext } from "./context/UserContext/UserContext"
import { getUsernameFromJWT } from "./utils/jwt/jwt"

import "./App.css"

function App() {
	const {
		setUserContext,
		userContext: { username }
	} = useUserContext()
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (token === null) {
			navigate("/auth")
		} else if (token !== null && username === "") {
			setUserContext({ username: getUsernameFromJWT(token) })
		}
		if (location.pathname === "/") {
			navigate("/matches ")
		}
	}, [])

	return (
		<div className="App">
			<Outlet />
		</div>
	)
}

export default App
