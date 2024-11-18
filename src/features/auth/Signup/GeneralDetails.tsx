import { SelectRegion } from '@/components/SelectRegion';
import { Anchor, Box, Group, Input, Stack, TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import Link from 'next/link';
import { IGeneralFormDetail } from './useGeneraldetailsForm';

interface Props {
  form: UseFormReturnType<IGeneralFormDetail>;
}
export const GeneralDetails = ({ form }: Props) => {
  return (
    <>
      <Stack>
        <TextInput
          label="Tên"
          placeholder="Nhập tên của bạn"
          value={form.values.firstName}
          onChange={(event) =>
            form.setFieldValue('firstName', event.currentTarget.value)
          }
          error={form.errors.firstName && form.errors.firstName}
          radius="md"
        />

        <TextInput
          label="Họ và tên đệm"
          placeholder="Nhập họ và tên đệm"
          value={form.values.lastName}
          onChange={(event) =>
            form.setFieldValue('lastName', event.currentTarget.value)
          }
          error={form.errors.lastName && form.errors.lastName}
          radius="md"
        />

        <TextInput
          label="Số điện thoại"
          placeholder="0362554000"
          value={form.values.phone}
          onChange={(event) =>
            form.setFieldValue('phone', event.currentTarget.value)
          }
          error={form.errors.phone && form.errors.phone}
          radius="md"
        />
        <Group grow>

          <Box>
            <SelectRegion
              value={form.values.region_code}
              onChange={(value) => form.setFieldValue('region_code', value)}
            />
            {form.errors.region_code && (
              <Input.Error>{form.errors.region_code}</Input.Error>
            )}
          </Box>
        </Group>
      </Stack>
    </>
  );
};
