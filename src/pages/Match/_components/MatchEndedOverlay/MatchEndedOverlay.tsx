import { Center, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export function MatchEndedOverlay() {
	const navigate = useNavigate()

	useEffect(() => {
		const t = setTimeout(() => {
			navigate("/matches")
		}, 3000)

		return () => clearTimeout(t)
	}, [])

	return (
		<Center w="100%" h="100%">
			<Text fontWeight="bold" fontSize="2.5rem">
				The match is done!
			</Text>
		</Center>
	)
}
