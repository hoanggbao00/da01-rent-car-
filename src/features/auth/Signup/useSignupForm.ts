import { UseFormReturnType, useForm } from '@mantine/form';

export interface ISignupFormDetails {
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export const useSignupForm = (): UseFormReturnType<ISignupFormDetails> => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      terms: true,
    },

    validate: {
      email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Email không hợp lệ'),
      password: (val: string) =>
        val.length < 6 ? 'Độ dài mật khẩu dài ít nhất 6 ký tự' : null,
      confirmPassword: (val: string, { password }) =>
        val !== password ? 'Mật khẩu không khớp' : null,
      terms: (terms: boolean) =>
        !terms ? 'Bạn cần chấp nhận điều khoản chính sách của chúng tôi' : null,
    },
  });

  return form;
};
