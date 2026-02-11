import Header from '@/components/header';
import { Container } from '@/components/layouts/container';
import { useLogin } from '@/hooks/api/auth/use-login';
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
	phoneNumber: string;
	password: string;
}

export default function LoginScreen() {
	const { t } = useTranslation();
	const theme = useTheme();
	const [showPassword, setShowPassword] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormData>({
		defaultValues: { phoneNumber: '', password: '' },
		mode: 'onBlur',
	});

	const { mutate: loginMutate } = useLogin();
	const onSubmit = handleSubmit((data) => loginMutate(data));

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
				<Header title={t('auth.title.sign-in')} />

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
								returnKeyType='next'
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
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
								secureTextEntry={!showPassword}
								autoCapitalize='none'
								returnKeyType='done'
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								error={!!errors.password}
								right={
									<TextInput.Icon
										icon={showPassword ? 'eye-off' : 'eye'}
										onPress={() => setShowPassword((s) => !s)}
									/>
								}
							/>
							<HelperText type='error' visible={!!errors.password}>
								{errors.password?.message}
							</HelperText>
						</>
					)}
				/>

				<Button mode='contained' onPress={onSubmit} style={{ marginTop: 8 }}>
					{t('auth.buttons.sign-in.enter')}
				</Button>

				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						gap: 6,
						marginTop: 8,
					}}
				>
					<Text>{t('auth.buttons.sign-in.navigation.firstPart')}</Text>
					<Link href='/(auth)/register' asChild>
						<Text style={{ color: theme.colors.primary }}>
							{t('auth.buttons.sign-in.navigation.secondPart')}
						</Text>
					</Link>
				</View>
			</View>
		</Container>
	);
}
