import { useFiltersContext } from '@/context/FiltersContext';
import { SegmentedControl, Text } from '@mantine/core';

export const Transmission = () => {
  const { state, updateFilterProperty } = useFiltersContext();
  return (
    <>
      <Text my={16}>Loại cần số</Text>

      <SegmentedControl
        color="pink"
        radius="lg"
        value={state.transmission}
        onChange={(value) => updateFilterProperty('transmission', value)}
        data={[
          { label: 'Tất cả', value: 'any' },
          { label: 'Số thủ công', value: 'manual' },
          { label: 'Số tự động', value: 'automatic' },
        ]}
      />
    </>
  );
};
