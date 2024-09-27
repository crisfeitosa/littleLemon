import { Button, Text } from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof Button> & {
  name: string
  isActive: boolean;
}

export function MenuCategory({ name, isActive, ...props }: Props) {
  return (
    <Button
      mr="$3"
      minWidth="$24"
      h="$10"
      bg={isActive ? "$primary" : "$highlight"}
      rounded="$2xl"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <Text
        color={isActive ? '$white' : '$primary'}
        fontSize="$sm"
        fontFamily="$bodyBold"
        fontWeight="$extrabold"
      >
        {name}
      </Text>
    </Button>
  )
}