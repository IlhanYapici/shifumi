import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import ReactDOM from "react-dom/client"
import React from "react"

import { Navbar } from "./components/Navbar/Navbar"
import { Auth, Match, MatchList } from "./pages"
import App from "./App"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<App />}>
						<Route path="matches" element={<Outlet />}>
							<Route index element={<MatchList />} />
							<Route path=":matchId" element={<Match />} />
						</Route>
						<Route path="auth" element={<Auth />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>
)
