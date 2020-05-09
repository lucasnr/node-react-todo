import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Container from '../../components/Container';
import { Form, Button, Buttons } from './styles';
import Input from './Input';

import { storeTask } from '../../services/api';

import check from '../../assets/img/check.png';
import trash from '../../assets/img/trash.png';

export default function CreateTaskPage() {
	const [displayDate, setDisplayDate] = useState(false);
	const handleClick = useCallback(() => setDisplayDate(true), []);

	const handleSubmit = useCallback(async (data) => {
		try {
			const schema = Yup.object().shape({
				title: Yup.string().min(3),
				datetime: Yup.date().typeError('date must be valid'),
			});

			await schema.validate(data, {
				abortEarly: false,
			});

			const { title, text, datetime } = data;
			const task = { title };

			if (text !== '' && text.length < 15) {
				toast.error('text must be at least 15 characters');
				return;
			} else if (text !== '') task.text = text;

			if (datetime) task.datetime = datetime;

			storeTask(task)
				.then(() => toast.success('Task created successfully'))
				.catch(({ response }) => toast.error(response.data.message));
		} catch (err) {
			err.errors.forEach(toast.error);
		}
	}, []);

	const history = useHistory();
	const handleDiscard = useCallback(() => {
		history.push('/app');
	}, [history]);

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<section>
					<Input placeholder="Add title" name="title" autoFocus={true} />
					<Input
						textarea
						placeholder="Add description"
						name="text"
						cols="30"
						rows="5"
					/>

					{displayDate ? (
						<Input type="datetime-local" name="datetime" />
					) : (
						<Button onClick={handleClick}>Add datetime</Button>
					)}
				</section>

				<Buttons>
					<button type="submit" title="Create">
						<img src={check} alt="Check icon" />
					</button>
					<button title="Discard" onClick={handleDiscard}>
						<img src={trash} alt="Trash can icon" />
					</button>
				</Buttons>
			</Form>
		</Container>
	);
}
