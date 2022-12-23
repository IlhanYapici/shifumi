import { Progress, Center, Divider } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { Fragment } from "react"

import { MatchCard } from "../../../../components"
import { TListProps } from "./List-types"
import { getAnimationVariants } from "../../../../utils/misc/misc"
import { IVariant } from "../../../../utils/misc/misc-types"

export function List(props: TListProps) {
	const { matchList, loading, name, animateFromLeft, animateFromRight } = props

	const reversedMatchList = matchList.slice(0).reverse()

	let animationVariants: IVariant

	if (animateFromLeft) {
		animationVariants = getAnimationVariants({
			type: "fromLeft",
			staggerChildren: 0.075,
			delayChildren: 0.1
		})
	} else if (animateFromRight) {
		animationVariants = getAnimationVariants({
			type: "fromRight",
			staggerChildren: 0.075,
			delayChildren: 0.1
		})
	} else {
		animationVariants = getAnimationVariants({ type: "fromBottom" })
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
				variants={animationVariants.container}
				initial="hidden"
				animate="show"
			>
				{reversedMatchList &&
					reversedMatchList.map((match, i, arr) => {
						if (i < arr.length - 1) {
							return (
								<Fragment key={match._id}>
									<motion.div variants={animationVariants.children}>
										<MatchCard match={match} />
									</motion.div>
									<Divider />
								</Fragment>
							)
						} else {
							return (
								<motion.div
									key={match._id}
									variants={animationVariants.children}
								>
									<MatchCard match={match} />
								</motion.div>
							)
						}
					})}
			</motion.div>
		</>
	)
}
