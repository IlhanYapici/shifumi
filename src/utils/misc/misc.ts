import { useState } from "react"

import {
	IGetScoresParams,
	IGetMatchStatusParams,
	IGetAnimationVariantsParams,
	IVariant
} from "./misc-types"
import {
	DEFAULT_DELAY_CHILDREN,
	DEFAULT_STAGGER_CHILDREN,
	FADE_VARIANT,
	SLIDE_DOWN_VARIANT,
	SLIDE_LEFT_VARIANT,
	SLIDE_RIGHT_VARIANT,
	SLIDE_UP_VARIANT
} from "./misc-constants"
import { IMatch } from "../../components"

export function getScores(params: IGetScoresParams) {
	const { turns } = params

	let score = {
		user1: 0,
		user2: 0
	}

	turns.forEach((turn) => {
		if (Object.keys(turn).includes("winner") && turn.winner === "user1") {
			score.user1++
		} else if (
			Object.keys(turn).includes("winner") &&
			turn.winner === "user2"
		) {
			score.user2++
		}
	})

	return score
}

export function getMatchStatus(
	params: IGetMatchStatusParams
): "open" | "ongoing" | "finished" {
	const { match } = params

	if (match.user1 && match.user2) {
		if (match.turns.length >= 3) {
			return "finished"
		} else {
			return "ongoing"
		}
	} else {
		return "open"
	}
}

export function getUserNumber(username: string, match: IMatch) {
	if (username === match.user1?.username) {
		return "user1"
	} else return "user2"
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1)
}

export function uppercase(str: string) {
	return str.toUpperCase()
}

export function useForceUpdate() {
	const [, setValue] = useState<number>(0)
	return () => setValue((value) => ++value)
}

export function getAnimationVariants(
	params: IGetAnimationVariantsParams
): IVariant {
	const {
		type,
		staggerChildren = DEFAULT_STAGGER_CHILDREN,
		delayChildren = DEFAULT_DELAY_CHILDREN
	} = params

	switch (type) {
		case "fade":
			return {
				...FADE_VARIANT,
				container: {
					...FADE_VARIANT.container,
					show: {
						...FADE_VARIANT.container.show,
						transition: { delayChildren, staggerChildren }
					}
				}
			}
		case "fromTop":
			return {
				...SLIDE_UP_VARIANT,
				container: {
					...SLIDE_UP_VARIANT.container,
					show: {
						...SLIDE_UP_VARIANT.container.show,
						transition: { delayChildren, staggerChildren }
					}
				}
			}
		case "fromBottom":
			return {
				...SLIDE_DOWN_VARIANT,
				container: {
					...SLIDE_DOWN_VARIANT.container,
					show: {
						...SLIDE_DOWN_VARIANT.container.show,
						transition: { delayChildren, staggerChildren }
					}
				}
			}
		case "fromLeft":
			return {
				...SLIDE_LEFT_VARIANT,
				container: {
					...SLIDE_LEFT_VARIANT.container,
					show: {
						...SLIDE_LEFT_VARIANT.container.show,
						transition: { delayChildren, staggerChildren }
					}
				}
			}
		case "fromRight":
			return {
				...SLIDE_RIGHT_VARIANT,
				container: {
					...SLIDE_RIGHT_VARIANT.container,
					show: {
						...SLIDE_RIGHT_VARIANT.container.show,
						transition: { delayChildren, staggerChildren }
					}
				}
			}
	}
}
