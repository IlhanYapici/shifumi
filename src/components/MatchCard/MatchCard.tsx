import { Box, Text, Button, Grid } from "@chakra-ui/react"
import { Loader } from "../Loader/Loader"
import { PulseBadge } from "../PulseBadge/PulseBadge"

import { IMatchCardProps } from "./MatchCard-types"

export function MatchCard(props: IMatchCardProps) {
	const { match } = props

	return (
		<Box
			className="match-card-container"
			h="15ch"
			w="60ch"
			position="relative"
			backgroundColor="gray.50"
			border="2px"
			borderColor="linkedin.50"
			borderRadius="0.5rem"
		>
			<PulseBadge status="close" />
			<Grid
				templateColumns="repeat(3, 1fr)"
				justifyItems="center"
				alignItems="center"
			>
				{match.user1 ? <Text>{match.user1.username}</Text> : <Loader />}
				<Text>VS</Text>
				{match.user2 ? <Text>{match.user2.username}</Text> : <Loader />}
			</Grid>
			<Button
				position="absolute"
				disabled
				bottom="0"
				right="0"
				colorScheme="linkedin"
			>
				Join
			</Button>
		</Box>
	)
}
