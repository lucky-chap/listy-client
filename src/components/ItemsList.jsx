import {
    Flex,
    Box,
	Text,
	useColorMode,
	Fade,
	Badge,
	CircularProgress,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'

import Item from './Item';

// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
	getItems,
} from '../redux/requests/ItemRequests'


import Container from './Container'

const ItemsList = () => {
	const { colorMode } = useColorMode()

	const { isAuthenticated, user } = useSelector(state => state.auth)

	const { name = 'name' } = user || {}

	const { itemsList, loadItemsList } = useSelector(state => state.items)
	const dispatch = useDispatch()


	useEffect(() => {
		dispatch(getItems())
	}, [dispatch])

	return (
		<Container>
			<Flex
				width={{ base: '95%', md: '90%', sm: '100%' }}
				bg={
					colorMode === 'light'
						? 'boxBackgroundColor.light'
						: 'boxBackgroundColor.dark'
				}
				rounded='lg'
				p={5}
				boxShadow='lg'
				flexDirection='row'
				flexWrap='wrap'
				justifyContent='center'
				alignItems='center'
			>
				<Flex w='100%' direction='row'>
					<Badge
						fontSize='0.8em'
						colorScheme='primary'
						justifySelf='flex-start'
						display={isAuthenticated ? 'inherit' : 'none'}
					>
						Hello, {name}
					</Badge>
					<Badge
						fontSize='0.8em'
						colorScheme='success'
						justifySelf='flex-end'
						ml='auto'
					>
						{itemsList.length > 0 ? `${itemsList.length} ITEM(S)` : 'NO ITEMS'}
					</Badge>
				</Flex>

				{isAuthenticated || loadItemsList === 'success' ? (
					<Flex
						w='-webkit-fill-available'
						mx='auto'
						mb={7}
						flexDirection='row'
						flexWrap='wrap'
						justifyContent='center'
						p={2}
					>
						{itemsList.map((item, index) => (
							// At first I used the index as the key. But anytime I added a new item, it took the index of the previous
							// item before it in the array (hope you get me). This made updating an item difficult, as it's contents
							// are replaced with the previous item's contents at that index. 
							// Using their unique IDs as keys helped solve this bug 😊
							<Box mt={8} maxW='sm' w='100%' in='true' key={item._id}>
								<Item item={item} />
							</Box>
						))}
					</Flex>
				) : (
					<Box>
						<CircularProgress isIndeterminate color='green.500' />
						<Text mt={8}>Ooops! No items here. Log in and try adding a few.</Text>
					</Box>
				)}
			</Flex>
		</Container>
	)
}

export default ItemsList
