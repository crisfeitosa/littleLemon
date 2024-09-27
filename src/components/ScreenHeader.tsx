import { useEffect, useState } from 'react';
import { Pressable, Center, HStack, Icon, Avatar, AvatarImage, AvatarFallbackText } from '@gluestack-ui/themed';
import Logo from '@assets/logo.svg';
import { MoveLeftIcon } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

type Props = {
  goBack?: () => void;
  withAvatar?: boolean;
}

export function ScreenHeader({ goBack, withAvatar }: Readonly<Props>) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const isFocused = useIsFocused();
  const [profile, setProfile] = useState({
    name: '',
    lastName: '',
    photo: '',
  });

  const loadProfile = async () => {
    const storedProfile = await AsyncStorage.getItem('profile');

    if (storedProfile) {
      setProfile(JSON.parse(storedProfile))
    }
  };

  useEffect(() => {
    if (isFocused && withAvatar) {
      loadProfile();
    }
  }, [isFocused, withAvatar]);

  return (
    <HStack
      justifyContent={goBack ? "space-between" : "center"}
      alignItems="center"
      py="$5"
      px="$5"
    >
      {goBack ? (
        <Pressable
          width="$10"
          height="$10"
          bg="$primary"
          rounded="$full"
          onPress={goBack}
          alignItems="center"
          justifyContent="center"
        >
          <Icon color="$white" as={MoveLeftIcon} size="xl" />
        </Pressable>
      ) : <Center width="$10" />}
      
      <Center flex={1}>
        <Logo />
      </Center>

      {withAvatar ? (
        <Pressable onPress={() => navigation.navigate('profile')}>
          <Avatar 
            bgColor="$primary" w="$10" h="$10" 
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
        </Pressable>
      ) : <Center width="$10" />} 
    </HStack>
  )
}
