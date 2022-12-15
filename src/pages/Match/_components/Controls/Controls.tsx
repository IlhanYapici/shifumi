import { Divider, Grid } from "@chakra-ui/react"
import {
	FaHandRock as RockIcon,
	FaHandPaper as PaperIcon,
	FaHandScissors as ScissorsIcon
} from "react-icons/fa"

import { move } from "../../../../utils/api/api"
import { useMatchContext } from "../../../../context/MatchContext/MatchContext"
import { ActionButton } from "../../../../components/ActionButton/ActionButton"
import { useParams } from "react-router-dom"

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

	return (
		<Grid
			templateColumns="1fr auto 1fr auto 1fr"
			gap="1rem"
			position="fixed"
			bottom="0"
			left="50%"
			padding="1rem"
			transform="translateX(-50%)"
			borderLeft="0.2rem solid"
			borderTop="0.2rem solid"
			borderRight="0.2rem solid"
			borderBottom="0"
			borderColor={disabled ? "linkedin.100" : "linkedin.500"}
			borderRadius="1rem 1rem 0 0"
		>
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
			/>
			<Divider orientation="vertical" />
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
			/>
			<Divider orientation="vertical" />
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
		</Grid>
	)
}
