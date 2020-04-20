import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { getToken } from '../services/auth';

export default function PublicRoute({ ...props }) {
	const user = useSelector((state) => state.user.signed);
	if (user || getToken()) return <Redirect to="/app" />;

	return <Route {...props} />;
}
