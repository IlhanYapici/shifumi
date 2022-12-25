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

	const textColors = useColorModeValue("black", "white")
	const versusBgColors = useColorModeValue("gray.50", "gray.900")
	const gridBgColors = useColorModeValue("gray.100", "gray.800")
	const shadowColors = useColorModeValue(
		"drop-shadow(0px 0px 10px #BFBFBF)",
		"drop-shadow(0px 0px 10px #0A0A0A)"
	)

	const matchStatus: TMatchStatus = getMatchStatus({ match })
	const scores = getScores({ turns: match.turns })

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
					{capitalize(matchStatus)}
				</Badge>
			</CardHeader>
			<CardBody display="flex" alignItems="center" position="relative">
				<Grid
					zIndex={2}
					templateColumns="repeat(3, 1fr)"
					justifyItems="center"
					alignItems="center"
					w="100%"
					backgroundColor={gridBgColors}
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
							<Tooltip
								label={match.user1.username.toUpperCase()}
								placement="left"
								openDelay={250}
								hasArrow
							>
								<Box
									backgroundColor="whatsapp.500"
									padding="0.25rem 0.5rem"
									borderRadius="0.6rem"
									color="white"
									display="flex"
									alignItems="center"
									gap="1rem"
									w="131px"
									filter={shadowColors}
								>
									<Text noOfLines={1}>
										{match.user1.username.toUpperCase()}
									</Text>
									<Text fontSize="2rem">{scores.user1}</Text>
								</Box>
							</Tooltip>
						</Box>
					) : (
						<Spinner />
					)}
					<BoxWithBgColor
						color={textColors}
						userSelect="none"
						fontSize="2rem"
						letterSpacing="1"
						fontWeight="bold"
						backgroundColor={versusBgColors}
						borderRadius="0.6rem"
						p="0.25rem 0.75rem"
						filter={shadowColors}
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
							<Tooltip
								label={match.user2.username.toUpperCase()}
								placement="right"
								openDelay={250}
								hasArrow
							>
								<Box
									backgroundColor="orange.500"
									padding="0.25rem 0.5rem"
									borderRadius="0.6rem"
									color="white"
									display="flex"
									alignItems="center"
									gap="1rem"
									w="131px"
									filter={shadowColors}
								>
									<Text fontSize="2rem">{scores.user2}</Text>
									<Text noOfLines={1}>
										{match.user2.username.toUpperCase()}
									</Text>
								</Box>
							</Tooltip>
						</Box>
					) : (
						<Spinner size="lg" thickness="0.2rem" speed="0.6s" />
					)}
				</Grid>
			</CardBody>
			{matchStatus !== "finished" && (
				<CardFooter>
					<Button
						disabled={matchStatus === "ongoing" ? false : true}
						ml="auto"
						colorScheme="linkedin"
						variant="ghost"
						onClick={joinMatch}
					>
						Play
					</Button>
				</CardFooter>
			)}
		</Box>
	)
}
