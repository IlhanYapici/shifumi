import {
	Image,
	Text,
	Button,
	Grid,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Badge
} from "@chakra-ui/react"

import imgUrl from "../../assets/versus-icon.svg"
import { EChakraColor } from "../PulseBadge/PulseBadge-types"
import { PulseBadge } from "../PulseBadge/PulseBadge"
import { IMatchCardProps } from "./MatchCard-types"
import { Loader } from "../Loader/Loader"

import "./MatchCard-styles.css"

export function MatchCard(props: IMatchCardProps) {
	const { match } = props

	const getMatchStatus = (): "ongoing" | "open" => {
		if (match.user1 && match.user2) {
			return "ongoing"
		} else {
			return "open"
		}
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
					w="16rem"
					position="absolute"
					transform="translate(-50%, -50%)"
					top="50%"
					left="50%"
					opacity="0.3"
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
						<Text className="user1 username" color="white" userSelect="none">
							{match.user1.username}
						</Text>
					) : (
						<Loader />
					)}
					<Text
						userSelect="none"
						fontSize="2rem"
						letterSpacing="1"
						fontStyle="italic"
						fontWeight="bold"
					>
						VS
					</Text>
					{match.user2 ? (
						<Text className="user2 username" color="white" userSelect="none">
							{match.user2.username}
						</Text>
					) : (
						<Loader />
					)}
				</Grid>
			</CardBody>
			<CardFooter>
				<Button
					disabled={getMatchStatus() === "ongoing" ? true : false}
					ml="auto"
					colorScheme="linkedin"
					variant="ghost"
				>
					Join Match
				</Button>
			</CardFooter>
		</Card>
	)
}
