import React from "react"
import { Grid, Divider, Spinner, Center } from "@chakra-ui/react"

import { MatchCard } from "../../../../components"
import { IListProps } from "./List-types"

export function List(props: IListProps) {
	const { matchList, loading } = props

	const reversedMatchList = matchList.slice(0).reverse()

	return (
		<Grid
			key="match-list"
			className="match-list-container"
			w="100%"
			maxW="512px"
			m="0 auto"
			pt="1rem"
			gap="2rem"
		>
			{loading && (
				<Center position="absolute" w="100%" h="100%">
					<Spinner size="lg" />
				</Center>
			)}
			{reversedMatchList.map((match, i, arr) => {
				if (i < arr.length - 1) {
					return (
						<React.Fragment key={i + "-fragment"}>
							<MatchCard key={match._id} match={match} />
							<Divider key={i + "-divider"} />
						</React.Fragment>
					)
				} else {
					return <MatchCard key={match._id} match={match} />
				}
			})}
		</Grid>
	)
}
