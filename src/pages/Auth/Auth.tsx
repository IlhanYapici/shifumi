import { Box, Grid, Divider } from "@chakra-ui/react"

import { LoginForm, RegisterForm } from "./_components"

export function Auth() {
	return (
		<Box
			className="auth-forms-container"
			mt="55px"
			h="90%"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Grid
				w="1280px"
				h="fit-content"
				templateColumns="1fr 6rem 1fr"
				justifyItems="center"
				alignItems="center"
			>
				<LoginForm />
				<Divider orientation="vertical" h="500px" />
				<RegisterForm />
			</Grid>
		</Box>
	)
}
