import {
  ButtonSpinner,
  Button as GluestackButton,
  Text,
} from '@gluestack-ui/themed'
import { ComponentProps } from 'react'

type Props = ComponentProps<typeof GluestackButton> & {
  title: string
  type?: 'primary' | 'secondary'
  isLoading?: boolean
}

export function ButtonOutline({
  title,
  type = 'primary',
  isLoading = false,
  ...props
}: Props) {
  return (
    <GluestackButton
      w="$full"
      h="$12"
      bg="$white"
      borderWidth="$2"
      variant="outline"
      borderColor={type === 'primary' ? '$primary' : '$secondary'}
      rounded="$lg"
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ButtonSpinner color={type === 'primary' ? '$primary' : '$secondary'} />
      ) : (
        <Text
          color={type === 'primary' ? '$primary' : '$secondary'}
          fontFamily="$bodyBold"
          fontSize="$md"
        >
          {title}
        </Text>
      )}
    </GluestackButton>
  )
}