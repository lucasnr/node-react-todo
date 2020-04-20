import styled from 'styled-components';

import Button from '../../components/Button';
import { primaryColor } from '../../colors';

export const Avatar = styled.img`
	border: 2px solid ${primaryColor};
	border-radius: 50%;
	height: 180px;
	margin-bottom: 2rem !important;
	object-fit: cover;
	object-position: center;
	width: 180px;
`;

export const SignoutButton = styled(Button)`
	background-image: linear-gradient(170deg, #f44, #f38);
	margin-top: 2rem;
`;
