import {
	Badge,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Grid,
	Image,
	Spinner,
	Text
} from "@chakra-ui/react"

import { EChakraColor } from "../PulseBadge/PulseBadge-types"
import { IMatchCardProps } from "./MatchCard-types"
import { PulseBadge } from "../PulseBadge/PulseBadge"
import { Username } from "../Username/Username"

import imgUrl from "../../assets/versus-icon.svg"

import "./MatchCard-styles.css"
import { useNavigate } from "react-router-dom"

export function MatchCard(props: IMatchCardProps) {
	const { match } = props
	const navigate = useNavigate()

	const getMatchStatus = (): "open" | "ongoing" | "finished" => {
		if (match.user1 && match.user2) {
			if (match.turns.length >= 4) return "finished"

			return "ongoing"
		} else {
			return "open"
		}
	}

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
				<PulseBadge
					color={
						getMatchStatus() === "open"
							? EChakraColor.WHATSAPP
							: EChakraColor.RED
					}
				/>
				<Badge
					colorScheme={getMatchStatus() === "ongoing" ? "red" : "whatsapp"}
				>
					{capitalize(getMatchStatus())}
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
				/>
				<Grid
					templateColumns="repeat(3, 1fr)"
					justifyItems="center"
					alignItems="center"
					w="100%"
				>
					{match.user1 ? (
						<Username player={1}>{match.user1.username}</Username>
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
						<Username player={2}>{match.user2.username}</Username>
					) : (
						<Spinner size="lg" thickness="0.2rem" speed="0.6s" />
					)}
				</Grid>
			</CardBody>
			<CardFooter>
				<Button
					disabled={getMatchStatus() === "finished" ? true : false}
					ml="auto"
					colorScheme="linkedin"
					variant="ghost"
					onClick={joinMatch}
				>
					Play
				</Button>
			</CardFooter>
		</Card>
	)
}
