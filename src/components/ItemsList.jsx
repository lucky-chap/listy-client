import {
    Flex,
    Box,
	IconButton,
	List,
	ListItem,
	Text,
	useColorMode,
	Fade,
	HStack,
	Badge,
	Divider,
	CircularProgress,
	useToast,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'

// Icons
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
	deleteItem,
	checkItem,
	getItems,
} from '../redux/requests/ItemRequests'


import Container from './Container'
import AddItem from './AddItem'

const ItemsList = () => {
	const { colorMode } = useColorMode()
	const toast = useToast()

	const { isAuthenticated, user } = useSelector(state => state.auth)

	const { name = 'name' } = user || {}

	const { itemsList, loadItemsList } = useSelector(state => state.items)
	const dispatch = useDispatch()

	const handleDelete = value => {
		if (isAuthenticated) {
			dispatch(deleteItem(value))
		} else {
			toast({
				title: 'Unauthorised access',
				description: 'Please login to make any changes.',
				status: 'error',
				duration: 3000,
				isClosable: true,
			})
		}
	}

	const handleCheck = value => {
		if (isAuthenticated) {
			dispatch(checkItem(value))
		} else {
			toast({
				title: 'Unauthorised access',
				description: 'Please login to make any changes.',
				status: 'error',
				duration: 3000,
				isClosable: true,
			})
		}
	}

	useEffect(() => {
		dispatch(getItems())
	}, [dispatch])

	return (
		<Container>
			<Flex
				width={{ base: '90%', md: '400px' }}
				bg={
					colorMode === 'light'
						? 'boxBackgroundColor.light'
						: 'boxBackgroundColor.dark'
				}
				rounded='lg'
				p={5}
				boxShadow='lg'
				flexDirection='column'
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
					<List spacing='1em' mt='1em' w='100%' p={2}>
						{itemsList.map((item, index) => (
							<Fade in='true' key={index} minW='100%'>
								<ListItem w='100%' key={item._id}>
									<HStack display='flex' w='100%' spacing={4}>
										<IconButton
											aria-label='Mark Item'
											variant={item.isChecked ? 'solid' : 'outline'}
											size='sm'
											colorScheme='success'
											icon={<CheckIcon />}
											isRound
											onClick={() =>
												handleCheck({
													id: item._id,
													isChecked: !item.isChecked,
												})
											}
										/>
										<Text
											as={item.isChecked ? 'del' : null}
											opacity={item.isChecked ? '0.5' : null}
											alignSelf='center'
											fontSize='xl'
											flexGrow='1'
											isTruncated
										>
											{item.title}
										</Text>
										<IconButton
											aria-label='Delete Item'
											variant='solid'
											size='sm'
											colorScheme='error'
											icon={<DeleteIcon />}
											isRound
											onClick={() => handleDelete({ id: item._id })}
										/>
									</HStack>
								</ListItem>
							</Fade>
						))}
					</List>
				) : (
					<Box>
                            <CircularProgress isIndeterminate color='green.500' />
                            <Text>Ooops! No items here</Text>
					</Box>
				)}

				<Divider orientation='horizontal' my={2} />

				<AddItem />
			</Flex>
		</Container>
	)
}

export default ItemsList
