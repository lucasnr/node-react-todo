import styled from 'styled-components';
import { Form as UnformForm } from '@unform/web';

export const Form = styled(UnformForm)`
	width: 100%;

	& > button {
		display: block;
		margin: auto;
		margin-top: 4rem;
	}
`;
