import { IVariant } from "./misc-types"

export const DEFAULT_STAGGER_CHILDREN: number = 0.1
export const DEFAULT_DELAY_CHILDREN: number = 0.2

export const FADE_VARIANT: IVariant = {
	container: {
		hidden: {
			opacity: 0
		},
		show: {
			opacity: 1,
			transition: {
				delayChildren: DEFAULT_STAGGER_CHILDREN,
				staggerChildren: DEFAULT_DELAY_CHILDREN
			}
		}
	},
	children: {
		hidden: {
			opacity: 0
		},
		show: {
			opacity: 1
		}
	}
}

export const SLIDE_LEFT_VARIANT: IVariant = {
	container: {
		hidden: {
			opacity: 0,
			x: "-100%"
		},
		show: {
			opacity: 1,
			x: 0,
			transition: {
				delayChildren: DEFAULT_STAGGER_CHILDREN,
				staggerChildren: DEFAULT_DELAY_CHILDREN
			}
		}
	},
	children: {
		hidden: {
			x: "-100%",
			opacity: 0
		},
		show: {
			x: 0,
			opacity: 1
		}
	}
}

export const SLIDE_RIGHT_VARIANT: IVariant = {
	container: {
		hidden: {
			opacity: 0,
			x: "100%"
		},
		show: {
			opacity: 1,
			x: 0,
			transition: {
				delayChildren: DEFAULT_STAGGER_CHILDREN,
				staggerChildren: DEFAULT_DELAY_CHILDREN
			}
		}
	},
	children: {
		hidden: {
			x: "100%",
			opacity: 0
		},
		show: {
			x: 0,
			opacity: 1
		}
	}
}

export const SLIDE_UP_VARIANT: IVariant = {
	container: {
		hidden: {
			opacity: 0
		},
		show: {
			opacity: 1,
			transition: {
				delayChildren: DEFAULT_STAGGER_CHILDREN,
				staggerChildren: DEFAULT_DELAY_CHILDREN
			}
		}
	},
	children: {
		hidden: {
			y: "-100%",
			opacity: 0
		},
		show: {
			y: 0,
			opacity: 1
		}
	}
}

export const SLIDE_DOWN_VARIANT: IVariant = {
	container: {
		hidden: {
			opacity: 0
		},
		show: {
			opacity: 1,
			transition: {
				delayChildren: DEFAULT_STAGGER_CHILDREN,
				staggerChildren: DEFAULT_DELAY_CHILDREN
			}
		}
	},
	children: {
		hidden: {
			y: "100%",
			opacity: 0
		},
		show: {
			y: 0,
			opacity: 1
		}
	}
}
