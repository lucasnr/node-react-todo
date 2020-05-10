import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import Container from '../../components/Container';
import Logo from '../../components/Logo';
import Button, { ButtonGroup } from '../../components/Button';
import Input from '../../components/Input';
import { Form } from './styles';

export default function SignInPage() {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const handleSubmit = useCallback(
		async (data) => {
			setLoading(true);

			try {
				const schema = Yup.object().shape({
					email: Yup.string().email().required(),
					password: Yup.string().min(8).required(),
				});

				await schema.validate(data, {
					abortEarly: false,
				});

				const credentials = {
					email: data.email,
					password: data.password,
				};

				dispatch({ type: '@AUTH/SIGNIN_USER_REQUESTED', credentials });
			} catch (err) {
				setLoading(false);
				err.errors.forEach(toast.error);
			}
		},
		[dispatch]
	);

	const { error } = useSelector((state) => state.auth);
	useEffect(() => {
		if (error) {
			toast.error(error.message);
			setLoading(false);
		}
	}, [error]);

	return (
		<Container loading={loading}>
			<Logo />

			<Form onSubmit={handleSubmit}>
				<ButtonGroup>
					<Input name="email" placeholder="E-mail" type="email" />
					<Input name="password" placeholder="Password" type="password" />
				</ButtonGroup>

				<Button type="submit" text="Sign in" gradientText variant />
			</Form>
		</Container>
	);
}
