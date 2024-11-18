import { getProviderCars } from '@/actions/providers.actions';
import { getSession } from '@/actions/session.actions';
import { CarStats } from '@/features/providers/CarStats';
import { DashboardLayout } from '@/features/providers/DashboardLayout';
import { StatsGrid } from '@/features/providers/Stats';

import { redirect } from 'next/navigation';


const ProviderDashboardPage = async () => {
  const session = await getSession();

  if (!session) {
    redirect(`/login`);
  }

  const cars = await getProviderCars(session.user);
  
  return (
    <>
      <DashboardLayout>
        <StatsGrid providerId={session.user.id}/>
        <CarStats cars={cars}/>
      </DashboardLayout>
    </>
  );
};

export default ProviderDashboardPage;
