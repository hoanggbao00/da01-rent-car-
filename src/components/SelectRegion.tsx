import { optionsFilter } from '@/functions';
import { useRegions } from '@/hooks/useRegions';
import { Select, SelectProps } from '@mantine/core';
import { ReactNode } from 'react';

interface Props extends Omit<SelectProps, 'data'> {
  label?: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
}

export function SelectRegion({
  label,
  value,
  onChange,
  ...rest
}: Props) {
  const { isLoading, regions } = useRegions();

  return (
    <Select
      width="50%"
      label={label || 'Region'}
      placeholder="Pick a region"
      clearable
      searchable
      maxDropdownHeight={280}
      {...rest}
      data={
        regions
          ? regions.map((region) => ({
              label: region.name ?? '',
              value: region.code.toString(),
            }))
          : []
      }
      disabled={isLoading}
      value={value ?? ''}
      onChange={onChange}
      nothingFoundMessage="Not Found"
      filter={optionsFilter}
    />
  );
}
