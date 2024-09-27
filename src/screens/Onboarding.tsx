import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Card,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

import React from 'react'
import { Dimensions, ScrollView } from 'react-native';
import { Carousel } from 'react-native-basic-carousel';
import { useNavigation } from '@react-navigation/native';

import { Button } from '@components/Button';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';
import { ButtonOutline } from '@components/ButtonOutline';
import { HeroSection } from '@components/HeroSection';
import { ScreenHeader } from '@components/ScreenHeader';

const { width } = Dimensions.get('window');
interface Data {
  id?: number
  text?: string
}

const data: Data[] = [
  {
    id: 1,
    text: 'Are you Hungry?', 
  },
  {
    id: 2,
    text: 'Craving something?' 
  },
  {
    id: 3,
    text: 'Ready to eat?' 
  }
]

export function Onboarding() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const renderItem = ({ item, index }: { item: Data, index: number }) => {
    return (
      <Box key={index}>
        <Text color="$black" fontSize="$3xl" fontFamily="$bodyBold" textAlign='center' mb="$4">
          {item?.text}
        </Text>
      </Box>
    )
  }

  function handleLogin() {
    navigation.navigate('signIn');
  }
  
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

        {/* Review */}
        <VStack py="$10" bg="$white" justifyContent='center'>
          <Card
            justifyContent='space-between'
            mx="auto"
            maxWidth={250} 
            borderRadius="$lg"
            px="$4"
            pb="$6"
          >
            <VStack mb="$4">
              <StarRatingDisplay
                starStyle={{ marginHorizontal: 3 }}
                rating={4.5}
                starSize={20}
                color="#eab308"
              />
            </VStack>
            <HStack alignItems='center' mb="$4">
              <Avatar mr="$2" size="sm">
                <AvatarFallbackText fontFamily="$heading">JD</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: "https://images.unsplash.com/photo-1620403724159-40363e84a155?q=80&w=2646&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  }}
                  alt="Person"
                />
              </Avatar>
              <VStack>
                <Text fontSize="$md" fontFamily="$bodyBold" color="$black">
                  Jane Doe
                </Text>
                <Text fontSize="$sm" fontFamily="$bodyMedium">
                  janedoe@sample.com
                </Text>
              </VStack>
            </HStack>

            <VStack>
              <Text fontSize="$sm" fontFamily="$body">
                "We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.""
              </Text>
            </VStack>
          </Card>
        </VStack>

        {/* Footer */}
        <VStack flex={1} bg="$secondary" pb="$4" justifyContent='center'>
          <VStack>  
            <Carousel
              data={data}
              renderItem={renderItem}
              itemWidth={width}
              paginationType='circle'
              pagination
              paginationColor="#000"
              paginationPosition='bottom'
              autoplay
            />
          </VStack>
          <HStack
            justifyContent='center'
            alignItems='center'
            gap="$4"
            px="$14"
          >
            <Button title="Log In" width="50%" onPress={handleLogin} />
            <ButtonOutline
              title="Sign Up"
              width="50%"
              onPress={handleNewAccount}
            />
          </HStack>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
