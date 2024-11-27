import { getCarDetails } from '@/actions/cars.actions';
import { isProviderSession, getSession } from '@/actions/session.actions';
import { CarDetails } from '@/features/cars/details/CarDetails';
import { redirect } from 'next/navigation';
import React from 'react';

interface CarDetailsPageProps {
  params: any;
  searchParams: any;
}

const CarDetailsPage = async ({ params }: CarDetailsPageProps) => {
  const session = await getSession();

  await isProviderSession();

  if (!params.id) {
    redirect('/');
  }

  const {
    car,
    provider,
    reviews,
  } = await getCarDetails( params.id);

  return (
    <>
      <CarDetails
        car={car}
        userId={session?.user.id}
        provider={provider}
        reviews={reviews || []}
      />
    </>
  );
};

export default CarDetailsPage;
