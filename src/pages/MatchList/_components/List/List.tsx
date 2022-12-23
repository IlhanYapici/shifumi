import { Progress, Center, Divider } from "@chakra-ui/react"
import { Variants, motion } from "framer-motion"
import { Fragment } from "react"

import { MatchCard } from "../../../../components"
import { TListProps } from "./List-types"

export function List(props: TListProps) {
	const { matchList, loading, name, animateFromLeft, animateFromRight } = props

	const reversedMatchList = matchList.slice(0).reverse()

	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.09
			}
		}
	}

	let childrenVariants: Variants

	if (animateFromLeft) {
		childrenVariants = {
			hidden: { opacity: 0, translateX: "-100%" },
			show: { opacity: 1, translateX: 0 }
		}
	} else if (animateFromRight) {
		childrenVariants = {
			hidden: { opacity: 0, translateX: "100%" },
			show: { opacity: 1, translateX: 0 }
		}
	} else {
		childrenVariants = {
			hidden: { opacity: 0, translateY: "100%" },
			show: { opacity: 1, translateY: 0 }
		}
	}

	return (
		<>
			{loading && (
				<Center
					position="absolute"
					pointerEvents="none"
					top="0"
					left="0"
					w="100%"
					h="100%"
				>
					<motion.div
						key={name + "ProgressBar"}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<Progress
							h="0.5rem"
							w="30ch"
							borderRadius="0.5rem"
							isIndeterminate
						/>
					</motion.div>
				</Center>
			)}
			<motion.div
				key={name + "Container"}
				style={{
					display: "grid",
					width: "100%",
					maxWidth: "512px",
					margin: "0 auto",
					paddingTop: "1rem",
					gap: "2rem"
				}}
				variants={containerVariants}
				initial="hidden"
				animate="show"
			>
				{reversedMatchList &&
					reversedMatchList.map((match, i, arr) => {
						if (i < arr.length - 1) {
							return (
								<Fragment key={match._id + "-fragment"}>
									<motion.div
										key={match._id + "-container"}
										variants={childrenVariants}
									>
										<MatchCard key={match._id} match={match} />
									</motion.div>
									<Divider key={match._id + "-divider"} />
								</Fragment>
							)
						} else {
							return (
								<motion.div
									key={match._id + "-container"}
									variants={childrenVariants}
								>
									<MatchCard key={match._id} match={match} />
								</motion.div>
							)
						}
					})}
			</motion.div>
		</>
	)
}
