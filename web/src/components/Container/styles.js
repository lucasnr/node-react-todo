import React from 'react';
import styled, { keyframes } from 'styled-components';

import { backgroundColor, primaryColor, secondaryColor } from '../../colors';

export const Wrapper = styled.main`
	align-items: center;
	background-color: ${backgroundColor};
	display: flex;
	justify-content: center;
	min-height: 100vh;
`;

export const Content = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin: auto;
	max-width: 362px;
	min-height: 100vh;
	padding: 1rem 2.5rem;
	position: relative;
	width: 100%;

	& > * {
		margin-bottom: 3rem;
		margin-top: 1rem;

		&:last-child {
			margin-bottom: auto;
		}
	}
`;

export const Message = styled.span`
	background-color: rgba(12, 12, 12, 0.875);
	bottom: 0px;
	color: ${(props) => (props.success ? '#4b4' : '#b44')};
	font-size: 0.75rem;
	font-size: bold;
	left: 0px;
	line-height: 2;
	margin: 0px !important;
	padding: 0.5rem;
	position: fixed;
	text-align: center;
	width: 100%;
	z-index: 5;
`;

const rotate = keyframes`
  0% {
    border-color: ${primaryColor};
    transform: rotate(0deg);
  }

  50% {
    border-color: ${secondaryColor};
  }

  100% {
    border-color: ${primaryColor};
    transform: rotate(360deg);
  }
`;

const background = keyframes`
  0% {
    background-color: ${primaryColor};
  }

  50% {
    background-color: ${secondaryColor};
  }

  100% {
    background-color: ${primaryColor};
  }
`;

export const LoadingContent = styled.span`
	animation: ${rotate} 0.75s linear infinite forwards;
	background-color: transparent;
	border: 4px solid;
	border-radius: 50%;
	padding: 4rem;

	&::after {
		animation: ${background} 0.75s linear infinite forwards;
		border-radius: 50%;
		content: ' ';
		height: 4rem;
		left: 0;
		position: absolute;
		width: 4rem;
	}
`;

export const Loading = styled.div`
	align-items: center;
	background-color: ${backgroundColor};
	display: flex;
	height: 100vh;
	justify-content: center;
	position: fixed;
	width: 100vw;
	z-index: 5;
`;

Loading.defaultProps = {
	children: <LoadingContent />,
};

export const GoBackButton = styled.button`
	background-color: transparent;
	border: none;
	border-radius: 0.25rem;
	color: #fff;
	display: flex;
	font-size: 0.75rem;
	margin: 0px;
	margin-bottom: auto !important;
	margin-right: auto;
	padding: 0.625rem 1rem;
	padding-left: 0px;
`;

GoBackButton.defaultProps = {
	children: (
		<svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
			/>
		</svg>
	),
};
