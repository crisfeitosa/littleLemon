import {
  Text,
  HStack,
  Image,
  VStack,
} from '@gluestack-ui/themed';

type Props = {
  title: string;
  description: string;
  price: string;
  image: string;
}

export function DishCard({ title, description, price, image }: Readonly<Props>) {
  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      py="$4"
      gap="$4"
      borderTopWidth="$1"
      borderColor="$gray100"
    >
      <VStack flex={1}>
        <Text fontSize="$lg" color="$highblack" fontFamily="$bodyBold" fontWeight="$extrabold">
          {title}
        </Text>
        <Text fontSize="$sm" color="$primary" mt="$1" fontFamily="$bodyMedium">
          {description}
        </Text>
        <Text fontSize="$lg" color="$primary" mt="$2" fontFamily="$bodyBold" fontWeight="$extrabold">
          ${price}
        </Text>
      </VStack>
      <Image
        source={{
          uri: `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/refs/heads/main/thumbnails/t_${image}`,
        }}
        alt={title}
        width={100}
        height={100}
        rounded="$md"
        resizeMode="cover"
      />
    </HStack>
  )
}