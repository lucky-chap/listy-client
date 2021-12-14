import React from 'react'
import {
	Box,
	Flex,
	HStack,
	Link,
	Menu,
	MenuButton,
	IconButton,
	MenuList,
	Stack,
	useMediaQuery,
	Divider,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'

import { useSelector } from 'react-redux'

import { ColorModeSwitcher } from '../chakra/ColorModeSwitcher';

import Register from './Register'
import Login from './Login'
import Logout from './Logout'
import Add from './Add';

const Navbar = () => {
	const { isAuthenticated } = useSelector(state => state.auth)

	const [isLargerThan48em] = useMediaQuery('(min-width: 48em)')

	return (
		<Flex
			justifyContent='space-between'
			alignItems='center'
			position='fixed'
			minW='100%'
			bg={'inherit'}
			h={16}
			zIndex={4}
			boxShadow='lg'
		>
			{isLargerThan48em ? (
				<Flex
					px={{ base: 4 }}
					py={{ base: 2 }}
					alignItems='center'
					justifyContent='space-between'
					my={2}
					mx='auto'
					width={{ base: '90%', lg: '75%' }}
				>
					<HStack spacing={4} flexShrink='1'>
						<Box fontWeight='bold' fontSize='lg'>
							<Link href='/'>Listy</Link>
						</Box>
						<ColorModeSwitcher />
					</HStack>

					{isAuthenticated ? (
						<HStack>
							<Add />
							<Logout />
						</HStack>
					) : (
						<HStack spacing={4} flexShrink='1'>
							<Login />
							<Register />
							<Add />
						</HStack>
					)}
				</Flex>
			) : (
				<Flex
					px={{ base: 4 }}
					py={{ base: 2 }}
					alignItems='center'
					justifyContent='space-between'
					my={2}
					mx='auto'
					width={{ base: '100%', lg: '75%' }}
				>
					<ColorModeSwitcher size='sm' />

					<Box fontWeight='bold' fontSize='lg'>
						<Link href='/'>Listy</Link>
					</Box>

					{isAuthenticated ? (
						<HStack>
							<Add />
							<Logout />
						</HStack>
					) : (
						<Menu>
							<MenuButton
								as={IconButton}
								icon={<HamburgerIcon />}
								variant='outline'
								size='sm'
							/>
							<MenuList>
								<Stack p={2} alignItems='center'>
									<Login />

									<Divider orientation='horizontal' mt={2} />
									<Register variant='link' />
									<Divider orientation='horizontal' mt={2} />
									<Add />
								</Stack>
							</MenuList>
						</Menu>
					)}
				</Flex>
			)}
		</Flex>
	)
}

export default Navbar
