import { Text } from "@chakra-ui/react"

import { IUsernameProps } from "./Username-types"

export function Username(props: IUsernameProps) {
	const { children, fontSize, player } = props

	return (
		<Text
			className="user2 username"
			fontSize={fontSize}
			color="white"
			userSelect="none"
			position="relative"
			_before={{
				zIndex: -1,
				content: '""',
				position: "absolute",
				top: 0,
				left: "-0.5rem",
				width: "calc(100% + 1rem)",
				height: "100%",
				transform: "skew(-5deg)",
				backgroundColor: player === 1 ? "whatsapp.500" : "orange.500"
			}}
		>
			{children}
		</Text>
	)
}
