import React, { useState, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import Container, { Message } from '../../components/Container';
import { Input, Textarea, Button, Buttons } from './styles';

import { storeTask } from '../../services/api';

import check from '../../assets/img/check.png';
import trash from '../../assets/img/trash.png';

export default function CreateTaskPage() {
	const [message, setMessage] = useState();
	const [displayDate, setDisplayDate] = useState(false);
	const handleClick = useCallback(() => setDisplayDate(true), []);

	const titleRef = useRef();
	const textRef = useRef();
	const datetimeRef = useRef();

	const handleCreate = useCallback(() => {
		setMessage(null);

		const task = {
			title: titleRef.current.value,
		};

		const text = textRef.current.value;
		if (text !== '') task.text = text;
		if (datetimeRef.current) {
			task.datetime = datetimeRef.current.value;
			if (task.datetime === '') {
				setMessage({ text: 'Invalid datetime', success: false });
				return;
			}
		}
		if (task.title === '') {
			setMessage({ text: 'Invalid title', success: false });
			return;
		}

		storeTask(task)
			.then(() =>
				setMessage({
					text: 'Task created successfully',
					success: true,
				})
			)
			.catch(({ response }) =>
				setMessage({ text: response.data.message, success: false })
			);
	}, []);

	const history = useHistory();
	const handleDiscard = useCallback(() => {
		history.push('/app');
	}, [history]);

	return (
		<Container>
			{message && <Message success={message.success}>{message.text}</Message>}
			<section>
				<Input ref={titleRef} placeholder="Add title" />
				<Textarea
					ref={textRef}
					placeholder="Add description"
					cols="30"
					rows="5"
				/>

				{displayDate ? (
					<Input ref={datetimeRef} type="datetime-local" />
				) : (
					<Button onClick={handleClick}>Add datetime</Button>
				)}
			</section>

			<Buttons>
				<button title="Create" onClick={handleCreate}>
					<img src={check} alt="Check icon" />
				</button>
				<button title="Discard" onClick={handleDiscard}>
					<img src={trash} alt="Trash can icon" />
				</button>
			</Buttons>
		</Container>
	);
}
