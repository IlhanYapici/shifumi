import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import ReactDOM from "react-dom/client"
import React from "react"

import App from "./App"

import "./index.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>
)
