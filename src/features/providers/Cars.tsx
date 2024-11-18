'use client';
import { useCarContext } from '@/context/CarContext';
import { IResCarProps } from '@/models/res.model';
import { Box, Button, Divider, Group, Table, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { AddOrEditCar } from './AddOrEditCar';
import { TableRow } from './TableRow';

interface Props {
  cars: IResCarProps[] | null;
}

const header = (
  <Table.Tr>
    <Table.Th>Hình ảnh</Table.Th>
    <Table.Th>Hãng</Table.Th>
    <Table.Th>Model</Table.Th>
    <Table.Th>Năm SX</Table.Th>
    <Table.Th>Loại xe</Table.Th>
    <Table.Th>Trạng thái</Table.Th>
  </Table.Tr>
);

export const Cars = ({ cars }: Props) => {
  const { resetState } = useCarContext();
  const [opened, { open, close }] = useDisclosure(false);

  const rows = cars?.map((car) => <TableRow key={car.id} car={car} />);

  return (
    <>
      <Divider
        my="lg"
        label={
          <Title order={3} className="text-default">
            Phương tiện ({cars?.length})
          </Title>
        }
      />

      <AddOrEditCar
        openButton={
          <Group justify="right" mb="md">
            <Button
              onClick={() => {
                resetState();
                open();
              }}
            >
              <IconPlus /> Thêm phương tiện
            </Button>
          </Group>
        }
        mode="new"
        open={open}
        close={close}
        opened={opened}
      />

      <Box mah="310px" style={{ overflowY: 'auto' }}>
        <Table striped highlightOnHover>
          <Table.Thead>{header}</Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </>
  );
};