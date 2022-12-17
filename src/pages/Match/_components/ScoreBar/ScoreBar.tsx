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
			<BoxWithBgColor player={1} fontSize="1.2rem">
				{players[0].username}
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
				<Text userSelect="none">{players[0].score}</Text>
				<Text userSelect="none">-</Text>
				<Text userSelect="none">{players[1].score}</Text>
			</Grid>
			<BoxWithBgColor player={2} fontSize="1.2rem">
				{players[1].username}
			</BoxWithBgColor>
		</Grid>
	)
}
