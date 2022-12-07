import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect } from "react"

import { Auth } from "./pages"
import { Matches } from "./pages"

import "./App.css"

function App() {
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (token !== null) {
			navigate("/auth")
		} else {
			navigate("/matches")
		}
	}, [])

	return (
		<div className="App">
			<Routes>
				<Route path="/matches" element={<Matches />} />
				<Route path="/auth" element={<Auth />} />
			</Routes>
		</div>
	)
}

export default App
