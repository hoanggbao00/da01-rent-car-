import { getSession } from '@/actions/session.actions';
import { CarStats } from '@/features/providers/CarStats';
import { DashboardLayout } from '@/features/providers/DashboardLayout';
import { StatsGrid } from '@/features/providers/Stats';
import {
  IconAlertCircle,
  IconCar,
  IconMessage2,
  IconUsers,
} from '@tabler/icons-react';
import { redirect } from 'next/navigation';

const data = [
  {
    title: 'Số lương yêu cầu',
    icon: <IconAlertCircle />,
    value: '0',
  },
  {
    title: 'Số lượng xe',
    icon: <IconCar />,
    value: '0',
  },

  {
    title: 'Số lượng đánh giá',
    icon: <IconMessage2 />,
    value: '0',
  },

  {
    title: 'Khách hàng của tôi',
    icon: <IconUsers />,
    value: '0',
  },
];

const ProviderDashboardPage = async () => {
  const session = await getSession();

  if (!session) {
    redirect(`/login`);
  }

  return (
    <>
      <DashboardLayout>
        <StatsGrid data={data} />
        <CarStats />
      </DashboardLayout>
    </>
  );
};

export default ProviderDashboardPage;
