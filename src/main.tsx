import {
	Routes,
	Route,
	BrowserRouter,
	Outlet,
	Navigate
} from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import ReactDOM from "react-dom/client"
import React from "react"

import { Navbar } from "./components/Navbar/Navbar"
import { Auth, Match, MatchList } from "./pages"
import App from "./App"

import "./index.css"
import { MatchProvider } from "./context/MatchContext/MatchContext"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider>
			<BrowserRouter>
				<Routes>
					<Route path="*" element={<Navigate to="/matches" />} />
					<Route path="/" element={<App />}>
						<Route path="matches" element={<Outlet />}>
							<Route index element={<MatchList />} />
							<Route
								path=":matchId"
								element={
									<MatchProvider>
										<Match />
									</MatchProvider>
								}
							/>
						</Route>
						<Route path="auth" element={<Auth />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>
)
