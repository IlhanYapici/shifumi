import { Box, Text, useColorModeValue } from "@chakra-ui/react"
import {
	FaHandRock as RockIcon,
	FaHandPaper as PaperIcon,
	FaHandScissors as ScissorsIcon
} from "react-icons/fa"

import { ITurn, IUser } from "../../MatchCard-types"
import { capitalize } from "../../../../utils/misc/misc"

export function getIcon(move: "rock" | "paper" | "scissors") {
	switch (move) {
		case "rock":
			return <RockIcon />
		case "paper":
			return <PaperIcon />
		case "scissors":
			return <ScissorsIcon />
	}
}

export function getHistoryBody(turns: ITurn[]) {
	let scoreHistory = { user1: 0, user2: 0 }

	return turns.map((turn, i) => (
		<Box
			key={i}
			display="grid"
			gridTemplateColumns="1fr auto 1fr"
			w="90%"
			backgroundColor={useColorModeValue("gray.100", "gray.800")}
			justifySelf="center"
			overflow="hidden"
			borderRadius="0.6rem"
		>
			<Box
				w="80%"
				display="flex"
				backgroundColor={
					turn.winner === "user1"
						? "whatsapp.500"
						: useColorModeValue("gray.100", "gray.800")
				}
				justifySelf="flex-start"
				justifyContent="center"
				alignItems="center"
				borderRightRadius="0.6rem"
				filter={useColorModeValue(
					"drop-shadow(0px 0px 10px #BFBFBF)",
					"drop-shadow(0px 0px 10px #0A0A0A)"
				)}
			>
				<Box
					className="user1-move"
					display="flex"
					justifyContent="center"
					alignItems="center"
					gap="0.75rem"
					color={
						turn.winner === "user1"
							? "white"
							: useColorModeValue("black", "white")
					}
					userSelect="none"
				>
					<Text>{capitalize(turn.user1)}</Text>
					{getIcon(turn.user1)}
				</Box>
			</Box>
			<Box
				w="fit-content"
				h="100%"
				backgroundColor={useColorModeValue("gray.50", "gray.900")}
				display="flex"
				alignSelf="center"
				justifySelf="center"
				justifyContent="center"
				alignItems="center"
				p="0 0.7rem"
				borderRadius="0.4rem"
				filter={useColorModeValue(
					"drop-shadow(0px 0px 10px #BFBFBF)",
					"drop-shadow(0px 0px 10px #0A0A0A)"
				)}
			>
				<Text fontWeight="bold" h="fit-content" w="fit-content">
					{turn.winner === "user1" ? ++scoreHistory.user1 : scoreHistory.user1}{" "}
					-{" "}
					{turn.winner === "user2" ? ++scoreHistory.user2 : scoreHistory.user2}
				</Text>
			</Box>
			<Box
				w="80%"
				display="flex"
				backgroundColor={
					turn.winner === "user2"
						? "orange.500"
						: useColorModeValue("gray.100", "gray.800")
				}
				justifySelf="flex-end"
				justifyContent="center"
				alignItems="center"
				borderLeftRadius="0.6rem"
				filter={useColorModeValue(
					"drop-shadow(0px 0px 10px #BFBFBF)",
					"drop-shadow(0px 0px 10px #0A0A0A)"
				)}
			>
				<Box
					className="user2-move"
					display="flex"
					justifyContent="center"
					alignItems="center"
					gap="0.75rem"
					color={
						turn.winner === "user2"
							? "white"
							: useColorModeValue("black", "white")
					}
					userSelect="none"
				>
					{getIcon(turn.user2)}
					<Text>{capitalize(turn.user2)}</Text>
				</Box>
			</Box>
		</Box>
	))
}

export function getHistoryFooter(winner: IUser | null) {
	return (
		<Box w="100%" textAlign="center" userSelect="none">
			{!winner && (
				<Text fontWeight="bold" fontSize="1.2rem">
					It's a draw !
				</Text>
			)}
			{winner && (
				<Text fontWeight="bold" fontSize="1.2rem">
					{winner.username.toUpperCase()} won !
				</Text>
			)}
		</Box>
	)
}
