import { IResUserProps } from '@/models/res.model';
import { UseFormReturnType, useForm } from '@mantine/form';

export interface IProfileDetails {
  firstName: string;
  lastName: string;
  region_code: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  avatar: string;
}

export const useProfileForm = (
  user: IResUserProps | null
): UseFormReturnType<IProfileDetails> => {
  const form = useForm({
    initialValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      region_code: user?.regions?.code.toString() || '',
      phone: user?.phone || '',
      dateOfBirth: user?.dateOfBirth || '',
      gender: user?.gender || 'male',
      avatar: user?.avatar || '',
    },

    validate: {
      firstName: (value: string) => (!value ? 'Họ không được để trống' : null),
      lastName: (value: string) => (!value ? 'Tên không được để trống' : null),
      phone: (value: string) => (!value ? 'Số điện thoại không được để trống' : null),
      region_code: (value: string) => (!value ? 'Vui lòng chọn thành phố' : null),
    },
  });

  return form;
};
