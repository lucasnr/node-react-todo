import React from 'react';

import { Wrapper, Content, Message, Loading, LoadingContainer } from './styles';

export default function Container({ children, loading }) {
	return (
		<Wrapper>
			{loading && (
				<LoadingContainer>
					<Loading />
				</LoadingContainer>
			)}
			<Content>{children}</Content>
		</Wrapper>
	);
}

export { Message };
