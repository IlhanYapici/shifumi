import { Card, useDisclosure } from "@chakra-ui/react"
import { motion, AnimatePresence } from "framer-motion"

import { IMatchCardProps } from "./MatchCard-types"
import { TopButtons } from "./_components/TopButtons/TopButtons"
import { MatchStatus } from "./_components/MatchStatus/MatchStatus"
import { MatchHistory } from "./_components/MatchHistory/MatchHistory"
import { getMatchStatus } from "../../utils/misc/misc"

export function MatchCard(props: IMatchCardProps) {
	const { match } = props

	const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false })
	const matchStatus = getMatchStatus(match)

	return (
		<Card
			className="match-card-container"
			position="relative"
			minH="3xs"
			w="lg"
			maxH="xs"
			backgroundColor="gray.50"
			border="1px solid white"
			overflow="hidden"
		>
			<motion.div
				initial={{ height: "234px" }}
				animate={{ height: isOpen ? "100%" : "234px" }}
			>
				{matchStatus === "finished" && (
					<TopButtons isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
				)}
				<AnimatePresence>
					{!isOpen && (
						<motion.div
							key="matchStatus"
							initial={{ transform: "translateX(-100%)" }}
							animate={{ transform: "translateX(0%)" }}
							exit={{ transform: "translateX(-100%)" }}
						>
							<MatchStatus match={match} />
						</motion.div>
					)}
				</AnimatePresence>
				<AnimatePresence>
					{isOpen && (
						<motion.div
							key="matchHistory"
							initial={{ transform: "translateX(100%)" }}
							animate={{ transform: "translateX(0%)" }}
							exit={{ transform: "translateX(100%)" }}
						>
							<MatchHistory match={match} />
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</Card>
	)
}
