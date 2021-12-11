import React from 'react'
import { Box, Text, Badge, IconButton, useToast } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, CheckIcon } from '@chakra-ui/icons';
// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteItem,
	checkItem,
	getItems
} from '../redux/requests/ItemRequests'

const Item = ({ item }) => {
    
    const toast = useToast()

	const { isAuthenticated } = useSelector(state => state.auth)
    
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

	return (
		<Box
			m={3}
			maxW='sm'
			minW='sm'
			borderWidth='1px'
			borderRadius='lg'
			overflow='hidden'
		>
			<Box
				p='8'
				borderBottomWidth={item.isChecked ? '5px' : null}
				borderBottomColor={item.isChecked ? 'cyan' : null}
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
						<IconButton
							aria-label='Delete Item'
							variant='outline'
							size='sm'
							colorScheme='success'
							icon={<EditIcon />}
							isRound
						/>
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
		</Box>
	)
}


export default Item