import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Container from '../../components/Container';
import Button, { ButtonGroup } from '../../components/Button';
import { Avatar } from './styles';

export default function UserPage() {
	const history = useHistory();
	const user = useSelector((state) => state.user.signed);
	const handleClick = useCallback((route) => history.push(route), [history]);

	return (
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
			</ButtonGroup>
		</Container>
	);
}
