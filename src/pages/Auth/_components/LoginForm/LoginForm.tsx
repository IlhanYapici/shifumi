import {
	Text,
	FormControl,
	FormLabel,
	FormHelperText,
	InputGroup,
	Input,
	InputRightElement,
	IconButton,
	Button
} from "@chakra-ui/react"
import {
	AiFillEyeInvisible as EyeVisibleIcon,
	AiFillEye as EyeInvisibleIcon
} from "react-icons/ai"
import { useState } from "react"

import { ILoginForm } from "../types"
import axios from "axios"

export function LoginForm() {
	const [form, setForm] = useState<ILoginForm>({
		username: "",
		password: ""
	})
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)

	const handleSubmit = async () => {
		if (form.username && form.password) {
			await axios
				.post("http://fauques.freeboxos.fr:3000/login", { form })
				.then(() => setError(false))
				.catch(() => setError(true))
		}
	}

	return (
		<div className="login-form-container">
			<Text fontWeight="bold" fontSize="1.5rem">
				Login
			</Text>
			<FormControl isRequired mt="3rem">
				<FormLabel>Username</FormLabel>
				<Input
					onChange={(e) => setForm({ ...form, username: e.target.value })}
					type="text"
				/>
			</FormControl>
			<FormControl isRequired mt="1.5rem">
				<FormLabel>Password</FormLabel>
				<InputGroup>
					<Input
						onChange={(e) => setForm({ ...form, password: e.target.value })}
						type={isVisible ? "text" : "password"}
					/>
					<InputRightElement>
						<IconButton
							aria-label="show password"
							onClick={() => setIsVisible(!isVisible)}
							icon={isVisible ? <EyeVisibleIcon /> : <EyeInvisibleIcon />}
						/>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<Button onClick={() => handleSubmit()} mt="2rem">
				Login
			</Button>
		</div>
	)
}
