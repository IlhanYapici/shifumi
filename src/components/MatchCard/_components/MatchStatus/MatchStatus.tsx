import {
	Badge,
	Box,
	Button,
	CardBody,
	CardFooter,
	CardHeader,
	Grid,
	Spinner,
	Text,
	Tooltip,
	useColorModeValue
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

import { IMatch, TMatchStatus } from "../../MatchCard-types"
import { PulseBadge } from "../../../PulseBadge/PulseBadge"
import { EChakraColor } from "../../../PulseBadge/PulseBadge-types"
import {
	capitalize,
	getMatchStatus,
	getScores
} from "../../../../utils/misc/misc"
import { BoxWithBgColor } from "../../../BoxWithBgColor/BoxWithBgColor"

export function MatchStatus({ match }: { match: IMatch }) {
	const navigate = useNavigate()

	const matchStatus: TMatchStatus = getMatchStatus(match)
	const scores = getScores(match.turns)

	const joinMatch = () => {
		navigate(`/matches/${match._id}`)
	}

	return (
		<Box position="absolute" w="100%">
			<CardHeader display="flex" alignItems="center" gap="0.5rem">
				{matchStatus !== "finished" && (
					<PulseBadge
						color={
							matchStatus === "ongoing"
								? EChakraColor.RED
								: EChakraColor.WHATSAPP
						}
					/>
				)}
				<Badge
					colorScheme={
						matchStatus === "finished"
							? "linkedin"
							: matchStatus === "ongoing"
							? "red"
							: "whatsapp"
					}
					userSelect="none"
				>
					{capitalize(getMatchStatus(match))}
				</Badge>
			</CardHeader>
			<CardBody display="flex" alignItems="center" position="relative">
				<Grid
					zIndex={2}
					templateColumns="repeat(3, 1fr)"
					justifyItems="center"
					alignItems="center"
					w="100%"
					backgroundColor={useColorModeValue("gray.100", "gray.800")}
					overflow="hidden"
					borderRadius="0.6rem"
				>
					{match.user1 ? (
						<Box
							zIndex="3"
							display="flex"
							gap="1.15rem"
							justifySelf="flex-start"
							position="relative"
							alignItems="center"
						>
							<Box
								backgroundColor="whatsapp.500"
								padding="0.25rem 0.5rem"
								borderRadius="0.6rem"
								color="white"
								display="flex"
								alignItems="center"
								gap="1rem"
								filter={useColorModeValue(
									"drop-shadow(0px 0px 10px #BFBFBF)",
									"drop-shadow(0px 0px 10px #0A0A0A)"
								)}
							>
								<Text textTransform="uppercase">{match.user1.username}</Text>
								<Text fontSize="2rem">{scores.user1}</Text>
							</Box>
						</Box>
					) : (
						<Spinner />
					)}
					<BoxWithBgColor
						color={useColorModeValue("black", "white")}
						userSelect="none"
						fontSize="2rem"
						letterSpacing="1"
						fontWeight="bold"
						backgroundColor={useColorModeValue("gray.50", "gray.900")}
						borderRadius="0.6rem"
						p="0.25rem 0.75rem"
						filter={useColorModeValue(
							"drop-shadow(0px 0px 10px #BFBFBF)",
							"drop-shadow(0px 0px 10px #0A0A0A)"
						)}
					>
						<Text>VS</Text>
					</BoxWithBgColor>
					{match.user2 ? (
						<Box
							zIndex="3"
							display="flex"
							gap="1.15rem"
							justifySelf="flex-end"
							alignItems="center"
							position="relative"
						>
							<Box
								backgroundColor="orange.500"
								padding="0.25rem 0.5rem"
								borderRadius="0.6rem"
								color="white"
								display="flex"
								alignItems="center"
								gap="1rem"
								filter={useColorModeValue(
									"drop-shadow(0px 0px 10px #BFBFBF)",
									"drop-shadow(0px -5px 10px #0A0A0A)"
								)}
							>
								<Text fontSize="2rem">{scores.user2}</Text>
								<Text textTransform="uppercase">{match.user2.username}</Text>
							</Box>
						</Box>
					) : (
						<Spinner size="lg" thickness="0.2rem" speed="0.6s" />
					)}
				</Grid>
			</CardBody>
			<CardFooter>
				<Tooltip
					label={
						matchStatus === "finished" ? "The match is finished." : undefined
					}
				>
					<Button
						disabled={matchStatus === "finished" ? true : false}
						ml="auto"
						colorScheme="linkedin"
						variant="ghost"
						onClick={joinMatch}
					>
						Play
					</Button>
				</Tooltip>
			</CardFooter>
		</Box>
	)
}
