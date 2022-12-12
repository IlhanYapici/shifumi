import { Grid, Text } from "@chakra-ui/react"
import { useContext } from "react"

import { MatchContext } from "../../../../context/MatchContext/MatchContext"
import { Username } from "../../../../components"

export function ScoreBar() {
	const {
		matchContext: { players }
	} = useContext(MatchContext)

	return (
		<Grid
			w="100%"
			borderBottom="0.2rem solid #3182ce"
			templateColumns="1fr auto 1fr"
			justifyItems="center"
			alignItems="center"
		>
			<Username player={1} fontSize="1.2rem">
				{players[0].username}
			</Username>
			<Grid
				templateColumns="repeat(3, 1fr)"
				w="6rem"
				m="0 auto"
				h="50px"
				display="flex"
				flexDir="row"
				justifyContent="space-evenly"
				alignItems="center"
				backgroundColor="#3182ce"
				color="#fff"
				fontSize="1.5rem"
				fontWeight="bold"
			>
				<Text userSelect="none">{players[0].score}</Text>
				<Text userSelect="none">-</Text>
				<Text userSelect="none">{players[1].score}</Text>
			</Grid>
			<Username player={2} fontSize="1.2rem">
				{players[1].username}
			</Username>
		</Grid>
	)
}
