import React, {
  FC,
  ChangeEvent,
  FocusEventHandler,
  KeyboardEventHandler
} from 'react'

type Props = {
  name: string
  id?: string
  type?: string
  placeholder?: string
  required?: boolean
  autocomplete?: boolean
  checked?: boolean
  disabled?: boolean
  value?: string
  onChange?: ((event: ChangeEvent<HTMLInputElement>) => void) | undefined
  onBlur?: FocusEventHandler
  onKeyPress?: KeyboardEventHandler
  className?: string
}

export const Input: FC<Props> = ({
  name,
  id = name,
  type = 'text',
  placeholder,
  required,
  autocomplete = true,
  checked = undefined,
  disabled,
  value,
  onChange,
  onBlur,
  onKeyPress,
  className = 'form-control'
}) => (
  <input
    className={className}
    name={name}
    id={id}
    type={type}
    placeholder={placeholder}
    required={required}
    value={value || ''}
    checked={checked}
    onChange={onChange}
    onBlur={onBlur}
    onKeyPress={onKeyPress}
    autoComplete={autocomplete ? undefined : 'off'}
    disabled={disabled}
  />
)

export default Input
