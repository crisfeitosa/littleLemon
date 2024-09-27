import { Box, HStack, Image, Text, VStack } from "@gluestack-ui/themed";
import Heroimage from "@assets/Heroimage.png";
import { SearchIcon } from 'lucide-react-native';
import { Input } from "./Input";

type Props = {
  value?: string;
  onChange?: (text: string) => void;
};

export function HeroSection({ value, onChange }: Readonly<Props>) {
  return (
    <VStack bg="$primary" px="$4" pt="$2" pb="$4">
      <Text color="$secondary" fontSize="$6xl" fontFamily="$heading">
        Little Lemon
      </Text>
      <HStack justifyContent="space-between" alignItems="flex-end" mb="$2">
        <VStack flex={1} justifyContent="space-between" pr="$2">
          <Text color="$white" fontSize="$4xl" fontFamily="$heading" mb="$2">
            Chicago
          </Text>
          <Text color="$white" fontSize="$lg" fontFamily="$body">
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
        </VStack>
        <Image
          flex={0.7}
          w={140}
          h={150}
          rounded="$xl"
          source={Heroimage}
          defaultSource={Heroimage}
          alt="Heroimage"
          resizeMode="cover"
        />
      </HStack>
      {onChange && (
        <Box mt="$4">
          <Input
            iconLeft={SearchIcon}
            placeholder='Search'
            onChangeText={onChange}
            value={value}
          />
        </Box>
      )}
    </VStack>
  );
}
