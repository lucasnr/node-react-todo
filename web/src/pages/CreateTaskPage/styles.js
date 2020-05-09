import styled, { css } from 'styled-components';
import { Form as UnformForm } from '@unform/web';

export const commonStyles = css`
	border: none;
	background: none;
	color: #fff;
	font-size: 1rem;
	margin-bottom: 1.5rem !important;
	width: 100%;

	&::placeholder {
		color: #fff;
	}
`;

export const Form = styled(UnformForm)``;

export const Button = styled.button`
	${commonStyles}
	text-align: left;
`;

export const Buttons = styled.section`
	display: grid;
	grid-gap: 1.5rem;
	margin-left: auto;
	margin-top: 3rem;

	button {
		align-items: center;
		background: #fff;
		border: none;
		border-radius: 50%;
		display: flex;
		height: 4rem;
		justify-content: center;
		margin-left: auto;
		width: 4rem;
	}
`;
