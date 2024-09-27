import { Center, Spinner, Text, VStack } from '@gluestack-ui/themed'

export function Loading() {
  return (
    <Center flex={1} bg="$backgroundLight0">
      <VStack space="sm">
        <Spinner size="large" color="$primary" />
        <Text size="md" color="$primary">Please Wait</Text>
      </VStack>
    </Center>
  )
}