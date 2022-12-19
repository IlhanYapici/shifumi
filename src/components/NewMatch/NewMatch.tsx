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

import { requestNewMatch } from "../../utils/api/api"

export function NewMatch() {
	const { isOpen, onOpen, onClose } = useDisclosure()

	const newMatch = async () => {
		const token = localStorage.getItem("token")
		if (token === null) {
			return
		}

		await requestNewMatch({ token })

		onClose()
	}

	return (
		<>
			<Button
				position="fixed"
				bottom="1rem"
				right="1rem"
				colorScheme="linkedin"
				onClick={onOpen}
			>
				Join a match
			</Button>

			<Modal blockScrollOnMount isCentered isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent w="fit-content">
					<ModalHeader>
						<Text>Do you want to join a new match ?</Text>
					</ModalHeader>
					<ModalFooter display="flex" gap="1rem">
						<Button colorScheme="linkedin" ml="auto" onClick={newMatch}>
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
