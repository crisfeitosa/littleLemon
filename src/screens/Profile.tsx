import { useState, useEffect, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { Image, Avatar, AvatarImage, AvatarFallbackText, ScrollView, Box, Card, Text, VStack, useToast, HStack, Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel, CheckboxGroup } from '@gluestack-ui/themed';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { MaskedTextInput } from 'react-native-mask-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastMessage } from '@components/ToastMessage';
import { ScreenHeader } from '@components/ScreenHeader';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { AppNavigatorRoutesProps } from '@routes/app.routes';
import { ButtonOutline } from '@components/ButtonOutline';
import { CheckIcon } from 'lucide-react-native';
import { useAuth } from '@hooks/auth';
import BackgroundImg from '@assets/background.png';

export function Profile() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { state, authActions } = useAuth();
  const toast = useToast();
  const { control } = useForm();
  const [values, setValues] = useState([]);
  const [discard, setDiscard] = useState(false);

  const [profile, setProfile] = useState({
    name: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    photo: '',
    orderStatus: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
  });

  const handleRemoveProfileImg = () => {
    setProfile((prevState) => ({
      ...prevState,
      ['photo']: ''
    }))
  }

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })

      if (photoSelected.canceled) {
        return
      }

      const photoUri = photoSelected.assets[0].uri;

      if (photoUri) {
        const photoInfo = (await FileSystem.getInfoAsync(photoUri)) as {
          size: number
        }

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            placement: 'top',
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="error"
                title="Essa imagem é muito grande. Escolha uma de até 5MB."
                onClose={() => toast.close(id)}
              />
            )
          })
        }

        setProfile((prevState) => ({
          ...prevState,
          ['photo']: photoSelected.assets[0].uri,
        }))
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleGoBack() {
    navigation.navigate('home');
  };

  useFocusEffect(
    useCallback(() => {
      const loadProfile = async () => {
        const storedProfile = await AsyncStorage.getItem('profile');

        if(storedProfile) { 
          setProfile(JSON.parse(storedProfile));
        }

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      };
      
      loadProfile();
    }, [])
  );

  return (
    <VStack flex={1} pt="$8">
      <ScreenHeader goBack={handleGoBack} withAvatar />

      <ScrollView px="$4" contentContainerStyle={{ paddingBottom: 36 }}>
        <Card size="md" variant="outline" rounded="$lg" mt="$4">
          <Image
            w="$full"
            h={350}
            resizeMode="contain"
            source={BackgroundImg}
            defaultSource={BackgroundImg}
            alt="Lemon"
            position="absolute"
            style={{ bottom: 32, left: 'auto', right: 0 }}
          />
          <VStack flex={1} gap="$4">
            <VStack gap="$6" mb="$4">
              <Text color="$gray600" fontSize="$xl" fontFamily="$bodyBold">
                Personal information
              </Text>
        
              {/* Avatar */}
              <VStack gap="$2">
                <Text color="$gray300" fontSize="$lg" fontFamily="$bodyBold">Avatar</Text>
                <HStack alignItems="center" gap="$4">
                  <Avatar 
                    bgColor="$primary" size="lg"
                    borderWidth='$2' borderColor='$primary'
                    backgroundColor='$gray100' borderRadius="$full"
                  >
                    {profile.photo ? 
                      <AvatarImage source={{ uri: profile.photo }} alt={profile.name} />
                        : (
                      <AvatarFallbackText color="$highblack">
                        {`${profile.name}${' '}${profile.lastName}`}
                      </AvatarFallbackText>
                    )}
                  </Avatar>

                  <Button
                    title="Change"
                    width="auto"
                    onPress={handleUserPhotoSelect}
                  />

                  <ButtonOutline
                    title="Remove"
                    onPress={handleRemoveProfileImg}
                    width="auto"
                  />
                </HStack>
              </VStack>
                
              {/* Name */}
              <Box gap="$2">
                <Text color="$gray300" fontSize="$lg" fontFamily="$bodyBold">First name</Text>
                <Controller 
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <Input 
                      placeholder="Name"
                      onChangeText={onChange}
                      value={value}
                      defaultValue={profile.name}
                    />
                  )}
                />
              </Box>

              {/* LastName */}
              <Box gap="$2">
                <Text color="$gray300" fontSize="$lg" fontFamily="$bodyBold">Last name</Text>
                <Controller 
                  control={control}
                  name="last_name"
                  render={({ field: { onChange, value } }) => (
                    <Input 
                      placeholder="Last name"
                      onChangeText={onChange}
                      value={value}
                      defaultValue={profile.lastName}
                    />
                  )}
                />
              </Box>

              {/* Email */}
              <Box gap="$2">
                <Text color="$gray300" fontSize="$lg" fontFamily="$bodyBold">Email</Text>
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
                      defaultValue={profile.email}
                    />
                  )}
                />
              </Box>

              {/* Phone */}
              <Box gap="$2">
                <Text color="$gray300" fontSize="$lg" fontFamily="$bodyBold">Phone number</Text>
                <Controller 
                  control={control}
                  name="phone"
                  render={({ field: { onChange, value } }) => (
                    <Input 
                      as={MaskedTextInput}  
                      mask="(999) 999-9999" 
                      placeholder="(123) 456-7890"
                      keyboardType="phone-pad"
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </Box>
            </VStack>

            <VStack gap="$6" mb="$4">
              <Text color="$gray600" fontSize="$xl" fontFamily="$bodyBold">
                Email notifications
              </Text>
              <Box gap="$2">
                <VStack gap="$4">
                  <Checkbox value={profile.orderStatus?.toString()}>
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} color="$white" bg="$primary" />
                    </CheckboxIndicator>
                    <CheckboxLabel>Order statuses</CheckboxLabel>
                  </Checkbox>
                  <Checkbox value={profile.passwordChanges?.toString()}>
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} color="$white" bg="$primary" />
                    </CheckboxIndicator>
                    <CheckboxLabel>Password changes</CheckboxLabel>
                  </Checkbox>
                  <Checkbox value={profile.specialOffers?.toString()}>
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} color="$white" bg="$primary" />
                    </CheckboxIndicator>
                    <CheckboxLabel>Special offers</CheckboxLabel>
                  </Checkbox>
                  <Checkbox value={profile.newsletter?.toString()}>
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} color="$white" bg="$primary" />
                    </CheckboxIndicator>
                    <CheckboxLabel>Newsletter</CheckboxLabel>
                  </Checkbox>
                </VStack>
              </Box>
            </VStack>

            <Button
              title="Log out"
              type="secondary"
              mt="$4"
            />

            <HStack
              justifyContent='space-between'
              alignItems='center'
              gap="$4"
              mt="$4"
            >
              <ButtonOutline
                title="Discard"
                width="45%"
                onPress={() => setDiscard(true)}
              />
              <Button
                title="Save changes"
                width="45%"
                onPress={() => {}}
              />
            </HStack>
          </VStack>
        </Card>
      </ScrollView>
    </VStack>
  )
}