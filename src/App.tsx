import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"

import { useUserContext } from "./context/UserContext/UserContext"
import { getUsernameFromJWT } from "./utils/jwt/jwt"

import "./App.css"
import { AnimatePresence } from "framer-motion"

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
			navigate("/auth/login")
		} else if (username === "") {
			setUserContext({ username: getUsernameFromJWT(token) })
		}

		if (location.pathname === "/") {
			navigate("/matches ")
		}
	}, [])

	return (
		<div className="App">
			<AnimatePresence>
				<Outlet />
			</AnimatePresence>
		</div>
	)
}

export default App
