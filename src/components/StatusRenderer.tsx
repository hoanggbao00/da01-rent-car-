import { bookedMessage, pendingMessage } from '@/const';
import { BookingStatus, CarStatus } from '@/models/app';
import { Badge, BadgeProps, BadgeVariant } from '@mantine/core';

interface Props {
  status: CarStatus | BookingStatus;
  variant?: BadgeVariant;
  className?: string
  size?: 'xs' | 'sm' | 'md' | 'lg';
}
export function StatusRenderer({ status, variant, className, size }: Props) {
  const defaultProps: BadgeProps = {
    variant,
    size: size || 'xs',
    className: className
  };

  if (status === 'pending') {
    return (
      <Badge {...defaultProps} color="gray" title={pendingMessage}>
        Đang chờ
      </Badge>
    );
  }

  if (status === 'booked') {
    return (
      <Badge {...defaultProps} color="orange" title={bookedMessage}>
        Đang thuê
      </Badge>
    );
  }

  if (status === 'approved') {
    return (
      <Badge {...defaultProps} color="green" title="Yêu cầu được chấp thuận">
        Chấp thuận
      </Badge>
    );
  }

  if (status === 'rejected') {
    return (
      <Badge {...defaultProps} color="red" title={'Yêu cầu bị từ chối'}>
        Bị từ chối
      </Badge>
    );
  }

  return (
    <Badge {...defaultProps} color="green">
      Khả dụng
    </Badge>
  );
}
