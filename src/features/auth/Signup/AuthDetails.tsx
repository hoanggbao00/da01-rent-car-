'use client';
import { Checkbox, PasswordInput, Stack, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { ISignupFormDetails } from './useSignupForm';

interface Props {
  form: UseFormReturnType<ISignupFormDetails>;
}
export const AuthDetails = ({ form }: Props) => {
  return (
    <Stack>
      <TextInput
        label="Email"
        placeholder="hello@example.com"
        value={form.values.email}
        onChange={(event) =>
          form.setFieldValue('email', event.currentTarget.value)
        }
        error={form.errors.email && form.errors.email}
        radius="md"
      />

      <PasswordInput
        label="Mật khẩu"
        placeholder="Nhập mật khẩu"
        value={form.values.password}
        onChange={(event) =>
          form.setFieldValue('password', event.currentTarget.value)
        }
        error={
          form.errors.password &&
          'Độ dài mật khẩu dài ít nhất 6 ký tự'
        }
        radius="md"
      />
      <PasswordInput
        label="Nhập lại mật khẩu"
        placeholder="Nhập lại mật khẩu"
        value={form.values.confirmPassword}
        onChange={(event) =>
          form.setFieldValue('confirmPassword', event.currentTarget.value)
        }
        error={form.errors.confirmPassword && 'Mật khẩu không khớp'}
        radius="md"
      />

      <Checkbox
        label="Tôi chấp nhận điều khoản và chính sách"
        checked={form.values.terms}
        onChange={(event) =>
          form.setFieldValue('terms', event.currentTarget.checked)
        }
        error={form.errors.terms && 'Bạn cần chấp nhận các điều khoản chính sách'}
      />
    </Stack>
  );
};
