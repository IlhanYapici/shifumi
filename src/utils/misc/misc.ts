import { IMatch } from "../../components"

export function getScores(turns: any[]) {
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

export function getMatchStatus(match: IMatch): "open" | "ongoing" | "finished" {
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
