import Header from '@/components/header';
import { Container } from '@/components/layouts/container';
import { useRegister } from '@/hooks/api/auth/use-register';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import {
	Button,
	HelperText,
	Text,
	TextInput,
	useTheme,
} from 'react-native-paper';

interface IFormData {
	fullName: string;
	phoneNumber: string;
	email?: string;
	password: string;
	passwordConfirm: string;
}

export default function RegisterScreen() {
	const { t } = useTranslation();
	const theme = useTheme();

	const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);
	const [passwordConfirmIsVisible, setPasswordConfirmIsVisible] =
		useState<boolean>(false);

	const {
		control,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<IFormData>({
		defaultValues: {
			fullName: '',
			phoneNumber: '',
			email: '',
			password: '',
			passwordConfirm: '',
		},
		mode: 'onBlur',
	});

	const { mutate: mutateRegister } = useRegister();
	const onSubmit = handleSubmit((data) => {
		mutateRegister(data);
	});

	return (
		<Container withKeyboard withScroll>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					gap: 5,
					maxWidth: 560,
					alignSelf: 'center',
					width: '100%',
				}}
			>
				<Header title={t('auth.title.sign-up')} />

				<Controller
					control={control}
					name='fullName'
					rules={{
						required: t('errors.form.required-field') as string,
						pattern: {
							value: /^[А-ЯA-Z][а-яa-z]+\s+[А-ЯA-Z][а-яa-z]+/,
							message: t('auth.fields.fullName.errors.notValid') as string,
						},
					}}
					render={({ field: { value, onChange, onBlur } }) => (
						<>
							<TextInput
								label={t('auth.fields.fullName.label')}
								mode='outlined'
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								autoCapitalize='words'
								returnKeyType='next'
								error={!!errors.fullName}
							/>
							<HelperText type='error' visible={!!errors.fullName}>
								{errors.fullName?.message}
							</HelperText>
						</>
					)}
				/>

				<Controller
					control={control}
					name='email'
					rules={{
						required: t('errors.form.required-field') as string,
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: t('auth.fields.email.errors.notValid') as string,
						},
					}}
					render={({ field: { value, onChange, onBlur } }) => (
						<>
							<TextInput
								label={t('auth.fields.email.label')}
								mode='outlined'
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								autoCapitalize='none'
								keyboardType='email-address'
								returnKeyType='next'
								error={!!errors.email}
							/>
							<HelperText type='error' visible={!!errors.email}>
								{errors.email?.message}
							</HelperText>
						</>
					)}
				/>

				<Controller
					control={control}
					name='phoneNumber'
					rules={{
						required: t('errors.form.required-field') as string,
						pattern: {
							value: /^[0-9+\-() ]{6,20}$/,
							message: t('auth.fields.phoneNumber.errors.notValid') as string,
						},
					}}
					render={({ field: { value, onChange, onBlur } }) => (
						<>
							<TextInput
								label={t('auth.fields.phoneNumber.label')}
								mode='outlined'
								keyboardType='phone-pad'
								autoComplete='tel'
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								returnKeyType='next'
								error={!!errors.phoneNumber}
							/>
							<HelperText type='error' visible={!!errors.phoneNumber}>
								{errors.phoneNumber?.message}
							</HelperText>
						</>
					)}
				/>

				<Controller
					control={control}
					name='password'
					rules={{
						required: t('errors.form.required-field') as string,
						minLength: {
							value: 6,
							message: t('auth.fields.password.errors.minLength', {
								n: 6,
							}) as string,
						},
					}}
					render={({ field: { value, onChange, onBlur } }) => (
						<>
							<TextInput
								label={t('auth.fields.password.label')}
								mode='outlined'
								secureTextEntry={!passwordIsVisible}
								autoCapitalize='none'
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								right={
									<TextInput.Icon
										icon={passwordIsVisible ? 'eye-off' : 'eye'}
										onPress={() =>
											setPasswordIsVisible((isVisible) => !isVisible)
										}
									/>
								}
								error={!!errors.password}
							/>
							<HelperText type='info' visible>
								{t('auth.fields.password.hint', { n: 6 })}
							</HelperText>
							{errors.password?.message && (
								<HelperText type='error' visible={!!errors.password}>
									{errors.password?.message}
								</HelperText>
							)}
						</>
					)}
				/>

				<Controller
					control={control}
					name='passwordConfirm'
					rules={{
						required: t('errors.form.required-field') as string,
						validate: (value) =>
							value === getValues('password') ||
							t('auth.fields.passwordConfirm.errors.notMatch'),
					}}
					render={({ field: { value, onChange, onBlur } }) => (
						<>
							<TextInput
								label={t('auth.fields.passwordConfirm.label')}
								mode='outlined'
								secureTextEntry={!passwordConfirmIsVisible}
								autoCapitalize='none'
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								right={
									<TextInput.Icon
										icon={passwordConfirmIsVisible ? 'eye-off' : 'eye'}
										onPress={() =>
											setPasswordConfirmIsVisible((isVisible) => !isVisible)
										}
									/>
								}
								error={!!errors.passwordConfirm}
							/>
							<HelperText type='error' visible={!!errors.passwordConfirm}>
								{errors.passwordConfirm?.message}
							</HelperText>
						</>
					)}
				/>

				<Button mode='contained' onPress={onSubmit}>
					{t('auth.buttons.sign-up.enter')}
				</Button>

				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						gap: 6,
						marginTop: 8,
					}}
				>
					<Text>{t('auth.buttons.sign-up.navigation.firstPart')}</Text>
					<Link href='/(auth)/login' asChild>
						<Text style={{ color: theme.colors.primary }}>
							{t('auth.buttons.sign-up.navigation.secondPart')}
						</Text>
					</Link>
				</View>
			</View>
		</Container>
	);
}
