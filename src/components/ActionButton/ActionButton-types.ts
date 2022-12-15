export interface IActionCardProps {
	ariaLabel: string
	hasTooltip: boolean
	tooltipLabel?: string
	icon: React.ReactElement
	onClick: () => void
	variant?: "ghost" | "solid" | "outline"
	disabled?: boolean
}
