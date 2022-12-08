import { GiFist } from "react-icons/gi"
import { Box } from "@chakra-ui/react"

export function Logo() {
	return (
		<Box className="logo-container" display="flex" gap="0.2rem">
			<GiFist />
			<p>ShiFuMi</p>
		</Box>
	)
}
