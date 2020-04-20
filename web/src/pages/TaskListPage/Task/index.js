import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Title, Date, Text, Button } from './styles';

import { updateTask, deleteTask } from '../../../services/api';

export default function Task({ _id: id, title, datetime, text }) {
	const [clicked, setClicked] = useState(false);
	const history = useHistory();
	const handleClick = useCallback(() => setClicked(!clicked), [clicked]);

	const handleDone = useCallback(() => {
		updateTask(id, { done: true }).then(() => history.push('/app/tasks/done'));
	}, [id, history]);

	const handleDelete = useCallback(() => {
		deleteTask(id).then(() => history.push('/app'));
	}, [id, history]);

	const asDate = new window.Date(datetime);

	return (
		<Container clicked={clicked}>
			{clicked ? (
				<>
					<Text onClick={handleClick}>{text || 'No description'}</Text>
					<Button onClick={handleDone}>Done</Button>
					<Button onClick={handleDelete}>Delete</Button>
				</>
			) : (
				<>
					<Title onClick={handleClick}>{title}</Title>
					{datetime && (
						<Date>
							{getMonth(asDate.getMonth())}, {asDate.getDay()}
						</Date>
					)}
				</>
			)}
		</Container>
	);
}

function getMonth(month) {
	if (month === 0) return 'Jan';
	if (month === 1) return 'Feb';
	if (month === 2) return 'Mar';
	if (month === 3) return 'Apr';
	if (month === 4) return 'May';
	if (month === 5) return 'Jun';
	if (month === 6) return 'Jul';
	if (month === 7) return 'Aug';
	if (month === 8) return 'Sep';
	if (month === 9) return 'Oct';
	if (month === 10) return 'Nov';
	if (month === 11) return 'Dec';
}
