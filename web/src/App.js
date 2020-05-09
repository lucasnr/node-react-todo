import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import store from './store';
import GlobalStyle from './styles/GlobalStyle';
import Routes from './routes';

export default function App() {
	return (
		<Provider store={store}>
			<Router>
				<GlobalStyle />
				<Routes />
				<ToastContainer autoClose={4000} />
			</Router>
		</Provider>
	);
}
