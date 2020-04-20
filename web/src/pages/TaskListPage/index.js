import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import Container from '../../components/Container';
import ScrollContainer, { ShowMore } from '../../components/ScrollContainer';
import Button from '../../components/Button';
import Title from '../../components/Title';
import Task from './Task';

import { listTasks } from '../../services/api';

export default function TaskListPage() {
	const [tasks, setTasks] = useState();
	const [loading, setLoading] = useState(true);
	const history = useHistory();

	const handleClick = useCallback(() => history.push('/app/tasks/done'), [
		history,
	]);

	const handleShowMore = useCallback(() => {
		listTasks(false, tasks.page + 1).then(({ data }) => {
			console.log(data);
			setTasks({ ...data, content: [...tasks.content, ...data.content] });
		});
	}, [tasks]);

	useEffect(() => {
		async function fetchData() {
			const { data: tasks } = await listTasks();
			setTasks(tasks);
			setLoading(false);
		}
		fetchData();
	}, []);

	const more = useMemo(() => {
		if (!tasks) return 0;

		if (tasks.page !== tasks.totalPages - 2) return tasks.size;

		return tasks.totalElements % tasks.size === 0
			? tasks.size
			: tasks.totalElements % tasks.size;
	}, [tasks]);

	return (
		<Container loading={loading}>
			<Title>Tasks</Title>

			<ScrollContainer>
				{tasks &&
					tasks.content.map((item) => <Task key={item._id} {...item} />)}

				{tasks && !tasks.last && (
					<ShowMore onClick={handleShowMore}>
						Show {more} more {more === 1 ? 'task' : 'tasks'}
					</ShowMore>
				)}
			</ScrollContainer>

			<Button onClick={handleClick} text="Done tasks" />
		</Container>
	);
}
