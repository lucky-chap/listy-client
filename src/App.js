import ItemsList from './components/ItemsList';
import React, { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/provider';
import { useDispatch } from 'react-redux';
import customTheme from './chakra/theme';
import './App.css';


// load user action
import { loadUser } from './redux/requests/AuthRequests';


const App = () => {

	const dispatch = useDispatch();

	// whenever the user logs in, dispatch this action
	// this makes the user stay logged in even after page refresh
	useEffect(() => {
		dispatch(loadUser())
	}, [])


  return (
		<ChakraProvider theme={customTheme}>
			  <ItemsList />
		</ChakraProvider>
	)
}

export default App;
