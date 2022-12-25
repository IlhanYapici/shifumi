import { AiOutlineLogout as LogoutIcon } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { memo } from "react"
import {
	Box,
	Button,
	Divider,
	IconButton,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Text,
	Tooltip,
	useColorModeValue
} from "@chakra-ui/react"

import { useUserContext } from "../../context/UserContext/UserContext"
import { ThemeButton } from "../ThemeButton/ThemeButton"
import { IHeaderProps } from "./Header-types"

function Header(props: IHeaderProps) {
	const { getStats } = props

	const navigate = useNavigate()
	const {
		userContext: { username }
	} = useUserContext()

	const stats = getStats()

	const logout = () => {
		localStorage.removeItem("token")
		navigate("/auth")
	}

	const containerBgColors = useColorModeValue("gray.50", "gray.900")
	const borderColors = useColorModeValue("white", "gray.800")
	const shadowColors = useColorModeValue(
		"drop-shadow(0px -5px 10px #BFBFBF)",
		"drop-shadow(0px -5px 10px #0A0A0A)"
	)

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
			backgroundColor={containerBgColors}
			filter={shadowColors}
			borderBottomColor={borderColors}
			borderBottomWidth="1px"
		>
			<Text fontFamily="Anton" fontSize="4xl">
				SHIFUMI
			</Text>
			<Box display="flex" gap="1rem" alignItems="center">
				<Popover>
					<PopoverTrigger>
						<Button fontWeight="bold">{username.toUpperCase()}</Button>
					</PopoverTrigger>
					<PopoverContent>
						<PopoverArrow />
						<PopoverCloseButton />
						<PopoverHeader fontWeight="bold">Stats</PopoverHeader>
						<PopoverBody display="grid" gridAutoRows="auto" gap="0.25rem">
							<Box display="flex" justifyContent="space-between">
								<Text>Matches finished:</Text>
								<Text>{stats.matchFinished}</Text>
							</Box>
							<Divider />
							<Box display="flex" justifyContent="space-between">
								<Text>Matches won:</Text>
								<Text>{stats.matchWon}</Text>
							</Box>
							<Divider />
							<Box display="flex" justifyContent="space-between">
								<Text>Matches lost:</Text>
								<Text>{stats.matchLost}</Text>
							</Box>
							<Divider />
							<Box display="flex" justifyContent="space-between">
								<Text>Win rate:</Text>
								<Text>{stats.winRate.toFixed(1)}%</Text>
							</Box>
						</PopoverBody>
					</PopoverContent>
				</Popover>
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

export default memo(Header)
