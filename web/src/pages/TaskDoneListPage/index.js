import React, { useEffect, useState, useCallback, useMemo } from 'react';

import Container from '../../components/Container';
import ScrollContainer, { ShowMore } from '../../components/ScrollContainer';
import Title from '../../components/Title';
import Task from './Task';

import { listTasks } from '../../services/api';

export default function TaskDoneListPage() {
	const [tasks, setTasks] = useState();

	const handleShowMore = useCallback(() => {
		listTasks(true, tasks.page + 1).then(({ data }) =>
			setTasks({ ...data, content: [...tasks.content, ...data.content] })
		);
	}, [tasks]);

	useEffect(() => {
		listTasks(true).then(({ data }) => setTasks(data));
	}, []);

	const more = useMemo(() => {
		if (!tasks) return 0;

		if (tasks.page !== tasks.totalPages - 2) return tasks.size;

		return tasks.totalElements % tasks.size === 0
			? tasks.size
			: tasks.totalElements % tasks.size;
	}, [tasks]);

	return (
		<Container>
			<Title>Done Tasks</Title>

			<ScrollContainer>
				{tasks &&
					tasks.content.map((item) => <Task key={item._id} {...item} />)}

				{tasks && !tasks.last && (
					<ShowMore onClick={handleShowMore}>
						Show {more} more {more === 1 ? 'task' : 'tasks'}
					</ShowMore>
				)}
			</ScrollContainer>

			<span />
		</Container>
	);
}
