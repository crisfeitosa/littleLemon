import { useState } from 'react';
import {
  Box,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';

import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ScreenHeader } from '@components/ScreenHeader';

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

type FormDataProps = {
  name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  last_name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  password_confirm: yup
    .string()
    .required('Confirme a senha')
    .oneOf([yup.ref('password'), ''], 'A confirmação da senha não confere.'),
});

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }

  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm((showConfirmState) => {
      return !showConfirmState
    })
  }

  function handleGoBack() {
    navigation.navigate('signIn');
  }

  function handleSignUp({ name, last_name, email, password, password_confirm }: FormDataProps) {
    console.log({
      name,
      last_name,
      email,
      password,
      password_confirm
    })
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} pt="$8">
        <ScreenHeader goBack={handleGoBack} />

        <VStack flex={1} gap="$5" p="$6">
          <Text color="$primary" fontSize="$4xl" fontFamily="$heading" textAlign='center'>
            Let us get to know you
          </Text>
          <VStack flex={1} gap="$4">
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
                name="last_name"
                render={({ field: { onChange, value } }) => (
                  <Input 
                    placeholder="Last name"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.last_name?.message}
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
                  />
                )}
              />
            </Box>
            <Box gap="$2">
              <Text color="$gray300" fontSize="$xl" fontFamily="$bodyBold">Password *</Text>
              <Controller 
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <Input 
                    placeholder="Password" 
                    onChangeText={onChange}
                    value={value}
                    type={showPassword ? "text" : "password"}
                    handleShowPassword={handleShowPassword}
                    showPassword={showPassword}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
            </Box>
            <Box gap="$2">
              <Text color="$gray300" fontSize="$xl" fontFamily="$bodyBold">Password confirm *</Text>
              <Controller 
                control={control}
                name="password_confirm"
                render={({ field: { onChange, value } }) => (
                  <Input 
                    placeholder="Password confirm" 
                    onChangeText={onChange}
                    value={value}
                    type={showPasswordConfirm ? "text" : "password"}
                    handleShowPassword={handleShowPasswordConfirm}
                    showPassword={showPasswordConfirm}
                    errorMessage={errors.password_confirm?.message}
                    onSubmitEditing={handleSubmit(handleSignUp)}
                    returnKeyType="send"
                  />
                )}
              />
            </Box>

            <Button
              title="Create account"
              onPress={handleSubmit(handleSignUp)}
              mt="$6"
            />
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  )
}