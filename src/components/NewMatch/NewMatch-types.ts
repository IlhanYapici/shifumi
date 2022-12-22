import { Dispatch, SetStateAction } from "react"

export interface INewMatchProps {
	forceUpdate: () => void
	setTabIndex: Dispatch<SetStateAction<number>>
}
