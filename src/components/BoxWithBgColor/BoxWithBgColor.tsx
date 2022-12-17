import { Box } from "@chakra-ui/react"

import { IBoxWithBgColorProps } from "./BoxWithBgColor-types"

export function BoxWithBgColor(props: IBoxWithBgColorProps) {
	const { children, ...boxProps } = props

	return (
		<Box
			zIndex={2}
			padding="0.25rem 0.5rem"
			borderRadius="0.4rem"
			{...boxProps}
		>
			{children}
		</Box>
	)
}
