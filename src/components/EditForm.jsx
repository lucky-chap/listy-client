import React, { useState } from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
	ModalBody,
	Button,
	FormControl,
	FormLabel,
    Input,
    FormErrorMessage,
    useToast,
    useDisclosure
} from '@chakra-ui/react'

import { useSelector, useDispatch } from 'react-redux'

import { useForm } from 'react-hook-form'
import { getItems, updateItem } from '../redux/requests/ItemRequests'


const EditForm = ({ children, item }) => {

    const [title, setTitle] = useState(item ? item.title : '')
    const [content, setContent] = useState(item ? item.content : '')

    const titleHandler = e => {
        setTitle(e.target.value);
	}

    const contentHandler = e => {
        setContent(e.target.value);
    }

    const toast = useToast()

    const dispatch = useDispatch()

    const { isAuthenticated } = useSelector(state => state.auth)

    const { isOpen, onOpen, onClose } = useDisclosure()

	const { handleSubmit, register, formState } = useForm()
    const { isSubmitting, errors } = formState
    

    const onSubmit = async (values, e) => {
        e.preventDefault()
        console.log(item._id);
        dispatch(
            updateItem({
                id: item._id,
                title: values.title,
                content: values.content,
            })
        );
        dispatch(getItems())
        e.target.reset()
        onClose()
	}
    
    const handleShowModal = () => {
			if (isAuthenticated) {
				onOpen()
			} else {
				toast({
					title: 'Unauthorised access',
					description: 'Please login to add an item.',
					status: 'error',
					duration: 3000,
					isClosable: true,
				})
			}
		}

	return (
		<div className=''>
            <span
				onClick={handleShowModal}
			>
				{children}
			</span>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent width={{ base: '90%', md: '400px' }}>
					<ModalHeader>Update Item</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalBody pb={6}>
							<FormControl isInvalid={errors.title}>
								<FormLabel>Update the title</FormLabel>
								<Input
									placeholder='Title'
									name='title'
									value={title}
									{...register('title', { required: 'Title is required' })}
                                    autoFocus
                                    onChange={titleHandler}
								/>
								<FormErrorMessage>
									{errors.title && errors.title.message}
								</FormErrorMessage>
							</FormControl>

							<FormControl isInvalid={errors.title} mb='1rem' mt={2}>
								<FormLabel>Update the content</FormLabel>
								<Input
									placeholder='Content'
									name='content'
									value={content}
									{...register('content', {
										required: 'Content is required',
									})}
                                    autoFocus
                                    onChange={contentHandler}
								/>
								<FormErrorMessage>
									{errors.content && errors.content.message}
								</FormErrorMessage>
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button
								type='submit'
								colorScheme='success'
								mr={3}
								isLoading={isSubmitting}
								loadingText='Stay put..'
							>
								Update
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</div>
	)
}


export default EditForm