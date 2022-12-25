import { Grid, Text } from "@chakra-ui/react"
import { useContext } from "react"

import { MatchContext } from "../../../../context/MatchContext/MatchContext"
import { BoxWithBgColor } from "../../../../components"

export function ScoreBar() {
	const {
		matchContext: { players }
	} = useContext(MatchContext)

	return (
		<Grid
			w="100%"
			borderBottom="0.2rem solid"
			borderColor="linkedin.500"
			templateColumns="1fr auto 1fr"
			justifyItems="center"
			alignItems="center"
		>
			<BoxWithBgColor fontSize="1.2rem">
				{players.user1.username.toUpperCase()}
			</BoxWithBgColor>
			<Grid
				templateColumns="repeat(3, 1fr)"
				w="6rem"
				m="0 auto"
				h="50px"
				display="flex"
				flexDir="row"
				justifyContent="space-evenly"
				alignItems="center"
				backgroundColor="linkedin.500"
				color="#fff"
				fontSize="1.5rem"
				fontWeight="bold"
			>
				<Text userSelect="none">{players.user1.score}</Text>
				<Text userSelect="none">-</Text>
				<Text userSelect="none">{players.user2.score}</Text>
			</Grid>
			<BoxWithBgColor fontSize="1.2rem">
				{players.user2.username.toUpperCase()}
			</BoxWithBgColor>
		</Grid>
	)
}
