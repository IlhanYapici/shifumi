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
import { useEffect, useReducer } from "react"
import { motion } from "framer-motion"

import { loginUser } from "../../../utils/api/api"
import { useUserContext } from "../../../context/UserContext/UserContext"
import { getUsernameFromJWT } from "../../../utils/jwt/jwt"
import { getAnimationVariants } from "../../../utils/misc/misc"
import { DEFAULT_LOGIN_STATE } from "../constants"
import { loginReducer } from "../utils"

export function Login() {
	const [loginState, dispatch] = useReducer(loginReducer, DEFAULT_LOGIN_STATE)

	const { setUserContext } = useUserContext()
	const navigate = useNavigate()

	const animationVariants = getAnimationVariants({ type: "fromBottom" })

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch({ type: "SET_LOADING", payload: true })

		if (loginState.form.username && loginState.form.password) {
			const resCallback = (data: any) => {
				dispatch({ type: "SET_ERROR", payload: false })
				localStorage.setItem("token", data.token)

				const t = setTimeout(() => {
					dispatch({ type: "SET_LOADING", payload: false })
					navigate("/matches")
					return () => clearTimeout(t)
				}, 1000)

				setUserContext({ username: getUsernameFromJWT(data.token) })
			}

			const errCallback = (err: any) => {
				dispatch({ type: "SET_LOADING", payload: false })
				dispatch({ type: "SET_ERROR", payload: true })
			}

			await loginUser({
				username: loginState.form.username,
				password: loginState.form.password,
				resCallback,
				errCallback
			})
		}
	}

	useEffect(() => {
		if (loginState.error) {
			const t = setTimeout(
				() => dispatch({ type: "SET_ERROR", payload: false }),
				7000
			)
			return () => clearTimeout(t)
		}
	}, [loginState.error])

	return (
		<Box
			display="flex"
			flexDir="column"
			alignSelf="center"
			m="0 auto"
			gap="2rem"
		>
			{loginState.error && (
				<motion.div
					key="registerError"
					initial={{ opacity: 0, translateY: "-100px" }}
					animate={{ opacity: 1, translateY: "0px" }}
					exit={{ opacity: 0, translateY: "-100px" }}
				>
					<Alert status="error" variant="solid" w="100%" borderRadius="0.75rem">
						<AlertIcon />
						<AlertDescription>Wrong credentials.</AlertDescription>
					</Alert>
				</motion.div>
			)}
			<Box
				className="login-form-container"
				position="relative"
				w="fit-content"
				h="fit-content"
				p="2rem"
				m="0 auto"
				alignSelf="center"
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
					key="login-form"
					variants={animationVariants.container}
					initial="hidden"
					animate="show"
				>
					<motion.div
						key="login-form-title"
						variants={animationVariants.children}
					>
						<Text
							fontWeight="bold"
							fontSize="1.5rem"
							w="fit-content"
							m="0 auto"
						>
							Login
						</Text>
					</motion.div>
					<form onSubmit={(e) => handleSubmit(e)}>
						<motion.div
							key="login-form-username"
							variants={animationVariants.children}
						>
							<FormControl isRequired mt="2rem">
								<FormLabel>Username</FormLabel>
								<Input
									onChange={(e) =>
										dispatch({
											type: "HANDLE_INPUT",
											field: "username",
											payload: e.target.value
										})
									}
									type="text"
								/>
							</FormControl>
						</motion.div>
						<motion.div
							key="login-form-password"
							variants={animationVariants.children}
						>
							<FormControl isRequired mt="1.5rem">
								<FormLabel>Password</FormLabel>
								<InputGroup size="md">
									<Input
										onChange={(e) =>
											dispatch({
												type: "HANDLE_INPUT",
												field: "password",
												payload: e.target.value
											})
										}
										type={loginState.isPasswordVisible ? "text" : "password"}
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
											{loginState.isPasswordVisible ? "Hide" : "Show"}
										</Button>
									</InputRightElement>
								</InputGroup>
							</FormControl>
						</motion.div>
						<motion.div
							key="login-form-button"
							style={{ display: "flex", justifyContent: "center" }}
							variants={animationVariants.children}
						>
							<Button
								isLoading={loginState.loading}
								type="submit"
								colorScheme="linkedin"
								p="0 1.5rem"
								m="2rem auto 0"
							>
								Login
							</Button>
						</motion.div>
					</form>
					<motion.div
						key="login-form-footer"
						variants={animationVariants.children}
					>
						<Box
							display="flex"
							gap="0.5rem"
							w="fit-content"
							m="2rem auto 0 auto"
						>
							Don't have an account yet?
							<Button variant="link" color="linkedin.500">
								<Link to="/auth/register">Register</Link>
							</Button>
						</Box>
					</motion.div>
				</motion.div>
			</Box>
		</Box>
	)
}
