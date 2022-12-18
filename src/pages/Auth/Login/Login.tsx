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
	useColorModeValue
} from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import { ILoginForm } from "../types"
import { loginUser } from "../../../utils/api/api"
import { useUserContext } from "../../../context/UserContext/UserContext"
import { getUsernameFromJWT } from "../../../utils/jwt/jwt"

export function Login() {
	const [form, setForm] = useState<ILoginForm>({
		username: "",
		password: ""
	})
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)

	const { setUserContext } = useUserContext()
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (form.username && form.password) {
			const resCallback = (data: any) => {
				setError(false)
				localStorage.setItem("token", data.token)

				const t = setTimeout(() => {
					navigate("/matches")
					return () => clearTimeout(t)
				}, 1000)

				setUserContext({ username: getUsernameFromJWT(data.token) })
			}

			const errCallback = (err: any) => {
				setError(true)
			}

			await loginUser({
				username: form.username,
				password: form.password,
				resCallback,
				errCallback
			})
		}
	}

	useEffect(() => {
		if (error) {
			const t = setTimeout(() => setError(false), 7000)
			return () => clearTimeout(t)
		}
	}, [error])

	return (
		<Box
			className="login-form-container"
			position="relative"
			w="fit-content"
			h="fit-content"
			p="2rem"
			backgroundColor={useColorModeValue("gray.50", "gray.800")}
			alignSelf="center"
			m="0 auto"
			borderColor={useColorModeValue("white", "gray.700")}
			borderWidth="1px"
			borderRadius="1rem"
			filter={useColorModeValue(
				"drop-shadow(0px 0px 15px #BFBFBF)",
				"drop-shadow(0px 0px 15px #0A0A0A)"
			)}
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
					<AlertDescription>Wrong credentials.</AlertDescription>
				</Alert>
			)}
			<Text fontWeight="bold" fontSize="1.5rem" w="fit-content" m="0 auto">
				Login
			</Text>
			<form onSubmit={(e) => handleSubmit(e)}>
				<FormControl isRequired mt="2rem">
					<FormLabel>Username</FormLabel>
					<Input
						onChange={(e) => setForm({ ...form, username: e.target.value })}
						type="text"
					/>
				</FormControl>
				<FormControl isRequired mt="1.5rem">
					<FormLabel>Password</FormLabel>
					<InputGroup size="md">
						<Input
							onChange={(e) => setForm({ ...form, password: e.target.value })}
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
				</FormControl>
				<Button
					type="submit"
					colorScheme="linkedin"
					display="block"
					p="0 1.5rem"
					m="2rem auto 0"
				>
					Login
				</Button>
			</form>
			<Box display="flex" gap="0.5rem" w="fit-content" m="2rem auto 0 auto">
				Don't have an account yet?
				<Button variant="link" color="linkedin.500">
					<Link to="/auth/register">Register</Link>
				</Button>
			</Box>
		</Box>
	)
}
