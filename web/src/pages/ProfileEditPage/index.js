import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container, { Message } from '../../components/Container';
import Button, { ButtonGroup } from '../../components/Button';
import { AvatarContainer, Avatar, Input, Form } from './styles';

export default function ProfileEditPage() {
	const [displayPass, setDisplayPass] = useState(false);
	const [message, setMessage] = useState();
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const { signed: user, updateResponse: response } = useSelector(
		(state) => state.user
	);

	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	const handleSubmit = useCallback(
		(event) => {
			event.preventDefault();
			setMessage(null);
			setLoading(true);

			const newUser = {
				id: user._id,
			};

			const { value: email } = emailRef.current;
			if (email !== user.email) newUser.email = email;
			if (passwordRef.current) newUser.password = passwordRef.current.value;
			const { value: name } = nameRef.current;
			if (name !== '') newUser.name = name;

			dispatch({ type: 'UPDATE_USER_REQUESTED', user: newUser });
		},
		[dispatch, user]
	);
	const handleClick = useCallback(() => setDisplayPass(true), []);

	useEffect(() => {
		if (!response) return;

		if (response.error)
			setMessage({ text: response.error.message, success: false });
		else setMessage({ text: 'User updated successfully', success: true });

		setLoading(false);
	}, [response]);

	return (
		<Container loading={loading}>
			{message && <Message success={message.success}>{message.text}</Message>}
			<AvatarContainer>
				<Avatar
					src={
						user.avatar_url ||
						'https://pm1.narvii.com/6279/c42f623be3d71b57c8c3fcaa2d03c182ee824dd0_hq.jpg'
					}
				/>
				<button />
			</AvatarContainer>

			<Form onSubmit={handleSubmit}>
				<ButtonGroup>
					<Input
						placeholder="Enter your name"
						name="name"
						ref={nameRef}
						defaultValue={user.name}
					/>
					<Input
						placeholder="Enter your e-mail"
						name="email"
						type="email"
						ref={emailRef}
						defaultValue={user.email}
					/>

					{displayPass ? (
						<Input
							placeholder="Enter your new password"
							name="password"
							type="password"
							ref={passwordRef}
						/>
					) : (
						<Button onClick={handleClick} text="Change your password" />
					)}
				</ButtonGroup>

				<Button type="submit" text="Save" variant />
			</Form>
		</Container>
	);
}
