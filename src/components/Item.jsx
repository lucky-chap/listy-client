import React from 'react'
import { Box, Text, Badge, IconButton, useToast, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, CheckIcon } from '@chakra-ui/icons';
// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteItem,
	checkItem,
	getItems
} from '../redux/requests/ItemRequests'
import EditForm from './EditForm';

const Item = ({ item }) => {
    
    const toast = useToast()

	const { isAuthenticated } = useSelector(state => state.auth)

	const { isOpen, onOpen, onClose } = useDisclosure()
    
	const dispatch = useDispatch()

	const handleDelete = value => {
		if (isAuthenticated) {
			dispatch(deleteItem(value))
			dispatch(getItems())
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

	const handleEdit = item => {
		if (!isAuthenticated) {
			toast({
				title: 'Unauthorised access',
				description: 'Please login to make any changes.',
				status: 'error',
				duration: 3000,
				isClosable: true,
			})
		}
	}

	return (
		<SimpleGrid
			m={3}
			display='flex'
			borderWidth='1px'
			borderRadius='lg'
			height='100%'
			overflow='hidden'
			columns={{ base: 1, md: 2, lg: 3 }}
			maxW='lg'
			px={{ base: 2.5, lg: 3, xl: 5 }}
			py={5}
			mx='.5rem'
			shadow='xl'
			borderBottomWidth={item.isChecked ? '5px' : null}
			borderBottomColor={item.isChecked ? 'cyan' : null}
		>
			<Box
				wordBreak='break-word'
				overflow='hidden'
				w='100%'
				span={3}
				maxW='sm'
				margin={0}
				maxW='auto'
				display='flex'
				flexWrap='wrap'
				flexDirection='column'
				justifyContent='space-between'
			>
				<Box display='flex' alignItems='baseline'>
					<Badge borderRadius='full' px='2' colorScheme='teal'>
						Title
					</Badge>
				</Box>

				<Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight'>
					<Text
						as={item.isChecked ? 'del' : null}
						opacity={item.isChecked ? '0.5' : null}
					>
						{item.title}
					</Text>
				</Box>

				<Box mt={4} display='flex' alignItems='baseline'>
					<Badge borderRadius='full' px='2' colorScheme='teal'>
						Content
					</Badge>
				</Box>

				<Box>
					<Box mt='1' fontWeight='semibold' as='h4' lineHeight='tight'>
						<Text
							wordBreak='keep-all'
							as={item.isChecked ? 'del' : null}
							opacity={item.isChecked ? '0.5' : null}
						>
							{item.content}
						</Text>
					</Box>
				</Box>

				<Box display='flex' mt={4} alignItems='center'>
					<Box as='span' ml='2' color='gray.600' fontSize='sm'>
						<IconButton
							aria-label='Mark Done'
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
					</Box>

					<Box as='span' ml='2' color='gray.600' fontSize='sm'>
						<EditForm item={item}>
							<IconButton
								aria-label='Delete Item'
								variant='outline'
								size='sm'
								colorScheme='success'
								icon={<EditIcon />}
								isRound
								onClick={() => handleEdit(item)}
							/>
						</EditForm>
					</Box>

					<Box as='span' ml='2' color='gray.600' fontSize='sm'>
						<IconButton
							aria-label='Delete Item'
							variant='outline'
							size='sm'
							colorScheme='error'
							icon={<DeleteIcon />}
							isRound
							onClick={() => handleDelete({ id: item._id })}
						/>
					</Box>
				</Box>
			</Box>
		</SimpleGrid>
	)
}


export default Item