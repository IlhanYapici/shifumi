import React, { useEffect, useState } from "react"
import { Divider, Grid } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import { IMatch, MatchCard, NewMatch } from "../../components"

export function MatchList() {
	const [matchList, setMatchList] = useState<IMatch[]>([])

	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem("token")

		if (token === null) {
			navigate("auth")
			return
		}

		const getMatchList = async () => {
			await axios
				.get(`${import.meta.env.VITE_API_URL}/matches`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then((res) => {
					setMatchList(res.data)
					console.log(res.data)
				})
				.catch((err) => console.error(err))
		}

		getMatchList()

		const id = setInterval(() => getMatchList(), 10000)
		return () => {
			const controller = new AbortController()
			controller.abort()
			clearInterval(id)
		}
	}, [])

	return (
		<>
			<NewMatch key="new-match-button" />
			<Grid
				key="match-list"
				className="match-list-container"
				w="fit-content"
				m="0 auto"
				pt="75px"
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
