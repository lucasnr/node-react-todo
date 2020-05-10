import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Container from '../components/Container';

import { getToken, removeToken } from '../services/auth';

export default function PrivateRoute({ ...props }) {
	const [loading, setLoading] = useState(true);
	const [allowed, setAllowed] = useState(false);

	const dispatch = useDispatch();
	const { token, error } = useSelector((state) => state.auth);
	useEffect(() => {
		if (token) {
			setLoading(false);
			setAllowed(true);
			return;
		}

		if (!getToken()) {
			setLoading(false);
			setAllowed(false);
			return;
		}

		dispatch({ type: '@AUTH/SIGNIN_USER_REQUESTED' });
	}, [dispatch, token]);

	useEffect(() => {
		if (error) {
			removeToken();
			setLoading(false);
			setAllowed(false);
		}
	}, [error]);

	return loading ? (
		<Container loading={true} />
	) : allowed ? (
		<Route {...props} />
	) : (
		<Redirect to="/signin" />
	);
}
