import {
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Grid,
	Text,
	useColorModeValue
} from "@chakra-ui/react"

import { IMatchHistoryProps } from "./MatchHistory-types"
import { getHistoryBody, getHistoryFooter } from "./MatchHistory-utils"

import "./MatchHistory-styles.css"

export function MatchHistory(props: IMatchHistoryProps) {
	const { match } = props
	const { turns, user1, user2, winner } = match

	return (
		<>
			<CardHeader
				zIndex="5"
				textAlign="center"
				h="67px"
				backgroundColor={useColorModeValue("gray.50", "gray.900")}
			>
				<Grid templateColumns="1fr 197px 1fr" p="0 5%">
					<Text
						justifySelf="center"
						alignSelf="center"
						userSelect="none"
						fontSize="1.1rem"
						textTransform="uppercase"
						fontWeight="bold"
					>
						{user1?.username}
					</Text>
					<Text
						justifySelf="center"
						alignSelf="center"
						userSelect="none"
						fontSize="0.9rem"
						letterSpacing="1"
					>
						VS
					</Text>
					<Text
						justifySelf="center"
						alignSelf="center"
						userSelect="none"
						fontSize="1.1rem"
						textTransform="uppercase"
						fontWeight="bold"
					>
						{user2?.username}
					</Text>
				</Grid>
				<Divider w="90%" m="0 auto" />
			</CardHeader>
			<CardBody
				zIndex="5"
				display="grid"
				gridAutoRows="auto"
				gap="1rem"
				h="182px"
				backgroundColor={useColorModeValue("gray.50", "gray.900")}
			>
				{getHistoryBody(turns)}
			</CardBody>
			<CardFooter
				zIndex="5"
				h="69px"
				backgroundColor={useColorModeValue("gray.50", "gray.900")}
			>
				{getHistoryFooter(winner)}
			</CardFooter>
		</>
	)
}
