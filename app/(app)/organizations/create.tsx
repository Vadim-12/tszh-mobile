import { organizationForCreation } from '@/adapters/organizations/organization-for-creation';
import Header from '@/components/header';
import { Container } from '@/components/layouts/container';
import { useCreateOrganization } from '@/hooks/api/organizations/use-create-organization';
import { IOrganizationCreationDto } from '@/services/organizations-service/types';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

export default function CreateOrganizationScreen() {
	const { t } = useTranslation();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IOrganizationCreationDto>({
		defaultValues: {
			fullTitle: '',
			shortTitle: '',
			INN: '',
			email: '',
			legalAddress: '',
		},
		mode: 'onBlur',
	});

	const { mutate: createOrganizationMutate } = useCreateOrganization();

	const onSubmit = handleSubmit((data) => {
		console.log('create organization with data', data);
		createOrganizationMutate(organizationForCreation(data));
	});

	return (
		<Container>
			<Header title={t('organizations.screens.creation.title')} />
			<View>
				<Controller
					control={control}
					name='fullTitle'
					rules={{
						required: t('errors.form.required-field') as string,
					}}
					render={({ field: { value, onChange, onBlur } }) => (
						<>
							<TextInput
								label={t(
									'organizations.screens.creation.fields.fullTitle.label',
								)}
								placeholder={t(
									'organizations.screens.creation.fields.fullTitle.placeholder',
								)}
								mode='outlined'
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								returnKeyType='next'
								error={!!errors.fullTitle}
							/>
							<HelperText type='error' visible={!!errors.fullTitle}>
								{errors.fullTitle?.message}
							</HelperText>
						</>
					)}
				/>

				<Controller
					control={control}
					name='shortTitle'
					rules={{
						required: t('errors.form.required-field') as string,
					}}
					render={({ field: { value, onChange, onBlur } }) => (
						<>
							<TextInput
								label={t(
									'organizations.screens.creation.fields.shortTitle.label',
								)}
								placeholder={t(
									'organizations.screens.creation.fields.shortTitle.placeholder',
								)}
								mode='outlined'
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								returnKeyType='next'
								error={!!errors.shortTitle}
							/>
							<HelperText type='error' visible={!!errors.shortTitle}>
								{errors.shortTitle?.message}
							</HelperText>
						</>
					)}
				/>

				<Controller
					control={control}
					name='INN'
					rules={{
						required: t('errors.form.required-field') as string,
						minLength: {
							value: 10,
							message: t(
								'organizations.screens.creation.fields.INN.errors.length',
								{ n: 10 },
							),
						},
					}}
					render={({ field: { value, onChange, onBlur } }) => (
						<>
							<TextInput
								label={t('organizations.screens.creation.fields.INN.label')}
								placeholder={t(
									'organizations.screens.creation.fields.INN.placeholder',
								)}
								keyboardType='decimal-pad'
								maxLength={10}
								mode='outlined'
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								returnKeyType='next'
								error={!!errors.INN}
							/>
							<HelperText type='error' visible={!!errors.INN}>
								{errors.INN?.message}
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
							message: t(
								'organizations.screens.creation.fields.email.errors.notValid',
							) as string,
						},
					}}
					render={({ field: { value, onChange, onBlur } }) => (
						<>
							<TextInput
								label={t('organizations.screens.creation.fields.email.label')}
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
					name='legalAddress'
					rules={{
						required: t('errors.form.required-field') as string,
					}}
					render={({ field: { value, onChange, onBlur } }) => (
						<>
							<TextInput
								label={t(
									'organizations.screens.creation.fields.legalAddress.label',
								)}
								placeholder={t(
									'organizations.screens.creation.fields.legalAddress.placeholder',
								)}
								mode='outlined'
								value={value}
								onChangeText={onChange}
								onBlur={onBlur}
								returnKeyType='next'
								error={!!errors.legalAddress}
							/>
							<HelperText type='error' visible={!!errors.legalAddress}>
								{errors.legalAddress?.message}
							</HelperText>
						</>
					)}
				/>

				<Button mode='contained' icon='plus' onPress={onSubmit}>
					{t('organizations.screens.creation.submit')}
				</Button>
			</View>
		</Container>
	);
}
