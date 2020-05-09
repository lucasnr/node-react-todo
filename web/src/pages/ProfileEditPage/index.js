import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Container from '../../components/Container';
import Button, { ButtonGroup } from '../../components/Button';
import { AvatarContainer, Avatar, Input, Form } from './styles';

export default function ProfileEditPage() {
	const [displayPass, setDisplayPass] = useState(false);
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	const { signed: user, updateResponse: response } = useSelector(
		(state) => state.user
	);

	const handleSubmit = useCallback(
		async (data) => {
			setLoading(true);

			try {
				const schema = Yup.object().shape({
					name: Yup.string().min(4),
					email: Yup.string().email(),
					password: Yup.string().min(8),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				const { email, name, password } = data;
				const toUpdate = {
					id: user._id,
					name,
				};

				if (email !== user.email) toUpdate.email = email;
				if (password) toUpdate.password = password;

				dispatch({ type: 'UPDATE_USER_REQUESTED', user: toUpdate });
			} catch (err) {
				setLoading(false);
				err.errors.forEach(toast.error);
			}
		},
		[dispatch, user]
	);
	const handleClick = useCallback(() => setDisplayPass(true), []);

	useEffect(() => {
		if (!response) return;

		if (response.error) toast.error(response.error.message);
		else toast.success('User updated successfully');

		setLoading(false);
	}, [response]);

	return (
		<Container loading={loading}>
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
						defaultValue={user.name}
					/>
					<Input
						placeholder="Enter your e-mail"
						name="email"
						type="email"
						defaultValue={user.email}
					/>

					{displayPass ? (
						<Input
							placeholder="Enter your new password"
							name="password"
							type="password"
						/>
					) : (
						<Button
							type="button"
							onClick={handleClick}
							text="Change your password"
						/>
					)}
				</ButtonGroup>

				<Button type="submit" text="Save" variant />
			</Form>
		</Container>
	);
}
