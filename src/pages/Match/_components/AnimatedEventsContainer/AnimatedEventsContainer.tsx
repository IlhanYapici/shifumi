import { Box } from "@chakra-ui/react"
import { useState } from "react"

import { IAnimatedEventsContainerProps } from "./AnimatedEventsContainer-types"

export function AnimatedEventsContainer(props: IAnimatedEventsContainerProps) {
	const { sse } = props

	const [] = useState()
	/**
	 * TODO: when turn ends, get the last moves and display who lost the turn
	 */
	return <Box className=""></Box>
}
