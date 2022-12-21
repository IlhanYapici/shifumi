import { Progress, Center } from "@chakra-ui/react"
import { useState, useEffect } from "react"

import { ILoadingProps } from "./Loading-types"

import "./Loading-styles.css"

export function Loading(props: ILoadingProps) {
	const [progressValue, setProgressValue] = useState<number>(0)
	const { delay } = props

	useEffect(() => {
		const t = setTimeout(() => {
			setProgressValue(100)
		}, delay)

		return () => clearTimeout(t)
	}, [])

	return (
		<Center w="100%" h="100%" position="absolute">
			<Progress
				className="progress-bar"
				value={progressValue}
				colorScheme="linkedin"
				borderRadius="0.25rem"
				size="md"
				width="30%"
				hasStripe
			/>
		</Center>
	)
}
