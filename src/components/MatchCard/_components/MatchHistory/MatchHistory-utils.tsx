import { Box, Text } from "@chakra-ui/react"
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
	return turns.map((turn, i) => (
		<Box
			key={i}
			display="grid"
			gridTemplateColumns="1fr 1fr"
			w="90%"
			backgroundColor="gray.100"
			justifySelf="center"
			overflow="hidden"
			borderRadius="0.6rem"
		>
			<Box
				w="65%"
				display="flex"
				backgroundColor={turn.winner === "user1" ? "whatsapp.500" : "gray.100"}
				justifySelf="flex-start"
				justifyContent="center"
				alignItems="center"
				borderRightRadius="0.6rem"
				filter="drop-shadow(0px 0px 10px #BFBFBF)"
			>
				<Box
					className="user1-move"
					display="flex"
					justifyContent="center"
					alignItems="center"
					gap="0.75rem"
					color={turn.winner === "user1" ? "white" : "black"}
					userSelect="none"
				>
					<Text>{capitalize(turn.user1)}</Text>
					{getIcon(turn.user1)}
				</Box>
			</Box>
			<Box
				w="65%"
				display="flex"
				backgroundColor={turn.winner === "user2" ? "orange.500" : "gray.100"}
				justifySelf="flex-end"
				justifyContent="center"
				alignItems="center"
				borderLeftRadius="0.6rem"
				filter="drop-shadow(0px 0px 10px #BFBFBF)"
			>
				<Box
					className="user2-move"
					display="flex"
					justifyContent="center"
					alignItems="center"
					gap="0.75rem"
					color={turn.winner === "user2" ? "white" : "black"}
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
					{winner.username} won !
				</Text>
			)}
		</Box>
	)
}
