// 1. import `extendTheme` function
import { extendTheme, theme } from '@chakra-ui/react'

// custom theme
const customTheme = extendTheme({
	colors: {
		error: theme.colors.red,
		primary: theme.colors.teal,
		success: theme.colors.green,
		backgroundColor: {
			light: theme.colors.gray['100'],
			dark: theme.colors.gray['800'],
		},
		boxBackgroundColor: {
			light: theme.colors.whiteAlpha['900'],
			dark: theme.colors.gray['700'],
		},
		placeholder: {
			light: theme.colors.gray['400'],
			dark: theme.colors.whiteAlpha['400'],
		},
	},
})

export default customTheme