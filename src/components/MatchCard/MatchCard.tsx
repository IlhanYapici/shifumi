import { Card, useDisclosure, useColorModeValue } from "@chakra-ui/react"
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
			backgroundColor={useColorModeValue("gray.50", "gray.900")}
			borderColor={useColorModeValue("white", "gray.800")}
			borderWidth="1px"
			overflow="hidden"
		>
			<motion.div
				initial={{ height: "234px" }}
				animate={{ height: isOpen ? "100%" : "234px" }}
			>
				{matchStatus === "finished" && (
					<TopButtons isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
				)}
				<AnimatePresence initial={false}>
					{!isOpen && (
						<motion.div
							key="matchStatus"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.25 }}
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
							transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
						>
							<MatchHistory match={match} />
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</Card>
	)
}
