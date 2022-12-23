import { Variants } from "framer-motion"
import { IMatch } from "../../components"

export interface IGetScoresParams {
	turns: any[]
}

export interface IGetMatchStatusParams {
	match: IMatch
}

export interface IGetAnimationVariantsParams {
	type: "fade" | "fromTop" | "fromBottom" | "fromLeft" | "fromRight"
	staggerChildren?: number
	delayChildren?: number
}

export interface IVariant {
	container: Variants
	children: Variants
}
