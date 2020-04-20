import styled from 'styled-components';

const ScrollContainer = styled.section`
	background-color: #fff;
	border-radius: 40px;
	height: 20rem;
	overflow-y: scroll;
	padding: 1rem;
	width: 100%;
`;

export const ShowMore = styled.button`
	border: none;
	background: none;
	font-size: 0.75rem;
	margin-top: 2rem;
	text-align: center;
	width: 100%;
`;

export const NoContent = styled.h6`
	font-size: 1rem;
	font-weight: normal;
	line-height: 1.5;
	margin: 1rem 0px;
	padding: 0px 0.5rem;
	text-align: center;
	width: 100%;
`;

NoContent.defaultProps = {
	children: 'No content',
};

export default ScrollContainer;
