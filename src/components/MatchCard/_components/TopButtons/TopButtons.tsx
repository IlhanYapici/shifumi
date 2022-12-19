import { IconButton, Tooltip } from "@chakra-ui/react"
import {
	AiOutlineInfoCircle as InfoIcon,
	AiOutlineCloseCircle as CloseIcon
} from "react-icons/ai"

import { ITopButtonsProps } from "./TopButtons-types"

export function TopButtons(props: ITopButtonsProps) {
	const { isOpen, onOpen, onClose } = props

	const getButton = () => {
		if (isOpen) {
			return (
				<IconButton
					zIndex={5}
					aria-label="details"
					position="absolute"
					top="0.5rem"
					right="0.5rem"
					icon={<CloseIcon />}
					colorScheme="red"
					variant="ghost"
					size="sm"
					fontSize="1.25rem"
					borderRadius="50%"
					onClick={() => onClose()}
				/>
			)
		} else {
			return (
				<IconButton
					zIndex={5}
					aria-label="details"
					position="absolute"
					top="0.5rem"
					right="0.5rem"
					icon={<InfoIcon />}
					colorScheme="linkedin"
					variant="ghost"
					size="sm"
					fontSize="1.25rem"
					borderRadius="50%"
					onClick={() => onOpen()}
				/>
			)
		}
	}

	return (
		<Tooltip label={isOpen ? "Close" : "Match history"} placement="top">
			{getButton()}
		</Tooltip>
	)
}
