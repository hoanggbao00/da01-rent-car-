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
        Pending
      </Badge>
    );
  }

  if (status === 'booked') {
    return (
      <Badge {...defaultProps} color="orange" title={bookedMessage}>
        Booked
      </Badge>
    );
  }

  if (status === 'approved') {
    return (
      <Badge {...defaultProps} color="green" title="Booking approved">
        Approved
      </Badge>
    );
  }

  if (status === 'rejected') {
    return (
      <Badge {...defaultProps} color="red" title={'Booking rejected'}>
        Rejected
      </Badge>
    );
  }

  return (
    <Badge {...defaultProps} color="green">
      Available
    </Badge>
  );
}
