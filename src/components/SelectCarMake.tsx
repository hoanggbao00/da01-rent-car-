import { carMakes } from '@/data/car-makes';
import { optionsFilter } from '@/functions';
import { Select } from '@mantine/core';
import { ReactNode, useEffect } from 'react';

interface Props {
  label?: ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  addAll?: boolean;
  required?: boolean;
}

export function SelectCarMake({
  label,
  value,
  onChange,
  addAll,
  required,
}: Props) {
  useEffect(() => {
    if (addAll && !carMakes.some((make) => make.value === 'all')) {
      carMakes.unshift({ label: 'All', value: 'all' });
    }
  }, [addAll]);

  return (
    <div style={{
      width: '150px'
    }}>
      <Select
      label={label || 'Hãng xe'}
      placeholder="Toyota"
      data={carMakes.map((make) => ({ label: make.label, value: make.value }))}
      value={value ?? 'all'}
      onChange={onChange}
      searchable
      maxDropdownHeight={280}
      nothingFoundMessage="Nothing found"
      filter={optionsFilter}
      required={required}
    />
    </div>
  );
}
