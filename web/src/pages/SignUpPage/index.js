import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Container from '../../components/Container';
import Logo from '../../components/Logo';
import Button, { ButtonGroup } from '../../components/Button';
import Input from '../../components/Input';
import { Form } from './styles';

export default function SignUpPage() {
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();

	const handleSubmit = useCallback(
		async (data) => {
			setLoading(true);

			try {
				const schema = Yup.object().shape({
					email: Yup.string().email().required(),
					password: Yup.string().min(8).required(),
					confirm: Yup.string().oneOf(
						[Yup.ref('password'), null],
						'passwords must match'
					),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				const { email, password } = data;
				dispatch({
					type: 'SIGNUP_USER_REQUESTED',
					credentials: { email, password },
				});
			} catch (err) {
				setLoading(false);
				err.errors.forEach(toast.error);
			}
		},
		[dispatch]
	);

	const { signupError: error } = useSelector((state) => state.user);
	useEffect(() => {
		if (error) {
			setLoading(false);
			toast.error(error.message);
		}
	}, [error]);

	return (
		<Container loading={loading}>
			<Logo />

			<Form onSubmit={handleSubmit}>
				<ButtonGroup>
					<Input name="email" placeholder="Enter your e-mail" type="email" />
					<Input
						name="password"
						placeholder="Create a password"
						type="password"
					/>
					<Input
						name="confirm"
						placeholder="Confirm your password"
						type="password"
					/>

					<Button type="submit" text="Create account" variant />
				</ButtonGroup>
			</Form>
		</Container>
	);
}
