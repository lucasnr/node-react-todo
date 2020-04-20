import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

import Container from '../../components/Container';
import Button, { ButtonGroup } from '../../components/Button';
import { Avatar, SignoutButton } from './styles';

export default function UserPage() {
	const history = useHistory();
	const user = useSelector((state) => state.user.signed);
	const handleClick = useCallback((route) => history.push(route), [history]);

	const dispatch = useDispatch();
	const handleSignout = useCallback(() => {
		dispatch({ type: 'SIGNOUT_USER_REQUESTED' });
	}, [dispatch]);

	return user ? (
		<Container>
			<Avatar
				src={
					user.avatar_url ||
					'https://pm1.narvii.com/6279/c42f623be3d71b57c8c3fcaa2d03c182ee824dd0_hq.jpg'
				}
			/>

			<ButtonGroup>
				<Button
					onClick={() => handleClick('/app/profile')}
					text="Edit profile"
				/>

				<Button onClick={() => handleClick('/app/tasks')} text="Tasks" />

				<Button
					onClick={() => handleClick('/app/tasks/create')}
					text="Create"
					gradientText
				/>

				<SignoutButton text="Sign out" onClick={handleSignout} />
			</ButtonGroup>
		</Container>
	) : (
		<Redirect to="/signin" />
	);
}
