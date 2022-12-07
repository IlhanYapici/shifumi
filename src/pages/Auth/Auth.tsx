import { Grid, Divider } from "@chakra-ui/react"

import { LoginForm, RegisterForm } from "./_components"

export function Auth() {
	return (
		<div className="auth-forms-container">
			<h1>Auth</h1>
			<Grid templateColumns="repeat(3, 1fr)" justifyItems="center">
				<LoginForm />
				<Divider orientation="vertical" />
				<RegisterForm />
			</Grid>
		</div>
	)
}
