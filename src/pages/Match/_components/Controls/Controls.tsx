import { Divider } from "@chakra-ui/react"
import {
	FaHandRock as RockIcon,
	FaHandPaper as PaperIcon,
	FaHandScissors as ScissorsIcon
} from "react-icons/fa"
import { Variants, motion } from "framer-motion"

import { move } from "../../../../utils/api/api"
import { useMatchContext } from "../../../../context/MatchContext/MatchContext"
import { ActionButton } from "../../../../components/ActionButton/ActionButton"
import { useParams } from "react-router-dom"

import "./Controls-styles.css"

export function Controls({ disabled = false }: { disabled?: boolean }) {
	const { matchContext } = useMatchContext()
	const { matchId } = useParams()
	const { currentTurn } = matchContext

	const onClick = async (action: "rock" | "paper" | "scissors") => {
		if (!matchId) {
			console.log("matchId is null")
			return
		}

		const token = localStorage.getItem("token")

		if (!token) {
			console.log("token is null")
			return
		}

		switch (action) {
			case "rock":
				await move({
					token,
					matchId,
					turnId: currentTurn.toString(),
					move: "rock"
				})
				break
			case "paper":
				await move({
					token,
					matchId,
					turnId: currentTurn.toString(),
					move: "paper"
				})
				break
			case "scissors":
				await move({
					token,
					matchId,
					turnId: currentTurn.toString(),
					move: "scissors"
				})
				break
		}
	}

	const variantsContainer: Variants = {
		hidden: { translateX: "-50%", translateY: "100px", opacity: 0 },
		show: {
			translateY: 0,
			opacity: 1,
			transition: {
				type: "spring",
				delay: 0.3,
				duration: 0.4,
				staggerChildren: 0.1,
				delayChildren: 0.3
			}
		}
	}

	const variantsChildren: Variants = {
		hidden: {
			scale: 0,
			translateY: "100px"
		},
		show: {
			scale: 1,
			translateY: 0,
			transition: {
				type: "spring",
				bounce: 0.45
			}
		}
	}

	const children = [
		<ActionButton
			hasTooltip
			tooltipLabel="Rock"
			ariaLabel="rock button"
			icon={<RockIcon />}
			onClick={() => {
				onClick("rock")
			}}
			variant="ghost"
			disabled={disabled}
		/>,
		<Divider orientation="vertical" />,
		<ActionButton
			hasTooltip
			tooltipLabel="Paper"
			ariaLabel="paper button"
			icon={<PaperIcon />}
			onClick={() => {
				onClick("paper")
			}}
			variant="ghost"
			disabled={disabled}
		/>,
		<Divider orientation="vertical" />,
		<ActionButton
			hasTooltip
			tooltipLabel="Scissors"
			ariaLabel="scissors button"
			icon={<ScissorsIcon />}
			onClick={() => {
				onClick("scissors")
			}}
			variant="ghost"
			disabled={disabled}
		/>
	]

	return (
		<motion.div
			className="controls"
			style={{
				borderColor: disabled
					? "var(--chakra-colors-linkedin-100)"
					: "var(--chakra-colors-linkedin-500)"
			}}
			variants={variantsContainer}
			initial="hidden"
			animate="show"
		>
			{children.map((child, i) => {
				if (i % 2 === 0) {
					return <motion.div variants={variantsChildren}>{child}</motion.div>
				} else {
					return child
				}
			})}
		</motion.div>
	)
}
