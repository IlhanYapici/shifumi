import {
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Center
} from "@chakra-ui/react"

export function NotFound() {
	return (
		<Center h="100%" w="100%">
			<Alert
				status="info"
				variant="subtle"
				flexDir="column"
				alignItems="center"
				justifyContent="center"
				textAlign="center"
				h="200px"
				w="100%"
				maxW="466.5px"
				borderRadius="1rem"
			>
				<AlertIcon />
				<AlertTitle>No match found.</AlertTitle>
				<AlertDescription>
					You can join a match using the button in the bottom right.
				</AlertDescription>
			</Alert>
		</Center>
	)
}
