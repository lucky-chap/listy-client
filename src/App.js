import React from 'react';
import { ChakraProvider } from '@chakra-ui/provider';
import customTheme from './chakra/theme'; 
import logo from './logo.svg';
import './App.css';


const App = () => {


  return (
		<ChakraProvider theme={customTheme}>
			<div className='App'>
				<header className='App-header'>
					<img src={logo} className='App-logo' alt='logo' />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<a
						className='App-link'
						href='https://reactjs.org'
						target='_blank'
						rel='noopener noreferrer'
					>
						Learn React
					</a>
				</header>
			</div>
		</ChakraProvider>
	)
}

export default App;
