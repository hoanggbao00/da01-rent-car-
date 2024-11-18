import { Button, Flex, Group, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconAlertCircle } from '@tabler/icons-react';
import {
  JSXElementConstructor,
  MouseEventHandler,
  ReactElement,
  cloneElement,
} from 'react';

interface Props {
  name?: string;
  title?: string;
  openButton: ReactElement<any, string | JSXElementConstructor<any>>;
  onConfirm?: () => Promise<void>;
}

export function ConfirmationModal({
  title,
  name,
  openButton,
  onConfirm,
}: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Xác nhận xóa" centered>
        <Flex gap={8} align="center">
          <IconAlertCircle style={{ color: 'orange' }} />{' '}
          {title || `Bạn có chắc chắn muốn xóa `} {name}?
        </Flex>

        <Group justify="right" mt="xl" mb="sm">
          <Button variant="outline" color="gray" onClick={close}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              onConfirm?.();
              close();
            }}
          >
            Xóa
          </Button>
        </Group>
      </Modal>

      <>
        {cloneElement(openButton, {
          onClick: () => open(),
        })}
      </>
    </>
  );
}
