import React, { useEffect, useState } from "react"
import { Divider, Grid } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

import { Header, IMatch, MatchCard, NewMatch } from "../../components"
import { getMatchList } from "../../utils/api/api"

export function MatchList() {
	const [matchList, setMatchList] = useState<IMatch[]>([])

	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem("token")

		if (token === null) {
			navigate("/auth")
			return
		}

		const fetchMatchList = async () => {
			await getMatchList({
				token,
				resCallback: (data) => {
					setMatchList(data)
					console.log(data)
				}
			})
		}

		fetchMatchList()

		const id = setInterval(() => fetchMatchList(), 10000)
		return () => {
			const controller = new AbortController()
			controller.abort()
			clearInterval(id)
		}
	}, [])

	return (
		<>
			<Header />
			<NewMatch key="new-match-button" />
			<Grid
				key="match-list"
				className="match-list-container"
				w="fit-content"
				m="0 auto"
				pt="100px"
				pb="75px"
				gap="2rem"
			>
				{matchList.map((match, i, arr) => {
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
		</>
	)
}
