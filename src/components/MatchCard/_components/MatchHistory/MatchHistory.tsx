import {
	Badge,
	Box,
	Button,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Grid,
	IconButton,
	Image,
	Spinner,
	Text,
	Tooltip
} from "@chakra-ui/react"

import { IMatchHistoryProps } from "./MatchHistory-types"
import { getHistoryBody, getHistoryFooter } from "./MatchHistory-utils"

import "./MatchHistory-styles.css"

export function MatchHistory(props: IMatchHistoryProps) {
	const { match } = props
	const { turns, user1, user2, winner } = match

	return (
		<>
			<CardHeader textAlign="center" h="67px">
				<Grid templateColumns="1fr 148px 1fr" p="0 5%">
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
						fontStyle="italic"
						fontWeight="bold"
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
				<Divider w="90%" />
			</CardHeader>
			<CardBody display="grid" gridAutoRows="auto" gap="1rem" h="182px">
				{getHistoryBody(turns)}
			</CardBody>
			<CardFooter h="69px">{getHistoryFooter(winner)}</CardFooter>
		</>
	)
}
