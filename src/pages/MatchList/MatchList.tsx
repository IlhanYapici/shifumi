import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react"
import { useEffect, useReducer, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import { getMatchStatus, useForceUpdate } from "../../utils/misc/misc"
import { IMatch, NewMatch, NotFound } from "../../components"
import Header from "../../components/Header/Header"
import { getMatchList } from "../../utils/api/api"
import { List } from "./_components/List/List"
import { matchListReducer } from "./MatchList-utils"
import { DEFAULT_MATCH_LIST_STATE } from "./MatchList-constants"
import { IStats } from "../../components/Header/Header-types"
import { useUserContext } from "../../context/UserContext/UserContext"

export function MatchList() {
	const { userContext } = useUserContext()
	const navigate = useNavigate()
	const forceUpdate = useForceUpdate()
	const [matchListState, dispatch] = useReducer(
		matchListReducer,
		DEFAULT_MATCH_LIST_STATE
	)

	const getStats = useCallback(() => {
		const finishedMatches = matchListState.matchList.finished

		let stats: IStats = {
			matchFinished: finishedMatches.length,
			matchWon: 0,
			matchLost: 0,
			winRate: 0
		}

		finishedMatches.forEach((match) => {
			if (match.winner) {
				if (userContext.username === match.winner!.username) {
					stats.matchWon++
				} else if (userContext.username !== match.winner!.username) {
					stats.matchLost++
				}
			}
		})

		if (stats.matchWon > 0) {
			stats.winRate = (stats.matchWon / stats.matchFinished) * 100
		}

		return stats
	}, [matchListState.matchList.finished])

	useEffect(() => {
		const token = localStorage.getItem("token")

		if (token === null) {
			navigate("/auth")
			return
		}

		const fetchMatchList = async () => {
			await getMatchList({
				token,
				resCallback: (data: IMatch[]) => {
					let finished: IMatch[] = []
					let ongoing: IMatch[] = []

					data.forEach((match) => {
						if (getMatchStatus({ match }) === "finished") {
							finished.push(match)
						} else {
							ongoing.push(match)
						}
					})

					dispatch({
						type: "SET_FINISHED",
						payload: finished
					})
					dispatch({
						type: "SET_ONGOING",
						payload: ongoing
					})
					dispatch({ type: "SET_LOADING", payload: false })
				}
			})
		}

		fetchMatchList()

		return () => {
			const controller = new AbortController()
			controller.abort()
		}
	}, [])

	return (
		<motion.div
			key="matchListPage"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<Header getStats={getStats} />
			<NewMatch
				key="join-match-button"
				setTabIndex={(index) =>
					dispatch({ type: "SET_TAB_INDEX", payload: index })
				}
				forceUpdate={forceUpdate}
			/>
			<Tabs
				index={matchListState.tabIndex}
				onChange={(index) =>
					dispatch({ type: "SET_TAB_INDEX", payload: index })
				}
				position="fixed"
				w="100%"
				h="calc(100% - 55px)"
				mt="55px"
				isFitted
				variant="line"
				isLazy
			>
				<TabList>
					<Tab>Ongoing</Tab>
					<Tab>Finished</Tab>
				</TabList>
				<TabPanels h="100%" overflowX="hidden" overflowY="scroll">
					<TabPanel h="100%">
						{matchListState.matchList.ongoing.length === 0 &&
						matchListState.loading === false ? (
							<NotFound />
						) : (
							<List
								name="ongoingMatchList"
								matchList={matchListState.matchList.ongoing}
								loading={matchListState.loading}
								animateFromLeft
							/>
						)}
					</TabPanel>
					<TabPanel h="100%">
						{matchListState.matchList.finished.length === 0 &&
						matchListState.loading === false ? (
							<NotFound />
						) : (
							<List
								name="finishedMatchList"
								matchList={matchListState.matchList.finished}
								loading={matchListState.loading}
								animateFromRight
							/>
						)}
					</TabPanel>
				</TabPanels>
			</Tabs>
		</motion.div>
	)
}
