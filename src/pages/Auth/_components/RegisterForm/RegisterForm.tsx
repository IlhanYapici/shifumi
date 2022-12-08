import {
	Box,
	Text,
	Alert,
	AlertIcon,
	AlertDescription,
	FormControl,
	FormLabel,
	InputGroup,
	Input,
	InputRightElement,
	Button,
	FormErrorMessage,
	useToast
} from "@chakra-ui/react"
import { useState } from "react"
import axios from "axios"

import { IRegisterForm, THandleChange } from "../types"

export function RegisterForm() {
	const [form, setForm] = useState<IRegisterForm>({
		username: { isInvalid: undefined, value: "" },
		password: { isInvalid: undefined, value: "" }
	})
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	const toast = useToast()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (form.username && form.password) {
			await axios
				.post(`${import.meta.env.VITE_API_URL}/register`, {
					username: form.username.value,
					password: form.password.value
				})
				.then((res) => {
					setError(null)
					toast({
						status: "success",
						title: "User created.",
						description: "You can now login."
					})
				})
				.catch((err) => console.log(err))
		}
	}

	const handleChange: THandleChange = (field, value) => {
		switch (field) {
			case "username":
				if (value === "" || value.includes(" ")) {
					setForm({ ...form, username: { isInvalid: true, value } })
					break
				}
				setForm({ ...form, username: { isInvalid: false, value } })
				break
			case "password":
				if (value === "" || value.includes(" ")) {
					setForm({ ...form, password: { isInvalid: true, value } })
					break
				}
				setForm({ ...form, password: { isInvalid: false, value } })
				break
		}
	}

	const getFormValidity = () => {
		if (
			form.username.isInvalid ||
			form.password.isInvalid ||
			form.username.value === "" ||
			form.password.value === ""
		) {
			return false
		} else {
			return true
		}
	}

	return (
		<Box
			className="register-form-container"
			position="relative"
			w="100%"
			h="fit-content"
			p="4rem 6rem"
		>
			{error && (
				<Alert
					status="error"
					position="absolute"
					w="fit-content"
					top="0"
					left="50%"
					transform="translateX(-50%)"
				>
					<AlertIcon />
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			<Text fontWeight="bold" fontSize="1.5rem" w="fit-content" m="0 auto">
				Register
			</Text>
			<form onSubmit={(e) => handleSubmit(e)}>
				<FormControl isRequired mt="2rem" isInvalid={form.username.isInvalid}>
					<FormLabel>Username</FormLabel>
					<Input
						onChange={(e) => handleChange("username", e.target.value)}
						type="text"
					/>
					{form.username.isInvalid && (
						<FormErrorMessage>Username is incorrect.</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isRequired mt="1.5rem" isInvalid={form.password.isInvalid}>
					<FormLabel>Password</FormLabel>
					<InputGroup>
						<Input
							onChange={(e) => handleChange("password", e.target.value)}
							type={isVisible ? "text" : "password"}
							pr="4rem"
						/>
						<InputRightElement w="4.5rem">
							<Button
								h="1.75rem"
								w="60px"
								fontSize="0.9rem"
								size="md"
								variant="ghost"
								colorScheme="linkedin"
								onClick={() => setIsVisible(!isVisible)}
							>
								{isVisible ? "Hide" : "Show"}
							</Button>
						</InputRightElement>
					</InputGroup>
					{form.password.isInvalid && (
						<FormErrorMessage>Password is incorrect.</FormErrorMessage>
					)}
				</FormControl>
				<Button
					disabled={!getFormValidity()}
					type="submit"
					colorScheme="linkedin"
					display="block"
					p="0 1.5rem"
					m="2rem auto 0"
				>
					Register
				</Button>
			</form>
		</Box>
	)
}
