import styled from 'styled-components';
import { commonStyles } from '../styles';

export const InputContainer = styled.input`
	${commonStyles}

	&:first-child {
		font-size: 1.75rem;
	}
`;

export const TextareaContainer = styled.textarea`
	${commonStyles}
`;
