import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Container from '../components/Container';

import { getToken, removeToken } from '../services/auth';

export default function PrivateRoute({ ...props }) {
	const [loading, setLoading] = useState(true);
	const [allowed, setAllowed] = useState(false);

	const dispatch = useDispatch();
	const { signed: user, error } = useSelector((state) => state.user);
	useEffect(() => {
		if (user) {
			setLoading(false);
			setAllowed(true);
			return;
		}

		if (!getToken()) {
			setLoading(false);
			setAllowed(false);
			return;
		}

		dispatch({ type: 'SET_USER_REQUESTED' });
	}, [dispatch, user]);

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
		<Redirect to="/" />
	);
}
