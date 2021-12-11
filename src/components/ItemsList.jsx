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

				{loadItemsList === 'success' ? (
					<Flex flexDirection='row' flexWrap='wrap' justifyContent='center' w='100%' p={2}>
						{itemsList.map((item, index) => (
							<Fade in='true' key={index} minW='100%'>
								<Item item={item} />
							</Fade>
						))}
					</Flex>
				) : (
					<Box>
                            <CircularProgress isIndeterminate color='green.500' />
                            <Text>Ooops! No items here</Text>
					</Box>
				)}

			</Flex>
		</Container>
	)
}

export default ItemsList
