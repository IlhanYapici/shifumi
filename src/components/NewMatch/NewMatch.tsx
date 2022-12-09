import {
	Button,
	Text,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	useDisclosure
} from "@chakra-ui/react"

export function NewMatch() {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			<Button position="fixed" bottom="1rem" right="1rem" onClick={onOpen}>
				Create Match
			</Button>

			<Modal blockScrollOnMount isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent w="fit-content">
					<ModalHeader>
						<Text>You want to create a new match ?</Text>
					</ModalHeader>
					<ModalFooter display="flex" gap="1rem">
						<Button colorScheme="linkedin" ml="auto">
							Yes
						</Button>
						<Button
							onClick={onClose}
							colorScheme="red"
							variant="ghost"
							mr="auto"
						>
							No
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}
