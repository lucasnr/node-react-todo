import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export default function PublicRoute({ ...props }) {
	const user = useSelector((state) => state.user);
	if (user) {
		return <Redirect to="/app" />;
	}

	return <Route {...props} />;
}
