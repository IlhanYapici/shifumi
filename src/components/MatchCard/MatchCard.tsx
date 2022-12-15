import { useNavigate } from "react-router-dom"
import {
	Badge,
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Grid,
	Image,
	Spinner,
	Text,
	Tooltip
} from "@chakra-ui/react"

import { EChakraColor } from "../PulseBadge/PulseBadge-types"
import { getMatchStatus, getScores } from "../../utils/misc/misc"
import { PulseBadge } from "../PulseBadge/PulseBadge"
import { IMatchCardProps } from "./MatchCard-types"
import imgUrl from "../../assets/versus-icon.svg"
import { Username } from "../Username/Username"

import "./MatchCard-styles.css"

export function MatchCard(props: IMatchCardProps) {
	const { match } = props
	const navigate = useNavigate()

	const matchStatus = getMatchStatus(match)
	const scores = getScores(match.turns)

	const joinMatch = () => {
		navigate(`/matches/${match._id}`)
	}

	const capitalize = (str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1)
	}

	return (
		<Card
			className="match-card-container"
			position="relative"
			maxW="lg"
			w="lg"
			maxH="xs"
			h="xs"
		>
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
							? "gray"
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
				<Image
					src={imgUrl}
					zIndex={-1}
					w="16rem"
					position="absolute"
					transform="translate(-50%, -50%)"
					top="50%"
					left="50%"
					userSelect="none"
					draggable="false"
					opacity="0.25"
				/>
				<Grid
					templateColumns="repeat(3, 1fr)"
					justifyItems="center"
					alignItems="center"
					w="100%"
				>
					{match.user1 ? (
						<Box
							display="flex"
							gap="1.15rem"
							justifySelf="flex-end"
							position="relative"
							_before={{
								zIndex: -1,
								content: '""',
								position: "absolute",
								top: 0,
								left: "-0.5rem",
								width: "calc(100% + 1rem)",
								height: "100%",
								transform: "skew(-5deg)",
								backgroundColor: "whatsapp.500"
							}}
							alignItems="center"
						>
							<Username player={1}>{match.user1.username}</Username>
							<Username player={1} fontSize="2.5rem">
								{scores.user1}
							</Username>
						</Box>
					) : (
						<Spinner />
					)}
					<Text
						className="vs-text"
						color="black"
						userSelect="none"
						fontSize="2rem"
						letterSpacing="1"
						fontStyle="italic"
						fontWeight="bold"
					>
						VS
					</Text>
					{match.user2 ? (
						<Box
							display="flex"
							gap="1.15rem"
							justifySelf="flex-start"
							alignItems="center"
							position="relative"
							_before={{
								zIndex: -1,
								content: '""',
								position: "absolute",
								top: 0,
								left: "-0.5rem",
								width: "calc(100% + 1rem)",
								height: "100%",
								transform: "skew(-5deg)",
								backgroundColor: "orange.500"
							}}
						>
							<Username player={2} fontSize="2.5rem">
								{scores.user1}
							</Username>
							<Username player={2}>{match.user2.username}</Username>
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
		</Card>
	)
}
