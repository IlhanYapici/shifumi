import { Divider, Grid } from "@chakra-ui/react"
import {
	FaHandRock as RockIcon,
	FaHandPaper as PaperIcon,
	FaHandScissors as ScissorsIcon
} from "react-icons/fa"

import { ActionButton } from "../../../../components/ActionButton/ActionButton"

export function Controls({ disabled = false }: { disabled?: boolean }) {
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
					console.log("rock")
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
					console.log("paper")
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
					console.log("scissors")
				}}
				variant="ghost"
				disabled={disabled}
			/>
		</Grid>
	)
}
