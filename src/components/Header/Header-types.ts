import { IMatch } from "../MatchCard/MatchCard-types"

export interface IHeaderProps {
	matchList?: IMatch[]
	getStats: () => IStats
}

export interface IStats {
	matchFinished: number
	matchWon: number
	matchLost: number
	winRate: number
}
