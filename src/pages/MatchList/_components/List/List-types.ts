import { IMatch } from "../../../../components"

interface IListCommonProps {
	matchList: IMatch[]
	loading: boolean
	name: string
}

type TListConditionalProps =
	| ({
			animateFromLeft?: boolean
			animateFromRight?: never
	  } & IListCommonProps)
	| ({
			animateFromLeft?: never
			animateFromRight?: boolean
	  } & IListCommonProps)

export type TListProps = TListConditionalProps
