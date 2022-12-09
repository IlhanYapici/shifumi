import { Box } from "@chakra-ui/react"

import { Logo } from "../Logo/Logo"

export function Navbar() {
	return (
		<Box position="absolute" top="0" h="55px" w="100%">
			<Logo />
		</Box>
	)
}
