import { useNavigate, Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"

import "./App.css"

function App() {
	const navigate = useNavigate()
	const location = useLocation()

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (token === null) {
			navigate("/auth")
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
