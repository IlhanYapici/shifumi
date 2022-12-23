import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { getMatchStatus, useForceUpdate } from "../../utils/misc/misc"
import { Header, IMatch, NewMatch, NotFound } from "../../components"
import { getMatchList } from "../../utils/api/api"
import { List } from "./_components/List/List"
import { AnimatePresence } from "framer-motion"

export function MatchList() {
	const [loading, setLoading] = useState<boolean>(true)
	const [tabIndex, setTabIndex] = useState<number>(0)
	const [matchList, setMatchList] = useState<{
		finished: IMatch[]
		ongoing: IMatch[]
	}>({ finished: [], ongoing: [] })

	const navigate = useNavigate()
	const forceUpdate = useForceUpdate()

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
						if (getMatchStatus(match) === "finished") {
							finished.push(match)
						} else {
							ongoing.push(match)
						}
					})

					setMatchList({ finished, ongoing })
					setLoading(false)
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
		<AnimatePresence>
			<Header />
			<NewMatch
				key="new-match-button"
				setTabIndex={setTabIndex}
				forceUpdate={forceUpdate}
			/>
			<Tabs
				index={tabIndex}
				onChange={setTabIndex}
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
				<TabPanels h="100%" pb="6rem" overflowX="hidden" overflowY="scroll">
					<TabPanel>
						{matchList.ongoing.length === 0 && loading === false ? (
							<NotFound />
						) : (
							<List
								name="ongoingMatchList"
								matchList={matchList.ongoing}
								loading={loading}
								animateFromLeft
							/>
						)}
					</TabPanel>
					<TabPanel>
						{matchList.finished.length === 0 && loading === false ? (
							<NotFound />
						) : (
							<List
								name="finishedMatchList"
								matchList={matchList.finished}
								loading={loading}
								animateFromRight
							/>
						)}
					</TabPanel>
				</TabPanels>
			</Tabs>
		</AnimatePresence>
	)
}
