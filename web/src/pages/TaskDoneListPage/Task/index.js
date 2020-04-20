import React from 'react';

import { Container, Title } from './styles';

export default function Task({ title }) {
	return (
		<Container>
			<Title>{title}</Title>
		</Container>
	);
}
