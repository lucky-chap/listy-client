import {
	Button,
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	Alert,
	AlertIcon,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/requests/AuthRequests'
import { clearErrors } from '../redux/slices/ErrorSlice'

const Login = ({ variant = 'link' }) => {
	const error = useSelector(state => state.error)
	const { isAuthenticated } = useSelector(state => state.auth)
	const dispatch = useDispatch()

	const { isOpen, onOpen, onClose } = useDisclosure()

	// form hook
	const { handleSubmit, register, formState } = useForm()
	const { isSubmitting, isSubmitted, errors } = formState

	const onSubmit = async values => {
		dispatch(clearErrors())
		// Attempt to register
		dispatch(
			loginUser({ email: values.email, password: values.password })
		)

		if (isAuthenticated) onClose()
	}


	const [didMount, setDidMount] = useState(false)

	useEffect(() => {
		setDidMount(true)
		return () => setDidMount(false)
	}, [])

	if (!didMount) {
		return null
	}

	return (
		<>
			<Button colorScheme='primary' variant={variant} size='sm' onClick={onOpen}>
				Sign In
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent width={{ base: '90%', md: '400px' }}>
					<ModalHeader>Sign In</ModalHeader>
					<ModalCloseButton />
					{error.id === 'LOGIN_FAIL' && isSubmitted === true && (
						<Alert status='error'>
							<AlertIcon />
							{error.msg}
						</Alert>
					)}
					<form onSubmit={handleSubmit(onSubmit)}>
						<ModalBody pb={6}>
							<FormControl isInvalid={errors.email}>
								<FormLabel>Email</FormLabel>
								<Input
									placeholder='Email'
									name='email'
									{...register('email', { required: 'Email is required' })}
									autoFocus
								/>
								<FormErrorMessage>
									{errors.email && errors.email.message}
								</FormErrorMessage>
							</FormControl>

							<FormControl mt={4} isInvalid={errors.password}>
								<FormLabel>Password</FormLabel>
								<Input
									placeholder='Password'
									type='password'
									name='password'
									{...register('password', { required: 'Password is required' })}
								/>
								<FormErrorMessage>
									{errors.password && errors.password.message}
								</FormErrorMessage>
							</FormControl>
						</ModalBody>

						<ModalFooter>
							<Button
								type='submit'
								colorScheme='success'
								isLoading={isSubmitting}
								loadingText='Hang tight..'
								m='0'
								w='100%'
							>
								Sign In
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	)
}

export default Login
