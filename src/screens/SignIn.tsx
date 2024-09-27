import React, { useState } from 'react'
import { ScrollView } from 'react-native';
import {
  Box,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { HeroSection } from '@components/HeroSection';
import { ButtonOutline } from '@components/ButtonOutline';
import { ScreenHeader } from '@components/ScreenHeader';
import { useAuth } from '@hooks/auth';

export type FormSignInProps = {
  name: string;
  lastName: string;
  email: string;
}

const signInSchema = yup.object({
  name: yup.string().required('Enter your name.'),
  lastName: yup.string().required('Enter your last name.'),
  email: yup.string().required('Enter your email').email('Invalid email.'),
});

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { authActions } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm<FormSignInProps>({
    resolver: yupResolver(signInSchema),
  });

  async function handleSignIn({ name, lastName, email }: FormSignInProps) {
    
    console.log({
      name, lastName, email
    });

    await authActions.onboard({ name, lastName, email })
  };

  function handleNewAccount() {
    navigation.navigate('signUp');
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} pt="$8">
        <ScreenHeader />

        <HeroSection />

        <VStack flex={1} gap="$5" p="$6" justifyContent='space-between'>
          <VStack gap="$4">
            <Box gap="$2">
              <Text color="$gray300" fontSize="$xl" fontFamily="$bodyBold">Name *</Text>
              <Controller 
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <Input 
                    placeholder="Name"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
            </Box>
            <Box gap="$2">
              <Text color="$gray300" fontSize="$xl" fontFamily="$bodyBold">Last name *</Text>
              <Controller 
                control={control}
                name="lastName"
                render={({ field: { onChange, value } }) => (
                  <Input 
                    placeholder="Last name"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.lastName?.message}
                  />
                )}
              />
            </Box>
            <Box gap="$2">
              <Text color="$gray300" fontSize="$xl" fontFamily="$bodyBold">Email *</Text>
              <Controller 
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input 
                    placeholder="E-mail" 
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.email?.message}
                    onSubmitEditing={handleSubmit(handleSignIn)}
                    returnKeyType="send"
                  />
                )}
              />
            </Box>

            <Button
              title="Log In"
              onPress={handleSubmit(handleSignIn)}
              mt="$6"
            />
          </VStack>

          <VStack alignItems='center'>
            <Text color="$gray300" fontSize="$md" mb="$3" fontFamily="$body">
              Don't have access yet?
            </Text>
            <ButtonOutline
              title="Create account"
              onPress={handleNewAccount}
            />
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  )
}