import React from 'react';
import { Switch } from 'react-router-dom';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import HomePage from '../pages/HomePage';
import SignUpPage from '../pages/SignUpPage';
import SignInPage from '../pages/SignInPage';

import UserPage from '../pages/UserPage';
import ProfileEditPage from '../pages/ProfileEditPage';
import TaskListPage from '../pages/TaskListPage';
import CreateTaskPage from '../pages/CreateTaskPage';
import TaskDoneListPage from '../pages/TaskDoneListPage';

export default function Routes() {
	return (
		<Switch>
			<PublicRoute path="/" exact component={HomePage} />
			<PublicRoute path="/signup" exact component={SignUpPage} />
			<PublicRoute path="/signin" exact component={SignInPage} />

			<PrivateRoute path="/app" exact component={UserPage} />
			<PrivateRoute path="/app/profile" exact component={ProfileEditPage} />
			<PrivateRoute path="/app/tasks" exact component={TaskListPage} />
			<PrivateRoute path="/app/tasks/create" exact component={CreateTaskPage} />
			<PrivateRoute path="/app/tasks/done" exact component={TaskDoneListPage} />
		</Switch>
	);
}
