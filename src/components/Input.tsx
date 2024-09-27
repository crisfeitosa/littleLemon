import { ComponentProps } from 'react';
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Input as GluestackInput,
  InputField,
  InputSlot,
  InputIcon
} from '@gluestack-ui/themed';
import { MaskedTextInputProps } from 'react-native-mask-text';
import { EyeIcon, EyeOffIcon, LucideIcon } from 'lucide-react-native';

type Props = ComponentProps<typeof InputField> & MaskedTextInputProps & {
  errorMessage?: string | null;
  isInvalid?: boolean;
  isReadOnly?: boolean
  iconLeft?: LucideIcon;
  showPassword?: boolean;
  handleShowPassword?: () => void;
}

export function Input({
  isReadOnly = false,
  errorMessage = null,
  isInvalid = false,
  iconLeft,
  showPassword,
  handleShowPassword,
  ...props
}: Props) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid} w="$full">
      <GluestackInput
        h="$10"
        isInvalid={isInvalid}
        rounded="$lg"
        borderWidth="$1"
        borderColor="$gray300"
        $focus={{
          borderWidth: 1,
          borderColor: invalid ? '$red500' : '$primary',
        }}
        $invalid={{
          borderWidth: 1,
          borderColor: '$red500',
        }}
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}
      >
        {iconLeft && (
          <InputSlot pl="$2" bg="$backgroundLight0">
            <InputIcon as={iconLeft} color="$gray300" />
          </InputSlot>
        )}
        <InputField
          px="$2"
          bg="$backgroundLight0"
          color="$gray600"
          fontFamily="$bodyMedium"
          placeholderTextColor="$gray300"
          {...props}
        />
        {handleShowPassword && (
          <InputSlot pr="$2" onPress={handleShowPassword}>
            <InputIcon
              as={showPassword ? EyeIcon : EyeOffIcon}
              color="$gray300"
            />
          </InputSlot>
        )}
      </GluestackInput>
      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}