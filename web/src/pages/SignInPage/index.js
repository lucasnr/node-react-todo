import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container, { Message } from '../../components/Container';
import Logo from '../../components/Logo';
import Button, { ButtonGroup } from '../../components/Button';
import Input from '../../components/Input';
import { Form } from './styles';

export default function SignInPage() {
	const [message, setMessage] = useState();
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const emailRef = useRef();
	const passwordRef = useRef();

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault();
			setLoading(true);

			const credentials = {
				email: emailRef.current.value,
				password: passwordRef.current.value,
			};

			dispatch({ type: 'SIGNIN_USER_REQUESTED', credentials });
		},
		[dispatch]
	);

	const error = useSelector((state) => state.user && state.user.error);
	useEffect(() => {
		if (error) {
			setMessage(error.message);
			setLoading(false);
		}
	}, [error]);

	return (
		<Container loading={loading}>
			{message && <Message>{message}</Message>}
			<Logo />

			<Form onSubmit={handleSubmit}>
				<ButtonGroup>
					<Input
						ref={emailRef}
						name="email"
						placeholder="E-mail"
						type="email"
					/>
					<Input
						ref={passwordRef}
						name="password"
						placeholder="Password"
						type="password"
					/>
				</ButtonGroup>

				<Button type="submit" text="Sign in" gradientText variant />
			</Form>
		</Container>
	);
}
