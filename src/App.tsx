import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect } from "react"

import { Navbar } from "./components/Navbar/Navbar"
import { Auth, Matches } from "./pages"

import "./App.css"

function App() {
	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem("token")
		if (token !== null) {
			navigate("/matches")
		} else {
			navigate("/auth")
		}
	}, [])

	return (
		<div className="App">
			<Navbar />
			<Routes>
				<Route path="/matches" element={<Matches />} />
				<Route path="/auth" element={<Auth />} />
			</Routes>
		</div>
	)
}

export default App
