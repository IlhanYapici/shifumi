import { GiRock as LogoIcon } from "react-icons/gi"
import { Box, Text } from "@chakra-ui/react"

import "./Logo-styles.css"

export function Logo() {
	return (
		<Box
			className="logo-container"
			display="flex"
			gap="0.2rem"
			alignItems="center"
		>
			<Text fontFamily="Anton" fontSize="4xl">
				SHIFUMI
			</Text>
			<LogoIcon />
		</Box>
	)
}
