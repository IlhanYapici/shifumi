import {
	Box,
	IconButton,
	Text,
	Tooltip,
	useColorModeValue
} from "@chakra-ui/react"
import { AiOutlineLogout as LogoutIcon } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

import { useUserContext } from "../../context/UserContext/UserContext"
import { Logo } from "../Logo/Logo"

export function Header() {
	const navigate = useNavigate()
	const {
		userContext: { username }
	} = useUserContext()

	const logout = () => {
		localStorage.removeItem("token")
		navigate("/auth")
	}

	return (
		<Box
			zIndex={10}
			position="fixed"
			top="0"
			h="55px"
			w="100%"
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			backgroundColor={useColorModeValue("gray.50", "gray.900")}
			filter={useColorModeValue(
				"drop-shadow(0px -5px 10px #BFBFBF)",
				"drop-shadow(0px -5px 10px #0A0A0A)"
			)}
			borderBottomColor={useColorModeValue("white", "gray.800")}
			borderBottomWidth="1px"
		>
			<Logo />
			<Box display="flex" gap="1rem" pr="0.75rem">
				<Box display="flex" gap="0.75rem" alignItems="center">
					<Text>Connected as :</Text>
					<Text fontWeight="bold">{username}</Text>
				</Box>
				<Tooltip label="Logout">
					<IconButton
						aria-label="logout button"
						variant="ghost"
						icon={<LogoutIcon />}
						colorScheme="red"
						size="lg"
						fontSize="1.5rem"
						borderRadius="50%"
						onClick={() => logout()}
					/>
				</Tooltip>
			</Box>
		</Box>
	)
}
