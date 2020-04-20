import React, { useState, useCallback } from 'react';

import { Container, Title, Date, Text, Button } from './styles';

import { updateTask, deleteTask } from '../../../services/api';

export default function Task({ _id: id, title, datetime, text }) {
	const [clicked, setClicked] = useState(false);
	const [render, setRender] = useState(true);
	const handleClick = useCallback(() => setClicked(!clicked), [clicked]);

	const handleDone = useCallback(() => {
		updateTask(id, { done: true }).then(() => setRender(false));
	}, [id]);

	const handleDelete = useCallback(() => {
		deleteTask(id).then(() => setRender(false));
	}, [id]);

	const asDate = new window.Date(datetime);

	return render ? (
		<Container clicked={clicked}>
			{clicked ? (
				<>
					<Text onClick={handleClick}>{text || 'Sem descrição'}</Text>
					<Button onClick={handleDone}>Concluir</Button>
					<Button onClick={handleDelete}>Excluir</Button>
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
	) : null;
}

function getMonth(month) {
	if (month === 0) return 'Jan';
	if (month === 1) return 'Fev';
	if (month === 2) return 'Mar';
	if (month === 3) return 'Abr';
	if (month === 4) return 'Mai';
	if (month === 5) return 'Jun';
	if (month === 6) return 'Jul';
	if (month === 7) return 'Ago';
	if (month === 8) return 'Set';
	if (month === 9) return 'Out';
	if (month === 10) return 'Nob';
	if (month === 11) return 'Dez';
}
