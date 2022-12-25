import { Grid, Text } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useEffect } from "react"
import {
	FaHandRock as RockIcon,
	FaHandPaper as PaperIcon,
	FaHandScissors as ScissorsIcon
} from "react-icons/fa"

import { IAnimatedEventsContainerProps } from "./AnimatedEventsContainer-types"
import { getAnimationVariants } from "../../../../utils/misc/misc"

export function AnimatedEventsContainer(props: IAnimatedEventsContainerProps) {
	const { matchState, dispatchMatchState } = props

	const getIcon = (move: "rock" | "paper" | "scissors") => {
		switch (move) {
			case "rock":
				return <RockIcon />
			case "paper":
				return <PaperIcon />
			case "scissors":
				return <ScissorsIcon />
		}
	}

	const user1Variants = getAnimationVariants({ type: "fromLeft" })
	const user2Variants = getAnimationVariants({ type: "fromRight" })

	const user1MoveIcon = getIcon(matchState.user1!)

	const user2MoveIcon = getIcon(matchState.user2!)

	useEffect(() => {
		const t = setTimeout(() => {
			dispatchMatchState({ type: "SET_DISPLAY_ANIMATIONS", payload: false })
		}, 2000)

		return () => clearTimeout(t)
	}, [])

	return (
		<Grid
			position="absolute"
			top="0"
			left="0"
			w="100%"
			h="100%"
			templateColumns="1fr 1fr"
			alignItems="center"
			justifyItems="center"
		>
			<motion.div
				key="user1IconAnimation"
				variants={user1Variants.container}
				initial="hidden"
				animate="show"
				exit={{ opacity: 0 }}
			>
				<Text fontSize="4rem">{user1MoveIcon}</Text>
			</motion.div>
			<motion.div
				key="user2IconAnimation"
				variants={user2Variants.container}
				initial="hidden"
				animate="show"
				exit={{ opacity: 0 }}
			>
				<Text fontSize="4rem">{user2MoveIcon}</Text>
			</motion.div>
		</Grid>
	)
}
