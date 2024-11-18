import { UseFormReturnType, useForm } from '@mantine/form';

export interface IGeneralFormDetail {
  firstName: string;
  lastName: string;
  region_code: string;
  phone: string;
}

export const useGeneralDetailsForm =
  (): UseFormReturnType<IGeneralFormDetail> => {
    const form = useForm({
      initialValues: {
        firstName: '',
        lastName: '',
        region_code: '',
        phone: '',
      },

      validate: {
        firstName: (value: string) =>
          !value ? 'First Name is required' : null,
        lastName: (value: string) => (!value ? 'Last Name is required' : null),
        phone: (value: string) => (!value ? 'Phone number is required' : null),
        region_code: (value: string) => (!value ? 'Select your region' : null),
      },
    });

    return form;
  };
