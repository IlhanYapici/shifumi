import { Box, Image, useColorMode } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

import darkBgImg from "../../assets/auth-dark-wallpaper.jpg"
import lightBgImg from "../../assets/auth-light-wallpaper.jpg"

export function Auth() {
	const { colorMode } = useColorMode()

	return (
		<Box h="100%" w="100%" position="relative" display="flex">
			<Image
				h="100%"
				w="100%"
				position="absolute"
				top="0"
				left="0"
				backgroundImage={colorMode === "dark" ? darkBgImg : lightBgImg}
				backgroundSize="cover"
				backgroundPosition="top"
				filter="blur(0.5rem)"
			/>
			<Outlet />
		</Box>
	)
}
