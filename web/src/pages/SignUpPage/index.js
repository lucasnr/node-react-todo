import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container, { Message } from '../../components/Container';
import Logo from '../../components/Logo';
import Button, { ButtonGroup } from '../../components/Button';
import Input from '../../components/Input';
import { Form } from './styles';

export default function SignUpPage() {
	const [message, setMessage] = useState();
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPassRef = useRef();

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault();
			setLoading(true);

			const password = passwordRef.current.value;
			const passwordConfirm = confirmPassRef.current.value;

			if (password !== passwordConfirm) {
				setMessage("Passwords don't match");
				setLoading(false);
				return;
			} else setMessage(null);

			const email = emailRef.current.value;
			dispatch({
				type: 'SIGNUP_USER_REQUESTED',
				credentials: { email, password },
			});
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
						name="email"
						placeholder="Enter your e-mail"
						type="email"
						ref={emailRef}
					/>
					<Input
						name="password"
						placeholder="Create a password"
						type="password"
						ref={passwordRef}
					/>
					<Input
						placeholder="Confirm your password"
						type="password"
						ref={confirmPassRef}
					/>

					<Button type="submit" text="Create account" variant />
				</ButtonGroup>
			</Form>
		</Container>
	);
}
