import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { Wrapper, Content, Loading, GoBackButton } from './styles';

export default function Container({ children, loading }) {
	const history = useHistory();
	const handleClick = useCallback(() => {
		history.goBack();
	}, [history]);

	return (
		<Wrapper>
			{loading && <Loading />}
			<Content>
				<GoBackButton onClick={handleClick} />
				{children}
			</Content>
		</Wrapper>
	);
}
