import { optionsFilter } from '@/functions';
import { Select } from '@mantine/core';
import { ReactNode, useEffect } from 'react';

export const fuelTypes = [
  { label: 'Tất cả', value: 'Any' },
  { label: 'Gasoline', value: 'Gasoline' },
  { label: 'Diesel', value: 'Diesel' },
  { label: 'LPG', value: 'LPG' },
  { label: 'CNG', value: 'CNG' },
  { label: 'Điện', value: 'Electric' },
];

interface Props {
  label?: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  addAny?: boolean;
}

export const SelectFuelType = ({
  label,
  value,
  onChange,
  required,
  addAny,
}: Props) => {
  useEffect(() => {
    if (!addAny) {
      fuelTypes.filter((item) => item.value.toLowerCase() !== 'any');
    }
  }, [addAny]);

  return (
    <Select
      width="100%"
      label={label || 'Loại xăng/ dầu'}
      placeholder="Gasoline"
      required={required}
      data={fuelTypes}
      value={value}
      onChange={onChange}
      searchable
      maxDropdownHeight={280}
      nothingFoundMessage="Không tìm thấy"
      filter={optionsFilter}
    />
  );
};
