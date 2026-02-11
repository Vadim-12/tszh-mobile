import { ErrorMessage } from '@/components/error-message';
import { Field } from '@/components/field';
import Header from '@/components/header';
import { Container } from '@/components/layouts/container';
import { Loader } from '@/components/loader';
import { useOrganization } from '@/hooks/api/organizations/use-organization';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-native-paper';

interface IParams {
  id: string;
  [key: string]: string;
}

export default function OrganizationScreen() {
  const { t } = useTranslation();

  const { id } = useLocalSearchParams<IParams>();
  const { data, isLoading, error } = useOrganization(id);

  const [isUserInOrganization, setIsUserInOrganization] = useState<boolean>(false);

  const handleJoin = async () => {
    console.log('join to organization');
    setIsUserInOrganization(true);
  };
  const handleLeave = async () => {
    console.log('leave from organization');
    setIsUserInOrganization(false);
  };

  return (
    <Container>
      {isLoading || !data ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error.message} />
      ) : (
        <>
          <Header title={data.shortTitle} />
          <Field
            label={t('organizations.screens.specifiedOrganization.fields.fullTitle')}
            value={data.fullTitle}
          />
          <Field
            label={t('organizations.screens.specifiedOrganization.fields.INN')}
            value={data.INN}
          />
          <Field
            label={t('organizations.screens.specifiedOrganization.fields.email')}
            value={data.email}
          />
          <Field
            label={t('organizations.screens.specifiedOrganization.fields.legalAddress')}
            value={data.legalAddress}
          />

          {isUserInOrganization ? (
            <Button onPress={handleLeave}>
              {t('organizations.screens.specifiedOrganization.actions.leave')}
            </Button>
          ) : (
            <Button onPress={handleJoin}>
              {t('organizations.screens.specifiedOrganization.actions.join')}
            </Button>
          )}
        </>
      )}
    </Container>
  );
}
