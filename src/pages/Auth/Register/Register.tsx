import { Link } from "react-router-dom"
import { motion } from "framer-motion"
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
	useColorModeValue
} from "@chakra-ui/react"
import { useReducer } from "react"

import { THandleChange } from "../types"
import { loginUser, registerUser } from "../../../utils/api/api"
import { getAnimationVariants } from "../../../utils/misc/misc"
import { registerReducer } from "../utils"
import { DEFAULT_REGISTER_STATE } from "../constants"
import { AxiosError } from "axios"

export function Register() {
	const [registerState, dispatch] = useReducer(
		registerReducer,
		DEFAULT_REGISTER_STATE
	)

	const animationVariants = getAnimationVariants({ type: "fromBottom" })

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch({ type: "SET_LOADING", payload: true })

		if (
			!registerState.invalidFields.username &&
			!registerState.invalidFields.password
		) {
			const loginResCallback = (data: any) => {
				dispatch({ type: "SET_ERROR", payload: null })

				const t = setTimeout(() => {
					dispatch({ type: "SET_LOADING", payload: false })

					return () => clearTimeout(t)
				}, 1000)
			}

			const errCallback = (error: AxiosError) => {
				dispatch({ type: "SET_LOADING", payload: false })
				dispatch({ type: "SET_ERROR", payload: error.message })

				const t = setTimeout(
					() => dispatch({ type: "SET_ERROR", payload: null }),
					10000
				)

				return () => clearTimeout(t)
			}

			await registerUser({
				username: registerState.form.username,
				password: registerState.form.password,
				resCallback: (data) => {
					loginUser({
						username: registerState.form.username,
						password: registerState.form.password,
						resCallback: loginResCallback,
						errCallback
					})
				},
				errCallback
			})
		}
	}

	const handleChange: THandleChange = (field, value) => {
		switch (field) {
			case "username":
				if (value === "" || value.includes(" ")) {
					dispatch({
						type: "SET_INVALID_FIELD",
						field: "username",
						payload: true
					})
					break
				}
				dispatch({ type: "HANDLE_INPUT", field: "username", payload: value })
				dispatch({
					type: "SET_INVALID_FIELD",
					field: "username",
					payload: false
				})
				break
			case "password":
				if (value === "" || value.includes(" ")) {
					dispatch({
						type: "SET_INVALID_FIELD",
						field: "password",
						payload: true
					})
					break
				}
				dispatch({ type: "HANDLE_INPUT", field: "password", payload: value })
				dispatch({
					type: "SET_INVALID_FIELD",
					field: "password",
					payload: false
				})
				break
		}
	}

	const getFormValidity = () => {
		if (
			registerState.invalidFields.username ||
			registerState.invalidFields.password ||
			registerState.form.username === "" ||
			registerState.form.password === ""
		) {
			return false
		} else {
			return true
		}
	}

	return (
		<Box
			display="flex"
			flexDir="column"
			alignSelf="center"
			m="0 auto"
			gap="2rem"
		>
			{registerState.error && (
				<motion.div
					key="registerError"
					initial={{ opacity: 0, translateY: "-100px" }}
					animate={{ opacity: 1, translateY: "0px" }}
					exit={{ opacity: 0, translateY: "-100px" }}
				>
					<Alert status="error" variant="solid" w="100%" borderRadius="0.75rem">
						<AlertIcon />
						<AlertDescription>{registerState.error}</AlertDescription>
					</Alert>
				</motion.div>
			)}
			<Box
				className="register-form-container"
				w="fit-content"
				h="fit-content"
				p="2rem"
				backgroundColor={useColorModeValue("gray.50", "gray.800")}
				borderColor={useColorModeValue("white", "gray.700")}
				borderWidth="1px"
				borderRadius="0.75rem"
				filter={useColorModeValue(
					"drop-shadow(0px 0px 15px #BFBFBF)",
					"drop-shadow(0px 0px 15px #0A0A0A)"
				)}
			>
				<motion.div
					key="register-form"
					style={{ position: "relative" }}
					variants={animationVariants.container}
					initial="hidden"
					animate="show"
				>
					<motion.div
						key="register-form-title"
						variants={animationVariants.children}
					>
						<Text
							fontWeight="bold"
							fontSize="1.5rem"
							w="fit-content"
							m="0 auto"
						>
							Register
						</Text>
					</motion.div>
					<form onSubmit={(e) => handleSubmit(e)}>
						<motion.div
							key="register-form-username"
							variants={animationVariants.children}
						>
							<FormControl
								isRequired
								mt="2rem"
								isInvalid={registerState.invalidFields.username}
							>
								<FormLabel>Username</FormLabel>
								<Input
									onChange={(e) => handleChange("username", e.target.value)}
									type="text"
								/>
								{registerState.invalidFields.username && (
									<FormErrorMessage>Username is incorrect.</FormErrorMessage>
								)}
							</FormControl>
						</motion.div>
						<motion.div
							key="register-form-password"
							variants={animationVariants.children}
						>
							<FormControl
								isRequired
								mt="1.5rem"
								isInvalid={registerState.invalidFields.username}
							>
								<FormLabel>Password</FormLabel>
								<InputGroup>
									<Input
										onChange={(e) => handleChange("password", e.target.value)}
										type={registerState.isPasswordVisible ? "text" : "password"}
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
											onClick={() => dispatch({ type: "TOGGLE_PASSWORD" })}
										>
											{registerState.isPasswordVisible ? "Hide" : "Show"}
										</Button>
									</InputRightElement>
								</InputGroup>
								{registerState.invalidFields.password && (
									<FormErrorMessage>Password is incorrect.</FormErrorMessage>
								)}
							</FormControl>
						</motion.div>
						<motion.div
							key="register-form-button"
							variants={animationVariants.children}
						>
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
						</motion.div>
					</form>
					<motion.div
						key="register-form-footer"
						variants={animationVariants.children}
					>
						<Box
							display="flex"
							gap="0.5rem"
							w="fit-content"
							m="2rem auto 0 auto"
						>
							Already a user?
							<Button variant="link" color="linkedin.500">
								<Link to="/auth/login">Login</Link>
							</Button>
						</Box>
					</motion.div>
				</motion.div>
			</Box>
		</Box>
	)
}
