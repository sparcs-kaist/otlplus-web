import React, { ChangeEvent, InputHTMLAttributes, useEffect, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import Icon from '@/common/daily-tf/Icon';
import { Mode } from '@/features/lab/enum/Mode';
import { AutoDelete } from '@mui/icons-material';

// daily-tf TextInput 가져와서 썼습니다.

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  errorMessage?: string;
  disabled?: boolean;
  value?: string;
  $placeholderColor?: string;
  handleChange?: (value: string) => void;
  setErrorStatus?: ($hasError: boolean) => void;
  mode: Mode;
  setRecentSearch: (value: string) => void;
}

const errorBorderStyle = css`
  //border-color: red;
`;

const disabledStyle = css`
  //background-color: rgba(245, 245, 245, 1);
`;

interface ModeProps {
  mode: Mode;
}

const Input = styled.input<{ $hasError: boolean; $placeholderColor?: string }>`
  display: flex;
  outline: none;
  flex: 1;
  min-width: 0;
  border-radius: 4px;
  font-size: 14px;
  line-height: 17.5px;
  color: rgba(51, 51, 51, 1);

  &::placeholder {
    color: ${({ $placeholderColor }) => $placeholderColor || '#aaaaaa'};
  }

  ${({ disabled }) => disabled && disabledStyle}
  ${({ $hasError }) => $hasError && errorBorderStyle}
`;

const InputWrapper = styled.div<ModeProps>`
  display: flex;
  min-width: 157px;
  padding: 0 16px;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;
  align-self: stretch;

  ${({ mode, theme }) =>
    mode !== Mode.none
      ? `
    border-bottom: 1px solid ${theme.colors.Line.divider}`
      : ''};
`;

const InputContainer = styled.div`
  display: flex;
  min-width: 157px;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;
  align-self: stretch;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      mode,
      placeholder,
      errorMessage = '',
      disabled = false,
      value = '',
      handleChange = () => {},
      setErrorStatus = () => {},
      $placeholderColor: placeholderColor,
      setRecentSearch,
      ...props
    },
    ref,
  ) => {
    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      handleChange(e.target.value);
    };

    useEffect(() => {
      if (setErrorStatus) {
        setErrorStatus(!!errorMessage);
      }
    }, [errorMessage, setErrorStatus]);

    return (
      <InputContainer>
        <Input
          ref={ref}
          placeholder={placeholder}
          $hasError={!!errorMessage}
          disabled={disabled}
          value={value}
          onChange={handleValueChange}
          $placeholderColor={placeholderColor}
          {...props}
        />
      </InputContainer>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
