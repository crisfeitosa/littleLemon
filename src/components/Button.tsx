import {
  ButtonSpinner,
  Button as GluestackButton,
  Text,
} from '@gluestack-ui/themed';
import { ComponentProps } from 'react';

type Props = ComponentProps<typeof GluestackButton> & {
  title: string
  type?: 'primary' | 'secondary'
  isLoading?: boolean
}

export function Button({
  title,
  type = 'primary',
  isLoading = false,
  ...props
}: Props) {
  return (
    <GluestackButton
      w="$full"
      h="$12"
      bg={type === 'primary' ? '$primary' : '$secondary'}
      borderWidth="$2"
      variant="solid"
      borderColor={type === 'primary' ? '$primary' : '$secondary'}
      rounded="$lg"
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ButtonSpinner color={type === 'primary' ? '$white' : '$black'} />
      ) : (
        <Text
          color={type === 'primary' ? '$white' : '$black'}
          fontFamily="$bodyBold"
          fontSize="$md"
        >
          {title}
        </Text>
      )}
    </GluestackButton>
  )
}