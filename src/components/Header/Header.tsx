import {
	Box,
	Divider,
	IconButton,
	Text,
	Tooltip,
	useColorModeValue
} from "@chakra-ui/react"
import { AiOutlineLogout as LogoutIcon } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

import { useUserContext } from "../../context/UserContext/UserContext"
import { ThemeButton } from "../ThemeButton/ThemeButton"
import { IHeaderProps } from "./Header-types"

export function Header(props: IHeaderProps) {
	const { matchList } = props

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
			p="0 1rem"
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
			<Text fontFamily="Anton" fontSize="4xl">
				SHIFUMI
			</Text>
			<Box display="flex" gap="1rem" alignItems="center">
				<Text fontWeight="bold" textTransform="uppercase">
					{username}
				</Text>
				<Divider orientation="vertical" h="2rem" />
				<ThemeButton />
				<Tooltip label="Logout">
					<IconButton
						aria-label="logout button"
						icon={<LogoutIcon />}
						colorScheme="red"
						fontSize="1.25rem"
						borderRadius="50%"
						variant="solid"
						onClick={logout}
					/>
				</Tooltip>
			</Box>
		</Box>
	)
}
