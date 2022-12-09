import { useNavigate, Outlet } from "react-router-dom"
import { useEffect } from "react"

import "./App.css"

function App() {
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (token === null) {
			navigate("/auth")
		}
	}, [])

	return (
		<div className="App">
			<Outlet />
		</div>
	)
}

export default App
