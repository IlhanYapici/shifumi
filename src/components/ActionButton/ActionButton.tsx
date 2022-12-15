import { IconButton, Tooltip } from "@chakra-ui/react"

import { IActionCardProps } from "./ActionButton-types"

export function ActionButton(props: IActionCardProps) {
	const {
		hasTooltip,
		tooltipLabel,
		ariaLabel,
		onClick,
		variant = "solid",
		icon,
		disabled = false
	} = props

	if (hasTooltip && disabled === false) {
		return (
			<Tooltip label={tooltipLabel ? tooltipLabel : ariaLabel}>
				<IconButton
					aria-label={ariaLabel}
					onClick={onClick}
					variant={variant}
					icon={icon}
					width="fit-content"
					height="fit-content"
					padding="2rem"
					fontSize="2.2rem"
				/>
			</Tooltip>
		)
	}

	return (
		<IconButton
			aria-label={ariaLabel}
			onClick={onClick}
			variant={variant}
			icon={icon}
			width="fit-content"
			height="fit-content"
			padding="2rem"
			fontSize="2.2rem"
			disabled={disabled}
		/>
	)
}
