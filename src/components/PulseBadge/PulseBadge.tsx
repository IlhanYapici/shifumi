import { Box } from "@chakra-ui/react"

import { IPulseBadgeProps } from "./PulseBadge-types"

import "./PulseBadge-styles.css"

export function PulseBadge(props: IPulseBadgeProps) {
	const { status } = props

	return (
		<Box
			backgroundColor={status === "close" ? "tomato" : "whatsapp.500"}
			className="pulse-badge"
			display="inline-block"
			position="relative"
			borderRadius="50%"
			_before={{
				content: '""',
				display: "block",
				position: "absolute",
				top: "0",
				left: "0",
				right: "0",
				bottom: "0",
				animation: "pulse 1s ease infinite",
				borderRadius: "50%",
				border: `4px double ${
					status === "close" ? "tomato" : "var(--chakra-colors-whatsapp-500)"
				}`
			}}
			h="1rem"
			w="1rem"
		></Box>
	)
}
