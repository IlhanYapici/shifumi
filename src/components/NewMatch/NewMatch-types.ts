import { Dispatch } from "react"

export interface INewMatchProps {
	setUpdater: Dispatch<React.SetStateAction<boolean>>
	setTabIndex: (index: number) => void
}
