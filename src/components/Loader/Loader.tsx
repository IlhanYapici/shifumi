import { motion, Transition, Variants } from "framer-motion"

export function Loader() {
	const loaderStyle = {
		display: "flex",
		height: "2rem",
		width: "2rem",
		justifyContent: "space-around"
	}

	const dotStyle = {
		display: "block",
		height: "0.5rem",
		width: "0.5rem",
		backgroundColor: "black",
		borderRadius: "0.25rem"
	}

	const loaderStyleVariants: Variants = {
		start: {
			transition: { staggerChildren: 0.1 }
		},
		end: {
			transition: { staggerChildren: 0.1 }
		}
	}

	const dotStyleVariants: Variants = {
		start: {
			y: "0%"
		},
		end: {
			y: "100%"
		}
	}

	const dotStyleTransition: Transition = {
		duration: 0.4,
		repeat: Infinity,
		repeatType: "reverse",
		type: "spring"
	}

	return (
		<motion.div
			className="loader"
			style={loaderStyle}
			variants={loaderStyleVariants}
			initial="start"
			animate="end"
		>
			<motion.span
				className="loader_dot"
				style={dotStyle}
				variants={dotStyleVariants}
				transition={dotStyleTransition}
			></motion.span>
			<motion.span
				className="loader_dot"
				style={dotStyle}
				variants={dotStyleVariants}
				transition={dotStyleTransition}
			></motion.span>
			<motion.span
				className="loader_dot"
				style={dotStyle}
				variants={dotStyleVariants}
				transition={dotStyleTransition}
			></motion.span>
		</motion.div>
	)
}
