import React from 'react'
import { Flex, useColorMode } from '@chakra-ui/react'

import Navbar from './Navbar'

const Container = props => {
	const { colorMode } = useColorMode()

	return (
		<Flex
			minH='100vh'
			width='100%'
			flexDirection='column'
			bg={
				colorMode === 'light' ? 'backgroundColor.light' : 'backgroundColor.dark'
			}
			pb={4}
		>
			<Navbar />
			<Flex
				height='100%'
				width='100%'
				alignItems='center'
				justifyContent='top'
				flexDirection='column'
				pt={24}
			>
				{props.children}
			</Flex>
		</Flex>
	)
}

export default Container
