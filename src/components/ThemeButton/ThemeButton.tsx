import { BsSunFill as SunIcon, BsMoonFill as MoonIcon } from "react-icons/bs"
import {
	IconButton,
	useColorMode,
	useColorModeValue,
	Tooltip
} from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"

export function ThemeButton() {
	const { colorMode, toggleColorMode } = useColorMode()

	return (
		<AnimatePresence>
			<Tooltip label="Toggle theme">
				<IconButton
					aria-label="theme button"
					icon={
						colorMode === "dark" ? (
							<motion.div
								key="moonIcon"
								initial={{ opacity: 0, rotate: -180 }}
								animate={{ opacity: 1, rotate: 0 }}
								exit={{ opacity: 0, rotate: 180 }}
								transition={{ type: "spring", bounce: 0.4 }}
							>
								<MoonIcon />
							</motion.div>
						) : (
							<motion.div
								key="sunIcon"
								initial={{ opacity: 0, rotate: 180 }}
								animate={{ opacity: 1, rotate: 0 }}
								exit={{ opacity: 0, rotate: -180 }}
								transition={{ type: "spring", bounce: 0.4 }}
							>
								<SunIcon />
							</motion.div>
						)
					}
					onClick={toggleColorMode}
					color={useColorModeValue("black", "yellow.200")}
					borderRadius="50%"
					variant="outline"
				/>
			</Tooltip>
		</AnimatePresence>
	)
}
