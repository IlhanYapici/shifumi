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

import { IRegisterForm, THandleChange } from "../types"
import axios from "axios"

export function RegisterForm() {
	const [form, setForm] = useState<IRegisterForm>({
		username: { isInvalid: undefined, value: "" },
		password: { isInvalid: undefined, value: "" }
	})
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(false)

	const handleSubmit = async () => {
		if (form.username && form.password) {
			await axios
				.post("http://fauques.freeboxos.fr:3000/register", { form })
				.then(() => setError(false))
				.catch(() => setError(true))
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
		<div className="login-form-container">
			<Text fontWeight="bold" fontSize="1.5rem">
				Register
			</Text>
			<FormControl isRequired mt="3rem" isInvalid={form.username.isInvalid}>
				<FormLabel>Username</FormLabel>
				<Input
					onChange={(e) => handleChange("username", e.target.value)}
					type="text"
				/>
			</FormControl>
			<FormControl isRequired mt="1.5rem" isInvalid={form.password.isInvalid}>
				<FormLabel>Password</FormLabel>
				<InputGroup>
					<Input
						onChange={(e) => handleChange("password", e.target.value)}
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
			<Button
				disabled={!getFormValidity()}
				onClick={() => handleSubmit()}
				mt="2rem"
			>
				Register
			</Button>
		</div>
	)
}
