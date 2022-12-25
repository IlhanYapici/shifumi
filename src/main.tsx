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

import { Auth, Login, Register, Match, MatchList } from "./pages"
import App from "./App"

import "./index.css"
import { MatchProvider } from "./context/MatchContext/MatchContext"
import { UserProvider } from "./context/UserContext/UserContext"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider>
			<UserProvider>
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
						</Route>
						<Route path="/auth" element={<Auth />}>
							<Route path="*" element={<Navigate to="login" />} />
							<Route index element={<Navigate to="login" />} />
							<Route path="login" element={<Login />} />
							<Route path="register" element={<Register />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</UserProvider>
		</ChakraProvider>
	</React.StrictMode>
)
